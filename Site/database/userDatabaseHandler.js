const { Users, Recipes, Favourites,Reviews } = require("./database");
const Op = require("sequelize").Op;


const checkUser = (username, email) => {
    return Users.findOne({
        where: {
            [Op.or]: [
                {username: username},
                {email: email}
            ]
        }
    })
        .then(user => {
            if(user)
                return "Exist";
            else 
                return "Nope";
        })
}

const addUser = (username, email, password) => {
    return Users.create({
        username,
        password,
        email,
        image: "/uploads/users/defaultProfilePicture.png" 
    });
}

const checkCredentials = (username) => {
    return Users.findOne({
        where: {
            username
        }
    })
        .then(user => user);
}

const getDetails = id => {
    return Users.findOne({
        where: {
            id
        },
        attributes: ["username", "image", "about"],

        include: [{
            model: Recipes,
            attributes: ["id", "name", "image"],
            include: [{
                model: Reviews,
                attributes: ["stars"]
            }]
        }]
    })
        .then(user => user);
}

const getFavouriteRecipes = userId => {
    return Favourites.findAll({
        where: {
            userId 
        },
        attributes: ["userId", "recipeId"]
    })
        .then(recipeIds => {
            recipeIds = parser(recipeIds);

            return Promise.all(recipeIds.map(async currentId => {
                return Recipes.findOne({
                    where: {
                        id: currentId.recipeId
                    },
                    attributes: ["name", "image", "id"],
                    include: [{
                        model: Reviews,
                        attributes: ["stars"]
                    }]

                })
            }))
                .then(recipes => recipes)
                .catch(error => console.log(error));      
        });
}

const parser = objects => {
    let newObjects = [];
    objects.map(object => {
        newObjects.push(object.get());
    });
    return newObjects;
}

const deleteRecipe = (recipeId, userId) => {
    return Recipes.destroy({
        where: {
            id: recipeId,
            userId
        }
    })
}

const deleteFavourite = (recipeId, userId) => {
    return Favourites.destroy({
        where: {
            recipeId,
            userId 
        }
    })
}

module.exports = {
    checkUser,
    addUser,
    checkCredentials,
    getDetails,
    getFavouriteRecipes,
    deleteRecipe,
    deleteFavourite
}