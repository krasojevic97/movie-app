export default function Footer({queriedMovies, watched, nightMode}){
    
    return (
        <div className={`footer-display ${nightMode ? `dark`:``}`}>
            {<p className="footer-text">{queriedMovies ? `Found ${queriedMovies} movies. `:""}{watched.length>0 ? `You have ${watched.length} in your watched list!`:"Your watched list is empty!"}</p>}
            <p className="copyright">Copyright &copy; 2025 Andrija Krasojevic</p>
        </div>
    )
}