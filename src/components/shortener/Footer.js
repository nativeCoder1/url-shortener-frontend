import "../styles/Footer.css"

let date = new Date().getFullYear()
const Footer = () => {
    return (
        <div className="footer">
            <p>Ahmad &copy; {date}</p>
        </div>
    )
}

export default Footer