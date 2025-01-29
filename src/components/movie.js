import Duration from './duration';
import Year from './year';
import Type from './type';

export default function Movie({movie,nightMode,handleDelete,setSelectedMovie}){
    return (
      <div className={`movie-box ${nightMode ? "dark-movie-box":"light"}`} onClick={()=>setSelectedMovie(movie.imdbID)}>
        {/* <div className="ex-mark" onClick={()=>handleDelete(movie.imdbID)}></div> */}
        <img style={{width:"50px"}} src={movie.Poster} alt="Poster"></img>
        <div className={`movie-box-info ${nightMode ? "dark-text" :".light-text"}`}>
          <h4 className='text-no-wrap'>{movie.Title}</h4>
          {movie.Year && <Year year={movie.Year}/>}
          {movie.imdbRating &&<Rating title={"Rating"} rating={movie.imdbRating} />}
          {movie.RunTime &&<Duration duration={movie.Runtime}/>}
          {movie.Type && <Type type={movie.Type}/> }
          {/* {movie.personalRating>0 && <Rating title={"Personal rating"} rating={movie.personalRating} />} */}
        </div>
      </div>
    ) 
}

function Rating({title, rating}){
  return (
    <div className="star-rating">
              <h4 className="text-no-wrap">{title}:</h4>
              <object data="/SVG/star.svg" type="image/svg+xml" width="20px">{title}</object>
              <span>{rating}</span>
          </div>
  )
}