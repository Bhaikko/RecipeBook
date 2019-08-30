const { Users } = require("./database");
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
        email 
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

module.exports = {
    checkUser,
    addUser,
    checkCredentials
}