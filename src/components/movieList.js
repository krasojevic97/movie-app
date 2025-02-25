
function MovieList({children,title}){    
    return (    
            <div className={`movie-display`}>
                <h1>{title}</h1>
                {children}
            </div>
    )
}


export default MovieList;