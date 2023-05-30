import "../styles/UrlContainer.css"
const UrlContainer = (props) => {
    return (
        <div className="url-container">
            <p className="long-url">{props.originalUrl.slice(0, 40)}...</p>
            <p className="short-url">localhost:8079/url/{props.shortenedUrl}</p>
        </div>
    )
}

export default UrlContainer