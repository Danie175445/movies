const movieController = require("../controllers/movie.controller")

module.exports= (app)=>{
    app.get("/api",movieController.index)
    app.post("/api/movie",movieController.createMovie)
    app.get('/api/movie',movieController.findAllMovies)
    app.get('/api/movie/:id',movieController.findOneMovie)
    app.put('/api/movie/:id',movieController.UpdateMovie)
    app.delete('/api/movie/:id',movieController.deleteMovie)
}