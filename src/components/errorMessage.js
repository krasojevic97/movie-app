export default function ErrorMessage({message}){
    return (
        <div style={{fontSize:"1.3em",fontWeight:"bold",fontFamily:"Open sans",textAlign:"center", display:"flex",justifyContent:"center", alignItems:"center"}}><img src="/SVG/Error.svg" width="40px" height="40px"/>{message}</div>
    )
}