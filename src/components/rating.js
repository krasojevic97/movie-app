export default function Ratings({ratings}){
    return(
        <div className="">
        <strong>Ratings:</strong>
        <ul className="ratings-list">
        {ratings.map((rating)=>{
            if(rating.Source.includes("Rotten Tomatoes")){
                return (<li key={rating.Source}>{rating.Source}: 🍅{rating.Value}</li>)
            }else if(rating.Source.includes("Internet Movie Database")){
                return (<li key={rating.Source}>{rating.Source}: 🗃️{rating.Value}</li>)
            }else if(rating.Source.includes("Metacritic")){
                return (<li key={rating.Source}>{rating.Source}: 🏴󠁣󠁯󠁭󠁥󠁴󠁿{rating.Value}</li>)
            }
        })}
        </ul>
        </div>
    )
}