import { useState } from "react";
import Modals from "../../reusables/Modals";
import "../styles/UrlShortener.css"
import UrlContainer from "./UrlContainer";
const UrlShortener = () => {
    const [enteredUrl, setEnteredUrl] = useState("")
    const [urlContainer, setUrlContainer] = useState([])
    const [modal, showModal] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [notification, setNotification] = useState("")
    
    const handleChange = (event)=>{
        const newValue = event.target.value
        setEnteredUrl(newValue)
    }

    const fetchHandler = async (fetchedValue) => {
        try {
            const response = await fetch("https://tiny-url-572e.onrender.com/post_url", {
                method: 'POST',
                body: JSON.stringify(fetchedValue),
                headers: {
                    "Content-type": "application/json"
                }
            })
            if (!response.ok){
                throw new Error("Invalid url")
            }
            const data = await response.json()
            console.log(data)
            setUrlContainer(prevContainer => [data, ...prevContainer])
            setNotification(data.message)
            showModal(true)
        }catch(error){
            setError(true)
            setErrorMessage(error.message)
        }
    }
    const handleClick = (event) => {
        event.preventDefault()
        setError(false)
        showModal(false)
        const urlLink = {
            url: enteredUrl
        }
        fetchHandler(urlLink)
        setEnteredUrl("")
    }
    return (
        <div>
            {modal && <Modals notification = {notification}/>}
            {error && <Modals notification = {errorMessage} />}
            <div className="input-div">
                <form onSubmit={handleClick} className="input-form">
                    <input placeholder = "Enter or paste url here" name = "url" type="text" onChange={handleChange} value={enteredUrl} required/>
                    <button type="submit">Shorten url</button>
                </form>
            </div>
            <div className="super-container">
                {urlContainer.map(url => <UrlContainer key={url.id} shortenedUrl={url.shortenedUrl} originalUrl={url.originalUrl}/>)}
            </div>
        </div>
    )
}

export default UrlShortener