export default function Hero({nightMode}){
    return (
<div className={`hero ${nightMode?`dark`:``}`}>
        <h1 className="welcome-text">Welcome to my website!</h1>
        <p className="site-description">This is a simple website that allows you to search movies,
                                        rate them and save watched movies!
        </p>
    </div>
    )
}