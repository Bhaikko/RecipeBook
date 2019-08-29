const express = require("express");
const bcrypt = require("bcrypt");

const route = express.Router();

const { checkUser, addUser} = require("./../../database/userDatabaseHandler");

route.use(express.static(__dirname + "/../../private"));

route.post("/login", (req, res) => {
    
});

route.post("/signup", (req, res) => {
    // console.log(req.body);

    bcrypt.hash(req.body.password, 10, function(err, password) {
        addUser(req.body.username, req.body.email, password)
            .then(() => res.redirect("/"));
    });

});

route.post("/checkUser", (req, res) => {

    checkUser(req.body.username, req.body.email)
        .then(response => res.send(response));
});

module.exports = {
    route 
}

//TEST CREDENTIALS 
// test
// test
// test123456