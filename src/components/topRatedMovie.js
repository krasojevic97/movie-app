import {useState} from 'react';
export default function TopRatedMovie({movie, nightMode, setSelectedMovie}){
    const [hovered, setHovered]= useState(false);
    
    function handleEnter(){
        setHovered(true);
    }
    function handleLeave(){
        setHovered(false);
    }

    return (
        <div key={movie.imdbID} onMouseEnter={handleEnter} onMouseLeave={handleLeave} onClick={()=>setSelectedMovie(movie.imdbID)} style={{backgroundImage:`url(${movie.Poster})`,backgroundRepeat:"no-repeat",backgroundSize:"cover"}}className={`top-rated-movie ${nightMode ? "dark":""}`}>
            <div className="movie-info" style={{display:`${!hovered ? "none" : "flex"}`}} >
                <h3 className="text-no-wrap">{movie.Title}</h3>
                <p>IMDB Rating: {movie.imdbRating}</p>
            </div>
        </div>
    )
}