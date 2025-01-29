import {useState} from 'react';

export default function TextExpander({children,textLength = 20, btnColor="red"}){
    const [expand,setExpand] = useState(false);

    const btnStyle = {
        padding:"2px",borderRadius:"5px", border:"none",cursor:"pointer", color:`${btnColor}`,backgroundColor:"transparent"
    }

    return (
        <span className="text-wrap">
            {expand ? children : children.slice(0,textLength)+"..."}
            <button style={btnStyle} onClick={()=>setExpand(!expand)}>{expand ? "Show less":"Show more"}</button>
        </span>
    )
}