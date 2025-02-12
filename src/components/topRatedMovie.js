export default function TopRatedMovie({movie,nightMode, handleClick}){
    function handleClick(e){
        console.log(e);
    }
    return (
        <div key={movie.imdbID} className={`top-rated-movie ${nightMode ? "dark":""}`}>
            <img 
                src={movie.Poster} 
                alt={movie.Title} 
                style={{ width: '100px', height: 'auto' }}
            />
            <div className="movie-info">
                <h3 className="text-no-wrap">{movie.Title}</h3>
                <p>IMDB Rating: {movie.imdbRating}</p>
            </div>
        </div>
    )
}