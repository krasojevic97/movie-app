import {useState,useEffect} from 'react';

function NavigationMenu({query,setQuery,nightMode,setMovies,setClicked,setNightMode,
    setCurrentPage}){
    const [input, setInput] = useState("");
    useEffect(() => {
        setInput(query);
      }, [query]);
    
      const handleSearch = () => {
        if (input.trim()) {
          setQuery(input);
          setCurrentPage(1);
          setClicked(true);
        }
      };
    
      const handleKeyDown = (e) => {
        if (e.key === 'Enter'|| e.key=== 'ArrowDown') {
          handleSearch();
        }
      };
    
   
    // const handleSearch = async () => {
    //     const apiKey = 'your_api_key'; // Replace with your API key
    //     const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(query)}`;
    //     try {
    //       const response = await fetch(url);
    //       const data = await response.json();
    //       if (data.Response === "True") {
    //         return data.Search;
    //       } else {
    //         console.error(data.Error);
    //         return [];
    //       }
    //     } catch (error) {
    //       console.error("Error fetching movies:", error);
    //     }
    //   };
    return (
        <nav className={`navbar ${nightMode ? `dark`:``}`}>
            <img src="SVG/movies-logo.svg" alt="moviesLogo" className="movies-logo"/>
            <div className={`search-bar ${nightMode ? `dark-text-and-border`:``}`}>
                <input type="text" className={`search-bar-input ${nightMode ? `dark-text-and-border`:``}`} placeholder="Search movies..." onKeyDown={handleKeyDown} value={input} onChange={(e)=>setInput(e.target.value)}/>
                <button onClick={()=>{handleKeyDown(input)}}  className="search-btn"><svg id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 73 73">
                <defs>
                </defs>
                <g id="Layer_1-2" data-name="Layer 1">
                    <g>
                    <path fill={nightMode?`#fff`:`#000`}  strokeWidth="0px" d="M28,16c6.62,0,12,5.38,12,12s-5.38,12-12,12-12-5.38-12-12,5.38-12,12-12M28,12c-8.84,0-16,7.16-16,16s7.16,16,16,16,16-7.16,16-16-7.16-16-16-16h0Z"/>
                    <line fill="none" stroke={nightMode?`#fff`:`#000`} strokeWidth="2px" strokeMiterlimit="10" x1="39" y1="39" x2="57" y2="57"/>
                    <path fill="none" stroke={nightMode?`#fff`:`#000`} strokeWidth="4px" strokeMiterlimit="10" d="M40.67,41l19.33,19.93-19.33-19.93Z"/>
                    </g>
                </g>
                </svg></button>
            </div>
            <div className="movie-links">
                <button className="button-to-movies" onClick={()=>setMovies("All")}>All Movies</button>
                <button className="button-to-movies" onClick={()=>setMovies("Watched")}>Watched Movies</button>
            
                {/* <span>{(query!=="") ? `Found ${.length} results` : ""}</span> */}
                <div className="circle-holder" onClick={()=>setNightMode((prev)=>!prev)}>
                <div className="circle" style={nightMode ?{left:".4em"}:{right:".4em"}}></div> 
                    {/* <div className={`circle-${!nightMode ? "left":"right"}`}></div> */}
                </div>
            </div>
           
        </nav> 
    )
}

export default NavigationMenu;