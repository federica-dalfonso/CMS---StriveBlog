import "./NotFound.css";
import image from "./404not-found.png"

export default function NotFound () {
    return (
        <div className="d-flex align-items-center justify-content-center">
            <img src={image} alt="la pagina non è stata trovata!"/>
        </div>
    )
}