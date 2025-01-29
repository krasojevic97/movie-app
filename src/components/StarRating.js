import {useState} from 'react';
import Star from './star';

export default function StarRating({maxRating=5, movie, color="yellow",onChange,userRating}){
    const [hovered, setHovered] = useState(0);
    
    const containerStyle = {
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        justifySelf:"center",
        gap:"16px"
    }

    const starContainerStyle = {
        display:"flex"
    }

    const textStyle = {
        lineHeight: "1",
        margin: '0',
    }

    function handleRating(rating){
        onChange(rating);
    }
    return <div>
        <div style={containerStyle}>
            <div style={starContainerStyle}>
                Rate:{Array.from({length : maxRating},(_,i)=><span><Star key={i} 
                                                                         color={color} 
                                                                         full={i < (movie.imdbRating && hovered ? (userRating < hovered ? hovered : userRating) : (userRating || movie.imdbRating))} 
                                                                         onHover={() => setHovered(i + 1)} 
                                                                         onLeave={() => setHovered(0)}
                                                                         onClick={() => handleRating(i + 1)}/></span>)}
            </div>
            <p style={textStyle}>{userRating>0 ? userRating : movie.imdbRating}</p>
        </div>
    </div>
}

