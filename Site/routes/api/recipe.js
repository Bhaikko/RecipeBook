const express = require("express");
const multer = require("multer");

const route = express.Router();
const upload = multer({ dest: "uploads/users/recipies"});

const { addRecipe, getRecipes, getRecipesByName, getRecipesByType } = require("./../../database/recipeDatabaseHandler");


route.post("/addRecipe", upload.single("recipeImage"), (req, res) => {
    
    let ingredients = "";

    req.body["ingredients[][name]"].map((x, index) => {
        ingredients += req.body["ingredients[][name]"][index] + "#" + req.body["ingredients[][quantity]"][index] + "+";
    });

    addRecipe(req.body.recipeName, req.body.recipeType, req.file.filename, ingredients, req.body.recipeDirection, req.user.id);
    res.redirect("/user");
});

route.get("/getRecipes", (req, res) => {
    getRecipes()
        .then(recipes => res.send(recipes));
});

route.get("/getRecipeByName", (req, res) => {
    getRecipesByName(req.query.name)
        .then(recipes => res.send(recipes));
});

route.get("/getRecipeByType", (req, res) => {

    getRecipesByType(req.query.type)
        .then(recipes => res.send(recipes));
})


module.exports = {
    route 
}