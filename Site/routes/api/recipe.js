const express = require("express");
const multer = require("multer");

const route = express.Router();
const upload = multer({ dest: "uploads/users/recipies"});

const { addRecipe, getRecipes, getRecipesByName, getRecipesByType, getRecipeDetails, addReview, wishlistToggle, checkInWishlist } = require("./../../database/recipeDatabaseHandler");


const checkLoginStatus = (req, res, next) => {
    if(!req.user)
    {   
        res.redirect("/#page3");
        return;
    }

    next();
}

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
});

route.get("/getRecipeDetails", (req, res) => {
    getRecipeDetails(req.query.recipeid)
        .then(recipe => res.send(recipe));
});

route.post("/addReview", (req, res) => {
    addReview(req.body.stars, req.body.review, req.user.id, req.body.recipeid);
    res.redirect("/recipe/recipe.html?recipeid=" + req.body.recipeid);
});

route.post("/toggleWishlistItem", (req, res) => {
    // console.log(req.body);
    wishlistToggle(req.user.id, req.body.recipeId)
        .then(response => res.send(response));
});

route.get("/checkInWishlist", (req, res) => {
    // console.log(req.query.id);
    checkInWishlist(req.user.id, req.query.id)
        .then(response => res.send(response));
})

route.use(checkLoginStatus, express.static(__dirname + "/../../private"));

module.exports = {
    route 
}