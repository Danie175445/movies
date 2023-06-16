const port = 8000;
const express = require('express');
const app = express();
const cors = require("cors");
app.use(cors()) 

app.use(express.json(), express.urlencoded({ extended: true }));
require('./routes/movie.routes')(app)



require("./config/mongoose.config");


app.listen(port, () => console.log(`🎉Party on port: ${port}`) );