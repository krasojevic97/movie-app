import {useState, useEffect} from 'react';
import TopRatedMovie from './topRatedMovie'
import Carousel from 'react-multi-carousel';

export default function TopRatedMovies({KEY,topRatedMovies,nightMode}){
    const [topMovies, setTopMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const topMovieIds = [ 'tt0111161', // The Shawshank Redemption
    'tt0068646', // The Godfather
    'tt0071562', // The Godfather: Part II
    'tt0468569', // The Dark Knight
    'tt0050083', // 12 Angry Men
    'tt0108052', // Schindler's List
    'tt0167260', // The Lord of the Rings: The Return of the King
    'tt0110912', // Pulp Fiction
    'tt0060196', // The Good, the Bad and the Ugly
    'tt0120737', // The Lord of the Rings: The Fellowship of the Ring
    'tt0109830', // Forrest Gump
    'tt0137523', // Fight Club
    'tt0167261', // The Lord of the Rings: The Two Towers
    'tt0080684', // Star Wars: Episode V - The Empire Strikes Back
    'tt0133093'  // The Matrix
    ]

    const responsive = {
      superLargeDesktop: {
          breakpoint: { max: 4000, min: 3000 },
          items: 5
      },
      desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 4
      },
      tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
      },
      mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
      }
  };
    
    useEffect(()=>{
      async function fetchTopMovies() {
        try {
            setIsLoading(true);
            setError('');

            // Fetch details for each movie
            const moviePromises = topMovieIds.map(id =>
                fetch(`http://www.omdbapi.com/?i=${id}&apikey=${KEY}`)
                    .then(res => res.json())
            );

            const movies = await Promise.all(moviePromises);

            // Sort movies by IMDB rating
            const sortedMovies = movies
                .filter(movie => movie.Response === 'True')
                .sort((a, b) => Number(b.imdbRating) - Number(a.imdbRating));

            setTopMovies(sortedMovies);
        } catch (err) {
            setError('Error loading top movies');
        } finally {
            setIsLoading(false);
        }
    }

    fetchTopMovies();
    },[KEY]);

    if (isLoading) return <div>Loading top rated movies...</div>;
    if (error) return <div><img src='/images/Error'/>{error}</div>;
    return (
          <div className={`${nightMode? "dark": ""} top-rated-container`}>
            <h2>Top Rated Movies</h2>
            <Carousel
                responsive={responsive}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={3000}
                keyBoardControl={true}
                customTransition="all .5s"
                transitionDuration={500}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
                prevArrow={<></>}
                nextArrow={<></>}
            >
            <div className="top-rated-movies">
                {topMovies.map(movie => (
                    <TopRatedMovie movie={movie} nightMode={nightMode}></TopRatedMovie>
                ))}
            </div>
            </Carousel>
        </div>
    )
}