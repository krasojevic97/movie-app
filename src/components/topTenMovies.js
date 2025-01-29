import Movie from './movie';

function TopTenMovies({movieList}){
    return (
        <div className="top-ten-display">
        {
            movieList.map((movie)=>(
                <Movie movie={movie}></Movie>
            ))
        }</div>
    )
}

export default TopTenMovies;