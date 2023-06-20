import style from "../components/css/style.module.css"
import React,{useState,useEffect} from 'react'
import {Link} from "react-router-dom"
import axios from 'axios'


const AllMovies = () =>{
    const [name,setName] = useState("")
    const [genre,setGenre] = useState("")
    const [movies,setMovies] = useState([])
    const [error,setError] = useState({})
    useEffect(()=>{
        axios.get('http://localhost:8000/api/movie')
            .then(res=>{
                console.log(res)
                setMovies(res.data)
            })
            .catch(err=>console.log(err))
    },[])
    const submitHandler =(e) =>{
        e.preventDefault()
        axios.post('http://localhost:8000/api/movie',{
            name,
            genre
        })
        .then(res => {
            console.log(res.data);
            setMovies([...movies,res.data])
            setName("")
            setGenre("")
            setError({})
        })
        .catch(err => {
            console.log(err.response.data.errors)
            setError(err.response.data.errors)
        })
    }
    const deleteHandler = (movieid) =>{
        axios.delete(`http://localhost:8000/api/movie/${movieid}`)
            .then(res =>{ 
                console.log(res)
                console.log(`user ${movieid} was deleted`)
                // removefromdom(movieid)
                setMovies(movies.filter(movie=>movie._id !== movieid))
            })
            .catch(err => {console.log(err)})
    }
    // const removefromdom = (movieid) =>{
    //     setMovies(movies.filter(movie=>movie._id !== movieid))
    // }
    return(
        <div>
            <div className={style.nav}>
                <h1>All Movies</h1>
                <a href="/logout">Logout</a>
            </div>
            <div className={style.centerOfPage}>
                <table>
                    <tr>
                        <th>Title</th>
                        <th>Genre</th>
                        <th>Actiona</th>
                    </tr>
                    {movies.map((movie,index)=>{
                        return(
                            <tr key={index}>
                                <td>{movie.name}</td>
                                <td>{movie.genre}</td>
                                <td><Link to={`/edit/${movie._id}`}>update</Link>/<button onClick={(e)=>deleteHandler(movie._id)}>Delete</button></td>
                            </tr>
                        )
                    })}
                </table>
            </div>
            <div className={style.centerOfPage}>
                <h1>Add Movie</h1>
                <form onSubmit={submitHandler}>
                    <div>
                    <label htmlFor="name">Name</label>
                    {error.name && 
                        <p className={style.error}>{error.name.message}</p>
                    }
                    <input type="text" value={name} onChange={(e)=>setName(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="genre">Genre</label>
                        {error.genre && 
                        <p className={style.error}>{error.genre.message}</p>
                        }
                        <input type="text" value={genre} onChange={(e)=>setGenre(e.target.value)}/>
                    </div>
                    <input type="submit" value="submit" />
                </form>
            </div>
        </div>
    )
}
export default AllMovies