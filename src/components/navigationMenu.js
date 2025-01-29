

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
        <nav className="navbar purple-bg">
            <img src="SVG/LOGO.svg" alt="moviesLogo" className="movies-logo"/>
            <div style={{display:"flex",gap:"1px"}}>
                <input type="text" className="search-bar" placeholder="Search movies..." value={query} onChange={(e)=>handleChange(e.target.value)}/>
                <button onClick={()=>setClicked(true)} className="search-btn"></button>
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