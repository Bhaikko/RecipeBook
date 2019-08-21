const express = require("express");

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true}));

const PORT = 4000;
server.listen(PORT, () => console.log("Server Up And Running On 127.0.0.1:" + PORT));