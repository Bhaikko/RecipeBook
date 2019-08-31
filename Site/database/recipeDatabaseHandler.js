const { Recipes, Reviews, Users } = require("./database");
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
        attributes: ["image", "name"],
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
        attributes: ["image", "name"],
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
        attributes: ["image", "name"],
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

module.exports = {
    addRecipe,
    getRecipes,
    getRecipesByType,
    getRecipesByName
}