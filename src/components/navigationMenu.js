

function NavigationMenu({query,setQuery,nightMode,setNightMode,setClicked}){
    
    function toggleNightMode(){
        setNightMode(prev=>!prev);
    }
    function handleChange(e){
       setQuery(e)
    }
   
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
                <input type="text" className={`search-bar-input ${nightMode ? `dark-text-and-border`:``}`} placeholder="Search movies..." value={query} onChange={(e)=>handleChange(e.target.value)}/>
                <button onClick={()=>setClicked(true)} className="search-btn"><svg id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 73 73">
  <defs>
  </defs>
  <g id="Layer_1-2" data-name="Layer 1">
    <g>
      <path fill={nightMode?`#fff`:`#000`}  stroke-width="0px" d="M28,16c6.62,0,12,5.38,12,12s-5.38,12-12,12-12-5.38-12-12,5.38-12,12-12M28,12c-8.84,0-16,7.16-16,16s7.16,16,16,16,16-7.16,16-16-7.16-16-16-16h0Z"/>
      <line fill="none" stroke={nightMode?`#fff`:`#000`} stroke-width="2px" stroke-miterlimit="10" x1="39" y1="39" x2="57" y2="57"/>
      <path fill="none" stroke={nightMode?`#fff`:`#000`} stroke-width="4px" stroke-miterlimit="10" d="M40.67,41l19.33,19.93-19.33-19.93Z"/>
    </g>
  </g>
</svg></button>
            </div>
            <div>
                {/* <span>{(query!=="") ? `Found ${.length} results` : ""}</span> */}
                <div className="circle-holder" onClick={()=>toggleNightMode()}>
                <div className="circle" style={nightMode ?{left:".4em"}:{right:".4em"}}></div> 
                    {/* <div className={`circle-${!nightMode ? "left":"right"}`}></div> */}
                </div>
            </div>
           
        </nav> 
    )
}

export default NavigationMenu;