import { Link,useParams,useNavigate } from "react-router-dom"
import { useState,useEffect } from "react"
import style from "../components/css/style.module.css"
import axios from "axios"

const EditMovie =(props) =>{
    const navigate = useNavigate()
    const {id} = useParams()
    const [name,setName] = useState("")
    const [genre,setgenre] = useState("")
    const [errors,setErrors] = useState({})
    useEffect(()=>{
        axios.get(`http://localhost:8000/api/movie/${id}`)
            .then(res => {
                console.log(res)
                setName(res.data.name)
                setgenre(res.data.genre)
            })
            .catch(err => console.log(err))
    },[])
    const submitHandler = (e) =>{
        e.preventDefault()
        axios.put(`http://localhost:8000/api/movie/${id}`,{
            name,
            genre
        })
        .then(res => {
            console.log(res)
            navigate('/')
        })
        .catch(err => {
            console.log("this is the error")
            console.log(err)
            console.log(err.response.data)
            setErrors(err.response.data.errors)
        })
    }
    return(
        <div>
            <div>
                <h1>Edit {name}</h1>
                <Link to={'/'}>Home</Link>
            </div>
            <div>
                <form onSubmit={submitHandler}>
                    <div>
                        <label htmlFor="name">Name</label>
                        {errors.name ?
                            <p className={style.error}>{errors.name.message}</p>
                            :null
                        }
                        <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="genre">Genre</label>
                        {errors.genre &&
                            <p className={style.error}>{errors.genre.message}</p>
                        }
                        <input type="text" value={genre} onChange={(e)=>setgenre(e.target.value)}/>
                    </div>
                    <input type="submit" value="submit" />
                </form>
            </div>
        </div>
    )
}
export default EditMovie