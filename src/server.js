const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes");

const server = express();

server.use(express.json());
server.use(cors());
server.use(routes);

mongoose.connect("mongodb+srv://nicolas:pedefeijao123@cluster0.xb1ss.mongodb.net/finance-api?retryWrites=true&w=majority", {   
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
}).then(() => console.log("Mongo Connected!"))

server.listen(5000)