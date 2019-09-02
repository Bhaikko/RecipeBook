const express = require("express");
const multer = require("multer");
// const bcrypt = require("bcrypt");

const route = express.Router();

const { checkUser, addUser, checkCredentials, getDetails, getFavouriteRecipes, deleteFavourite, deleteRecipe, changeProfilePicture, changeAbout } = require("./../../database/userDatabaseHandler");
const { passport } = require("./../../passport");

const upload = multer({ dest: "uploads/users/profile"});

const saltRounds = 10;

const checkLoginStatus = (req, res, next) => {
    if(!req.user)
    {   
        res.redirect("/#page3");
        return;
    }

    next();
}

route.post("/login", passport.authenticate("user", {
    successRedirect: "/user",
    failureRedirect: "/"
}));


route.post("/signup", (req, res) => {
    // bcrypt.hash(req.body.password, saltRounds, function(err, password) {
    //     addUser(req.body.username, req.body.email, password)
    //         .then(() => res.redirect("/"));
    // });

    addUser(req.body.username, req.body.email, req.body.password)
        .then(() => res.redirect("/"));
});

route.post("/checkUser", (req, res) => {

    checkUser(req.body.username, req.body.email)
        .then(response => res.send(response));
});

route.post("/checkCredentials", (req, res) => {
    checkCredentials(req.body.username)
        .then(user => {
            if(user)
            {
                // bcrypt.compare(req.body.password, user.password, (err, bCorrect) => {
                    // if(bCorrect) 
                    if(user.password == req.body.password)   
                        res.send("OK");
                    else 
                        res.send("NotOk");

                // })
                return;
            }
            res.send("NotOk");
        })    
});

route.get("/getDetails", (req, res) => {
    getDetails(req.user.id)
        .then(details => res.send(details));
});

route.get("/getFavouriteRecipes", (req, res) => {
    getFavouriteRecipes(req.user.id)
        .then(details => res.send(details));
});

route.post("/deleteFavourite", (req, res) => {
    deleteFavourite(req.body.recipeId, req.user.id)
        .then(() => res.sendStatus(200));
})
route.post("/deleteRecipe", (req, res) => {
    deleteRecipe(req.body.recipeId, req.user.id)
        .then(() => res.sendStatus(200));
})

route.post("/changeProfilePicture", upload.single("profile"), (req, res) => {
    changeProfilePicture(req.user.id, "/uploads/users/profile/" + req.file.filename)
        .then(res.redirect("/user/profile.html"));
});

route.patch("/changeAbout", (req, res) => {
    changeAbout(req.user.id, req.body.about)
        .then(res.sendStatus(200));
})

route.use(checkLoginStatus, express.static(__dirname + "/../../private"));

module.exports = {
    route 
}

//TEST CREDENTIALS 
// test
// test
// test123456