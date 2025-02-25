const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Enable CORS for React app
app.use(bodyParser.json()); // Parse JSON request bodies

// Path to the JSON file
const dataFilePath = path.join(__dirname, "watchedMovies.json");

// Read existing data from the JSON file
function readData() {
  if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, JSON.stringify([])); // Create file if it doesn't exist
  }
  
  const data = fs.readFileSync(dataFilePath, "utf-8");
  const parsedData = JSON.parse(data); 

  if (!Array.isArray(parsedData.watchedMovies)) {
    throw new Error("watchedMovies should be an array of movie objects.");
  }

  return new Map(parsedData.watchedMovies.map((movie) => [movie.imdbID, movie]));
}

function readDataArray(){
  if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, JSON.stringify([])); // Create file if it doesn't exist
  }
  const data = fs.readFileSync(dataFilePath, "utf-8");
  const parsedData = JSON.parse(data);
  if (!Array.isArray(parsedData.watchedMovies)) {
    throw new Error("watchedMovies should be an array of movie objects.");
  }
  return parsedData.watchedMovies;
}

// Write data to the JSON file
function writeData(movies) {
  let data = [];
  if(movies instanceof Map){
    data = {
      watchedMovies: Array.from(movies.values())
    };
  }else if (Array.isArray(movies)) {
    data = {
      watchedMovies: movies 
    };
  }else{
    throw new TypeError("Expected a Map or an array as the input parameter.")
  }
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
  
};

// POST endpoint to save movie data
app.post("/api/movies", (req, res) => {
    const newMovie = req.body; // Get the movie data from the request body
    if (!newMovie) {
      return res.status(400).json({ error: "No movie data provided" });
    }
    const movies = readData(); // Read existing data

    if(!movies.get(newMovie.imdbID)){
      movies.set(newMovie.imdbID,newMovie); // Add the new movie
    }
    writeData(movies); // Save the updated data
    res.status(201).json({ message: "Movie saved successfully!" });
  
});

app.get("/api/movies",(req,res)=>{
    const data = readDataArray();
    res.json(data);
})

app.get("/api/movies/:imdbID",(req,res) =>{  
  const imdbID = req.params.imdbID;
  const movies = readDataArray();
  const id = movies.watchedMovies.find((movie)=>movie.id===imdbID);
  res.json(id);
})

app.delete("/api/movies/:imdbID", (req, res) => {
  const imdbID = req.params.imdbID; // Get the imdbID from the URL
  const movies = readDataArray(); // Read existing data

 
  // Find the index of the movie with the given imdbID
  const movieIndex = movies.findIndex((movie) => movie.imdbID === imdbID);

  if (movieIndex === -1) {
    return res.status(404).json({ message: "Movie not found" });
  }

  // Remove the movie from the array
  movies.splice(movieIndex, 1);

  // Save the updated data
  writeData(movies);

  res.status(200).json({ message: "Movie deleted successfully!" });
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});