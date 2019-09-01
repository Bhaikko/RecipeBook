const Sequelize = require("sequelize");

const database = new Sequelize("recipeBook", "recipeBookAdmin", "123456", {
    host: "localhost",
    dialect: "mysql",
    logging: false 
});

const Users = database.define("users", {
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true  
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true 
    },
    image: {
        type: Sequelize.STRING,
    },
    about: {
        type: Sequelize.STRING
    }
});

const Recipes = database.define("recipes", {
    name: {
        type: Sequelize.STRING,
        allowNull: false 
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    image: {
        type: Sequelize.STRING,
    },
    ingredients: {
        type: Sequelize.TEXT,
        allowNull: false 
    },
    directions: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

const Reviews = database.define("reviews", {
    stars: {
        type: Sequelize.INTEGER,
        allowNull: false 
    },
    review: {
        type: Sequelize.TEXT,
        allowNull: false 
    }
});

const Favourites = database.define("favourites");

// 1 : N Associtaion
Recipes.belongsTo(Users);
Users.hasMany(Recipes);

// M : N Association
Recipes.belongsToMany(Users, {through: Favourites});
Users.belongsToMany(Recipes, {through: Favourites});



Reviews.belongsTo(Users);
Reviews.belongsTo(Recipes);

Users.hasMany(Reviews);
Recipes.hasMany(Reviews);

module.exports = {
    Users,
    Recipes,
    Favourites,
    Reviews,
    database 
}