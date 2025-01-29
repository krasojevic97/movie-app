export default function Type({type}){
    let typeEmoji = null;
    
    if(typeof type==="string" && type){
        switch(type.toLowerCase()){
            case 'game':
                typeEmoji = "🎮" 
                break;
            case 'book':
                typeEmoji  = "📚"
                break;
            case 'movie':case'series':
                typeEmoji  = "🎬"
                break;
            default:
                typeEmoji = null;
                break
        }
    }
    return (
        <div>
            <strong>Type: </strong>{typeEmoji + " " + type}
        </div>
    )
}