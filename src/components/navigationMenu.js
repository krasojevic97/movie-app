import {useState,useEffect,useRef} from 'react';

function NavigationMenu({query,setQuery,nightMode,setMovies,setNightMode,setCurrentPage}){
    const movieLinks = useRef(null)
    const inputQuery = useRef(null);
      
      // useEffect(() => {
      //   setInput(query);
      // }, [query]);
    
      useEffect(()=>{
        const updateDisplay = () => {
          if (Number(window.innerWidth.toFixed()) > 1250) {
            movieLinks.current.style.display = 'flex';
          } else {
            movieLinks.current.style.display = 'none'; // Hide if width is <= 1250px
          }
        };
    
        // Call the function once to set the initial state
        updateDisplay();
    
        // Add resize event listener to update on window resize
        window.addEventListener('resize', updateDisplay);
    
        // Cleanup function to remove the event listener
        return () => {
          window.removeEventListener('resize', updateDisplay);
        };
      },[])

      const handleSearch = () => {
        console.log(inputQuery.current)
        setQuery(inputQuery.current.value);
        setCurrentPage(1);
      };
    
      const handleKeyDown = () => {
          handleSearch();
      };

      const handleIfEnter = (e) =>{
        if(e.key==="Enter"){
          handleKeyDown();
        }
      }
 
      const toggleMenu = () => {
        if(movieLinks.current.style.display==="none" || !movieLinks.current.style.display){
          movieLinks.current.style.display="flex";
        }
        else{
          movieLinks.current.style.display="none"
        };
      }
    
    return (
        <nav className={`navbar ${nightMode ? `dark`:``}`}>
            <img src="SVG/movies-logo.svg" alt="moviesLogo" className="movies-logo"/>
            <div className={`search-bar ${nightMode ? `dark-text-and-border`:``}`}>
                <input type="text" className={`search-bar-input ${nightMode ? `dark-text-and-border`:``}`} placeholder="Search movies..." onSubmit={()=>handleIfEnter()} onKeyDown={(e)=>handleIfEnter(e)} ref={inputQuery} />
                <button type="submit" onClick={()=>{handleKeyDown()}}  className="search-btn"><svg id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 73 73">
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
            <div className={`movie-links ${nightMode ? "dark":""} `} ref={movieLinks}>
                <button className="toggle-menu-mobile-btn" onClick={()=>toggleMenu()}></button>
                <button className="button-to-movies" onClick={()=>setMovies("All")}>All Movies</button>
                <button className="button-to-movies" onClick={()=>setMovies("Watched")}>Watched Movies</button>
            
                {/* <span>{(query!=="") ? `Found ${.length} results` : ""}</span> */}
                <div className="circle-holder" onClick={()=>setNightMode((prev)=>!prev)}>
                <div className="circle" style={nightMode ?{left:".4em"}:{right:".4em"}}></div> 
                    {/* <div className={`circle-${!nightMode ? "left":"right"}`}></div> */}
                </div>
            </div>
           <button onClick={()=>toggleMenu()} className="burger-button"><div className="burger-menu"></div></button>
        </nav> 
    )
}

export default NavigationMenu;