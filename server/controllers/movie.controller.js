const { response } = require("express")
const movie = require("../models/movie.model")

module.exports.index = (request,response) =>{
    response.json({
        message:"hello world"
    })

}

module.exports.createMovie =(req,res) => {
    const {name,genre}= req.body
    movie.create({
        name:name,
        genre:genre
    })
        .then((newMovie)=> res.json(newMovie))
        .catch(err=> res.status(400).json(err))
}

module.exports.findAllMovies = (req,res) => {
    movie.find()
        .then(allTheMovies => res.json(allTheMovies))
        .catch(err => res.json(err))
}

module.exports.deleteMovie =(req,res) => {
    movie.findByIdAndDelete(req.params.id)
    .then(res => res.json(res))
    .catch(err => res.json(err))
}

module.exports.findOneMovie = (req,res)=>{
    movie.findById(req.params.id)
    .then(oneMovie => res.json(oneMovie))
    .catch(err => res.status(400).json(err))
}

module.exports.UpdateMovie = (req,res) =>{
    movie.findByIdAndUpdate(req.params.id,
        req.body,
        {new:true,runValidators:true})
    
    .then(updatMovie => res.json(updatMovie))
    .catch(err => res.status(400).json(err))
}