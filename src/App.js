import './App.css';
import {useState, React, useEffect} from 'react';
import MovieList from './components/movieList'
import NavigationMenu from './components/navigationMenu'
import Footer from './components/footer'
import Movie from './components/movie'
import SectionFlex from './components/sectionFlex'
import Box from './components/box';
import SelectedMovie from './components/selectedMovie';
import Loading from './components/loading';
import ErrorMessage from './components/errorMessage';
import WatchedMovie from './components/watchedMovie';
import TopRatedMovies from './components/topRatedMovies';

function App(){
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [query, setQuery] = useState("");
  const [nightMode, setNightMode] = useState(false);
  const [queriedMovies,setQueriedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("")
  const [movies,setMovies] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [watchedMovies,setWatchedMovies] = useState([])
  const [refreshWatched, setRefreshWatched] = useState(false);
  
  const KEY="2581274b";
  
  const handleDelete = async (id) => {
    try{
      const response =  await fetch(`http://localhost:5000/api/movies/${id}`,{
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imdbID: id
        }), // Send the movie object as JSON
      });
      if (!response.ok) throw new Error("Failed to save movie to the server");
      
      const data = await response.json();
      console.log(data.message);
      setRefreshWatched(prev => !prev);

    }catch (error){
      console.error("Error saving movie: ",error)
    }
  }
  
  const handleSelectMovie = (id) => {
    setSelectedMovieId(id);
  }

  const handleClicked  = () => {
    if(query){
      setCurrentPage(1);
      
    }
  }


  const handleAddWatched = async (movie) => {    
          const responsePost = await fetch("http://localhost:5000/api/movies",{
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(movie), // Send the movie object as JSON
          });
          if(responsePost.ok){
            setRefreshWatched(true);
          }else if(!responsePost.ok) {
            throw new Error("Failed to save movie to the server")
          }
  }
  
  const handleGetLength = async () =>{
      const res = await fetch("http://localhost:5000/api/movies",{
        method:'GET'
      });
      if(res.ok){
        const data = res.data.length;
        return data;
      }
  }

  const loadNextPage = () => {
    if (queriedMovies.length < totalResults) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const loadPreviousPage = () =>{
    if(currentPage>1){
      setCurrentPage(prev => prev-1);
    }
  }

  useEffect(function () {
    const controller = new AbortController();
    
    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError('');
        
        const res = await fetch(
          `http://www.omdbapi.com/?s=${encodeURIComponent(query)}&page=${currentPage}&apikey=${KEY}`,
          { signal: controller.signal }
        );
  
        if (!res.ok) throw new Error("Something went wrong!");
        const data = await res.json();
        
        if (data.Response === 'False') throw new Error(data.Error || "Movie not found!");
        
        setTotalResults(Number(data.totalResults));

        setQueriedMovies([...data.Search]);
        
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }
  
    if (query) {
      fetchMovies();
    }
  
    return () => {
      controller.abort();
    };
  }, [query, currentPage, KEY]);


  useEffect(function(){
    async function fetchWatchedMovies() {
        try {
            setIsLoading(true);
            const res = await fetch("http://localhost:5000/api/movies",{method:'GET'});
            
            if (!res.ok) {
                throw new Error('Failed to fetch movies');
            }
            
            await res.json().then(data=>setWatchedMovies(data));
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
            setRefreshWatched(false);
        }
    }
    fetchWatchedMovies();
 },[refreshWatched])

    return (
      <div className={`background ${nightMode ? "dark": "light"}`}>
        <NavigationMenu setMovies={setMovies} 
        query={query} 
        setQuery={setQuery} 
        setNightMode={setNightMode} 
        nightMode={nightMode} 
        setClicked={handleClicked}
        setCurrentPage={setCurrentPage}/>  
        <TopRatedMovies KEY={KEY} nightMode={nightMode} setSelectedMovie={handleSelectMovie}/>
        <SectionFlex>
  {selectedMovieId ? (
    <SelectedMovie
      document={document}
      KEY={KEY}
      selectedMovieId={selectedMovieId}
      setSelectedMovie={handleSelectMovie}
      handleAddWatched={handleAddWatched}
    />
  ) : movies === "All" ? (
    <Box nightMode={nightMode}>
      {isLoading && <Loading />}
      {error && <ErrorMessage message={error} />}
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
          {!isLoading && queriedMovies.length > 0 && queriedMovies.length < totalResults && (
            <div className="load-buttons">
             {currentPage!==1 && <button onClick={()=>loadPreviousPage()}>
                Load Previous
              </button>}
              <button onClick={()=>loadNextPage()}>
              Load Next 
              </button>
            </div>
          )}
        </MovieList>
      )}
    </Box>
  ) : movies === "Watched" ? (
    <Box nightMode={nightMode}>
      <MovieList nightMode={nightMode} title="Watched movies">
                  {watchedMovies.length === 0 ? (
                      <p>No movies watched yet!</p>
                  ) : (
                          watchedMovies.map((movie)=>(
                              <WatchedMovie  setSelectedMovie={handleSelectMovie} movie={movie} handleDelete={handleDelete} key={movie.imdbID} nightMode={nightMode}></WatchedMovie>
                          ))
                  )}
                  </MovieList>
      </Box>
  ) : null}
  </SectionFlex>
          <Footer queriedMovies={totalResults} nightMode={nightMode} watched={handleGetLength}/>
      </div>
      )
}


export default App;
