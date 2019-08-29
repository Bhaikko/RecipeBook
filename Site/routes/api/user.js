const express = require("express");

const route = express.Router();

route.use(express.static(__dirname + "/../../private"));

route.post("/login", (req, res) => {
    console.log("LOGIN REQUEST");
});

route.post("/signup", (req, res) => {
    console.log("SIGN UP REQUEST");
});

module.exports = {
    route 
}