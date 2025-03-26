import StarRating from "./starRating";
import {useState,useEffect,useRef} from 'react';
import TextExpander from "./textExtender";
import Duration from './duration';
import Type from './type'
import Actors from './cast';
import Ratings from './rating'
import Year from './year'

export default function SelectedMovie({selectedMovieId,handleAddWatched,setSelectedMovie,KEY}){
    const [movie,setMovie] = useState({})
    const [userRating, setUserRating] = useState("");
    const countRef = useRef(0);


    useEffect(function() {
        if(userRating){
            countRef.current = countRef.current+1;
        }
    },[userRating])

    const {
        Title:title="",
        Year:year="",
        Poster:poster="",
        Runtime:runtime="",
        Type:type="",
        imdbRating,
        Plot:plot="",
        Released:released="",
        Ratings:ratings=[],
        Actors: actors="",
        Director: director="",
        Genre: genre="",
    } = movie;


    function handleAdd(){
        const newMovie = {
            imdbID: selectedMovieId,
            title,
            year,
            poster,
            imdbRating,
            runtime,
            plot,
            released,
            actors,
            director,
            genre,
            userRating
        }
        handleAddWatched(newMovie);
    }

    useEffect(function(){
        async function getMovieDetails(){
            try{
            const res = await fetch(`http://www.omdbapi.com/?i=${encodeURIComponent(selectedMovieId)}&apikey=${KEY}`)//${encodeURIComponent(movie)}tt0120737
            if (!res.ok) throw new Error("Failed to fetch movie details");
            const data = await res.json();
            setMovie(data);
            }
            catch(err){
                console.log(err)
            }
        }
        getMovieDetails();
    }
    ,[selectedMovieId,KEY]);

    useEffect(() => {
        if (!title) return; 
        document.title = `Movie | ${title}`;
        return function(){
            document.title="Movies App"
        }
    }, [title]);

    useEffect(() => {
        function callback(e) {
            if (e.code === "Escape") {
                setSelectedMovie(null);
            }
        }
        document.addEventListener("keydown", callback);
        
        return () => {
            document.removeEventListener("keydown", callback);
        };
    }, [setSelectedMovie]);

    if (!movie.imdbID) return <div className="loading-movie">Loading...</div>; 
    
    const imgStyle = {
        height:"400px",
        borderRadius:"10px",
        boxShadow:"0 0 10px",
    }
    console.log(movie)
    return (
        
        <div className="select-movie-box">
            <div className="select-movie-details-box">
                <div className="position-abs" onClick={()=>setSelectedMovie(null)}>
                    <img src="/SVG/left-arrow.svg" width="40px" height="40px" alt="Left Arrow"></img>
                </div>
                <img src={poster} style={imgStyle} alt="Poster"/>
                <div className="movie-details-box">
                    <h4 style={{fontSize:"1.5em", fontFamily:"Poppins"}}>{title}</h4>  
                    <Duration duration={runtime}/>
                    <Type type={type} />
                    <Actors cast={actors} />
                    <Ratings ratings={ratings}/>
                    <Year year={year}></Year>
                    {/* <Rating movie={movieDetails}/>    */}
                </div>
            </div>
            <div className="movie-box-plot">
               <StarRating maxRating={10} movie={movie} onChange={setUserRating} userRating={userRating}/>  
               <em><TextExpander textLength={20}>{plot}</TextExpander></em>
                <button className="add-movie-btn" onClick={()=>handleAdd()}>Add to List</button> {/* If movie includes that selected id the button will not appear*/ }
            </div>
        </div>     
    )
}
 