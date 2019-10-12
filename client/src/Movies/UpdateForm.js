import React, {useState, useEffect} from "react";
import axios from "axios";
 
const initialState = {
    title: "",
    director:"",
    metascore:"",
    stars:"",
}

const UpdateForm = props => {
    console.log("UpdateForm props:" , props)
    const [movie, setMovie]=useState(initialState);

    const{match, movies} = props;
        useEffect(() => {
            const id = match.params.id;
            const movieToUpdate = movies.find(movie => `${movie.id}`===id);
            if(movieToUpdate) {
                setMovie(movieToUpdate)
            }
        }, [match, movies])

        const changeHandler = event => {
            event.persist();
            setMovie({
              ...movie,
              [event.target.name]: event.target.value
            });
          };
          const handleSubmit = event => {
            event.preventDefault();
            axios
              .put(`http://localhost:5000/api/movies/${movie.id}`,movie)
              .then(res => {
                props.updateMovie(res.data);
                props.history.push(`/movie-list/${movie.id}`);
                setMovie(initialState);
              })
              .catch(error => console.log(error.response));
          };

          return (
            <div>
              <h2>Update Movie</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="title"
                  onChange={changeHandler}
                  placeholder="Title"
                  value={movie.title}
                />
                <input
                  type="text"
                  name="director"
                  onChange={changeHandler}
                  placeholder="Director"
                  value={movie.director}
                />
                <input
                  type="number"
                  name="metascore"
                  onChange={changeHandler}
                  placeholder="Metascore"
                  value={movie.metascore}
                />
        
                <input
                  type="text"
                  name="stars"
                  onChange={changeHandler}
                  placeholder="Stars"
                  value={movie.stars}
                />

                <button className="update-form-button">Update</button>
              </form>
            </div>
          )
}


export default UpdateForm