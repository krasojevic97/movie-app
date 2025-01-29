import './App.css';
import {useState, React, useEffect} from 'react';
import MovieList from './components/movieList'
import NavigationMenu from './components/navigationMenu'
import Footer from './components/footer'
import Movie from './components/movie'
import SectionFlex from './components/sectionFlex'
import Box from './components/box';
import MovieDetails from './components/movieDetails';
import Loading from './components/loading';
import ErrorMessage from './components/errorMessage';
import WatchedMovie from './components/watchedMovie';



function App(){
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [clicked, setClicked] = useState(false)
  const [query, setQuery] = useState("");
  const [nightMode, setNightMode] = useState(false);
  const [queriedMovies,setQueriedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("")
  const [watched, setWatched] = useState([]);
  const KEY="2581274b";
  
  const handleDelete = (id) => {
    setWatched((prevMovies)=>prevMovies?.filter((movie)=> movie.imdbID!==id));
  }
  
  const handleSelectMovie = (id) => {
    setSelectedMovieId(id);
  }

  function handleAddWatched(movie){
    console.log(watched)
    if(watched?.some(element => element.imdbID===movie.imdbID)){
        return;
      }
    if(watched){
      setWatched((watched) => [...watched,movie])
    }else{
      setWatched([movie])
    }
  }
  
  useEffect(function (){
    const controller = new AbortController();  
      async function fetchMovies(){
      try{
        setIsLoading(true);
        setError('');
        
        const res = await fetch(`http://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${KEY}`, {signal: controller.signal})

        if(!res.ok) throw new Error("Something went wrong!")
        const data = await res.json();
        if(data.Response === 'False') throw new Error("Movie not found!")
        setQueriedMovies(data.Search);
        console.log(data.Search)
      } catch (err){
        setError(err.message)
      }finally{
        setIsLoading(false);
        setClicked(false);
      }
    }
    document.addEventListener("keydown",(e)=>{
      if(e.code ==="Enter" && query){
        fetchMovies();
      }
    })
      if(clicked && query){
      fetchMovies();
      }
    return function(){
      controller.abort();
    }
  }, [clicked,query]);


    return (
      <div className={`background ${nightMode ? "dark": "light"}`}>
        <NavigationMenu query={query} setQuery={setQuery} setNightMode={setNightMode} nightMode={nightMode} setClicked={setClicked}/> 
        <SectionFlex>
        <Box nightMode={nightMode}>
            {isLoading && <Loading />}
            {error && <ErrorMessage message={error}/>}
            {!isLoading && !error && (
            <MovieList nightMode={nightMode} title="All movies">
              {queriedMovies?.map((movie) => (
                <Movie
                  setSelectedMovie={handleSelectMovie}
                  key={movie.imdbID}
                  movie={movie}
                  nightMode={nightMode}
                  handleDelete={handleDelete}
                />
              ))}
              </MovieList>
          )}
        </Box>
          <Box nightMode={nightMode}>
          {selectedMovieId ? (
            <MovieDetails
              document={document}
              KEY={KEY}
              selectedMovieId={selectedMovieId}
              setSelectedMovie={handleSelectMovie}
              handleAddWatched={handleAddWatched}
            />
          ) : (
            <MovieList nightMode={nightMode} title="Watched movies">
              { (
                watched?.map((movie) => (
                  <WatchedMovie
                    key={movie.imdbID}
                    movie={movie}
                    nightMode={nightMode}
                    handleDelete={handleDelete}
                  />
                ))
              )}
            </MovieList>
          )}
        </Box> 
      </SectionFlex>
          <Footer queriedMovies={queriedMovies} watched={watched}/>
      </div>
      )
}


export default App;
