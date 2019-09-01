const { Recipes, Reviews, Users, Favourites } = require("./database");
const Op = require("sequelize").Op;


const parser = (items) => {
    let newItems = [];
    items.map(item => {
        newItems.push(item.get());    
    });

    return newItems;

}

const addRecipe = (name, type, image, ingredients, directions, userId) => {
    Recipes.create({
        name, 
        type,
        image,
        ingredients,
        directions,
        userId 
    });
}

const getRecipes = () => {
    return Recipes.findAll({
        attributes: ["image", "name", "id"],
        include: [
            {
                model: Users,
                attributes: ["username", "image"]
            },
            {
                model: Reviews,
                attributes: ["stars", "review"]
            }
        ]
    })
        .then(recipes => parser(recipes));

}

const getRecipesByName = (name) => {
    return Recipes.findAll({
        attributes: ["image", "name", "id"],
        where: {
            name: {
                [Op.like]: "%" + name + "%"
            }
        },         
        include: [
            {
                model: Users,
                attributes: ["username", "image"]
            },
            {
                model: Reviews,
                attributes: ["stars", "review"]
            }
        ]
    })
        .then(recipes => parser(recipes));
}

const getRecipesByType = (type) => {

    type = type.substr(1);
    return Recipes.findAll({
        attributes: ["image", "name", "id"],
        where: {
            type 
        },
        include: [
            {
                model: Users,
                attributes: ["username", "image"]
            },
            {
                model: Reviews,
                attributes: ["stars", "review"]
            }
        ]
    })
        .then(recipes => parser(recipes));
}

const getRecipeDetails = (id) => {
    return Recipes.findOne({
        where: {
            id 
        },
        attributes: ["id", "directions", "image", "ingredients", "name"],
        include: [
            {
                model: Users,
                attributes: ["id", "image", "username"]
            },
            {
                model: Reviews,
                attributes: ["stars", "review"],
                include: [{
                    model: Users,
                    attributes: ["username", "image"]
                }]
            }
        ]
    })
        .then(recipe => recipe);
}

const addReview = (stars, review, userId, recipeId) => {
    Reviews.create({
        stars,
        review,
        userId,
        recipeId 
    })
}

const wishlistToggle = (userId, recipeId) => {
    return Favourites.findOne({
        where: {
            userId,
            recipeId 
        }
        
    })
        .then(item => {
            if(item)
            {
                return Favourites.destroy({
                    where: {
                        userId,
                        recipeId
                    }
                })
                    .then(() => "Deleted");
            }
            else 
            {
                return Favourites.create({
                    userId,
                    recipeId 
                })
                    .then(() => "Added");
            }
        });
}

const checkInWishlist = (userId, recipeId) => {
    return Favourites.findOne({
        where: {
            userId,
            recipeId 
        }
        
    })
        .then(item => {
            if(item)
                return "Exist";
            else 
                return "DoesNotExist";
        });
}

module.exports = {
    addRecipe,
    getRecipes,
    getRecipesByType,
    getRecipesByName,
    getRecipeDetails,
    addReview,
    wishlistToggle,
    checkInWishlist
}