import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import MySpinner from "../components/loaders/MySpinner";

export default function LoadingWelcome () {

    const { setToken } = useContext(AuthContext);

    const unlockHomepage = useNavigate();

    const handleGoogleLoginResponse = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const tokenValue = urlParams.get("accessToken");
    
        if (tokenValue) {
            localStorage.setItem('token', tokenValue);
            setToken(tokenValue);
            unlockHomepage("/homepage"); 
        }  else {
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                setToken(storedToken);
                unlockHomepage("/homepage");
            }
        }    
    };

    useEffect(() => {
        handleGoogleLoginResponse();
    }, []);

    return (
        <>
        <div className="d-flex justify-content-center align-item-center">
            <MySpinner/>
        </div>        
        </>
    )  
}