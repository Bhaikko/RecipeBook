const express = require("express");
const bcrypt = require("bcrypt");

const route = express.Router();

const { checkUser, addUser, checkCredentials } = require("./../../database/userDatabaseHandler");
const { passport } = require("./../../passport");


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
    bcrypt.hash(req.body.password, saltRounds, function(err, password) {
        addUser(req.body.username, req.body.email, password)
            .then(() => res.redirect("/"));
    });
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
                bcrypt.compare(req.body.password, user.password, (err, bCorrect) => {
                    if(bCorrect)    
                        res.send("OK");
                    else 
                        res.send("NotOk");

                })
                return;
            }

            res.send("NotOk");

        })
   
    
    
});

route.use(checkLoginStatus, express.static(__dirname + "/../../private"));

module.exports = {
    route 
}

//TEST CREDENTIALS 
// test
// test
// test123456