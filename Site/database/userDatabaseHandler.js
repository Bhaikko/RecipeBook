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
            // attributes: []
        }, {
            model: Favourites,
            // attributes: []
        }]
    })
        .then(user => user);
}



module.exports = {
    checkUser,
    addUser,
    checkCredentials,
    getDetails,
}