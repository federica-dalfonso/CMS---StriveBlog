import { Form } from "react-bootstrap";
import { useState } from "react";
import GoogleLogin from "./GoogleLogin";

export default function LogInForm ({onLogin}) {

    //stati gestione info: 
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    //raccolta input utente: 
    const getDatafromUser = (event) => {
        event.preventDefault();

        //controllo campi: 
        if(!userEmail || !userPassword ) {
            alert("I campi sono obbligatori!")
        } else if (userPassword.length < 8) {

            alert("La password che hai scelto è minimo di 8 caratteri, ricontrolla!")
            
        } else {

            const userData = {
            email: userEmail,
            password: userPassword,
            };

            onLogin(userData);
        }        
    }

    return (
        <>
        <h2 className="mt-3">Login</h2>
        <div className="my-4">
            <Form className="d-flex flex-column align-items-center">

                <Form.Group className="mb-3 w-100" controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="La tua email" autoComplete="email"
                    value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3 w-100" controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="La tua password" autoComplete="current-password"
                    value={userPassword} onChange={(e) => setUserPassword(e.target.value)}/>
                </Form.Group>

                <button type="submit" className="login-button px-3 py-2" onClick={getDatafromUser}>
                    Accedi
                </button>

                <div className="d-flex flex-column align-items-center ">
                    <span className="google-fs mb-1">oppure</span>
                    <GoogleLogin/>
                </div>
            </Form>
        </div>
        </>
    )
}