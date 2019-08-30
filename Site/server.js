const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

const { database } = require("./database/database");
const userRouter = require("./routes/api/user").route;
const recipeRouter = require("./routes/api/recipe").route;
const { passport } = require("./passport");

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true}));

const sessionMiddleware = session({
    secret: "FFFFFFF",
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
        url: "mongodb://127.0.0.1:5000/sessions",
    })
});

server.use(sessionMiddleware);
server.use(passport.initialize());
server.use(passport.session());

server.use(express.static("./public"));
server.use("/user", userRouter);
server.use("/recipe", recipeRouter);

server.use("/uploads", express.static("./uploads"));

server.get("/logout", (req, res) => {
    req.logOut();
    res.redirect("/");
});

const PORT = 4000;

database.sync()
    .then(() => server.listen(PORT, () => console.log("Database Synced And Server Up And Running On 127.0.0.1:" + PORT)));
