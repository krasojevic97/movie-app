import Duration from './duration';
import Year from './year';
import Type from './type';

export default function WatchedMovie({movie,nightMode,handleDelete,setSelectedMovie}){
  
    return (
      <div className={`movie-box ${nightMode ? "dark-movie-box":"light"}`} style={{zIndex:"999"}} onClick={()=>setSelectedMovie(movie.imdbID)}>
        <div className="ex-mark" onClick={()=>handleDelete(movie.imdbID)}></div> 
        <img style={{width:"50px"}} src={movie.poster} alt="Poster"></img>
        <div className={`movie-box-info ${nightMode ? "dark-text" :".light-text"}`}>
          <h4 className='text-no-wrap'>{movie.title}</h4>
          {movie.year && <Year year={movie.rear}/>}
          <Rating title={movie.userRating ? "Personal Rating":"Rating"} rating={movie.userRating>0 ? movie.userRating : movie.imdbRating} />
          {movie.runtime &&<Duration duration={movie.runtime}/>}
          {movie.type && <Type type={movie.type}/> }
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