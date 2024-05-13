import { useLocation } from "react-router-dom"

export default function Jumbotron () {

    const location = useLocation();

    return (
        <div className="jumbotron-container">
            <span className="text-uppercase">lo spazio per gli appassionati di cinema</span>
            <span>Strive Blog</span>
        </div>
    )
}