const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/moviesdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Connected to moviesdb database!"))
    .catch((err) => console.log("somehting went wrong with the db connection",err))