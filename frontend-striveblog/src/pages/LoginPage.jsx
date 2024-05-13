import "./LoginPage.css";
import Jumbotron from "../components/navbar/Jumbotron";
import LogInForm from "../components/login/LogInForm";
import RegisterForm from "../components/login/RegisterForm";
import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function LoginPage ({convertFileToUrl}) {

    //stato form login/signin:
    const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);
    
    const { token, setToken, authorId, setAuthorId } = useContext(AuthContext);

    const goToHomepage = useNavigate();
    const location = useLocation();

    const defaultAvatar = "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg";

    //POST per registrazione autore: 
    const authorRegistration = async (authorData) => {
        try {    
            let authorAvatar;
            //se l'utente carica l'immagine, altrimenti verrà caricata quella di default
            if(authorData.avatar !== defaultAvatar) {
                authorAvatar = await convertFileToUrl({file: authorData.avatar, field: "avatar"},
                "http://localhost:3001/authorsarea/avatar");
                authorData.avatar = authorAvatar.avatarUrl;
            };

            //passo alla fetch POST:
            const response = await fetch("http://localhost:3001/authorsarea/signin", {
                    method: "POST", 
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify(authorData)
                });
                if (response.ok) {
                    const newAuthor = await response.json();
                    alert("Il tuo profilo è stato registrato correttamente!");                    
                    //rimando al form di login:
                    setIsLoginFormVisible(false);
                } else {
                    console.error(`Si è verificato un errore: ${response.status} ${response.statusText}`)
                }
        } catch (error) {
            console.error("Si è verificato un errore:", error);
        }
    }

    //POST per login e salvataggio token: 
    const authorLogin = async (userData) => {
        try {
            if(userData) {
                const response = await fetch("http://localhost:3001/authorsarea/login", {
                    method: "POST", 
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify(userData)
                });

                if (response.ok) {
                    const loggedAuthor = await response.json();


                    localStorage.setItem("token", loggedAuthor.token);
                    localStorage.setItem("authorId", loggedAuthor.user._id)

                    //controllo se il token e l'ID sono stati salvati correttamente sennò succedono disastri:
                    if (localStorage.getItem('token') && localStorage.getItem('authorId')) {
                        setToken(loggedAuthor.token); 
                        setAuthorId(loggedAuthor.user._id); 
                    } 
                    alert("Login riuscito!");

                    if(localStorage.getItem('token') && localStorage.getItem('authorId')) {
                        goToHomepage("/homepage");
                    } 
            
                } else {
                    alert("Sei nuovo? Registrati per accedere al servizio")
                    setIsLoginFormVisible(true);
                }
            }            
        } catch (error) {
            console.error("Si è verificato un errore:", error);       
        }
    }

    return (
        <>
        <Jumbotron/>
        {isLoginFormVisible ? (
            <div className="register-box">
                <RegisterForm onRegister={authorRegistration}/>
                <p className="my-1 text-center">Hai già un account? <a className="login-link" onClick={(e) => {
                    e.preventDefault();
                    setIsLoginFormVisible(false)}} 
                    >Accedi</a></p>
            </div>
        ) : (
            <div className="login-box">
                <LogInForm onLogin={authorLogin}/>
                <p className="my-1 text-center">Non sei ancora registrato? <a className="login-link" onClick={(e) => {
                    e.preventDefault();
                    setIsLoginFormVisible(true)}}
                >Registrati</a></p>
            </div>
        )}
        </>
    )
}