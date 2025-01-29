export function Footer({queriedMovies, watched}){
    return (
        <div className="footer-display">
            <p className="footer-text">{queriedMovies ? `Found ${queriedMovies.length} movies. `:""}{watched.length>0 ? `You watched ${watched.length} of them.`:"You watched none of these."}</p>
            <p className="copyright">Copyright &copy; 2025 Andrija Krasojevic</p>
        </div>
    )
}
export default Footer;