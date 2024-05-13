import { Form } from "react-bootstrap";
import { useState } from "react";
 
export default function RegisterForm ({onRegister}) {

    //stati gestione info nei campi:
    const [autName, setAutName] = useState("");
    const [autSurname, setAutSurname] = useState("");
    const [autEmail, setAutEmail] = useState("");
    const [autBirth, setAutBirth] = useState("");
    const [autPassword, setAutPassword] = useState("");
    const [autAvatar, setAutAvatar] = useState("");

    const defaultAvatar = "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg";

    const getDataFromInput = (event) => {
        event.preventDefault();

        //controllo campi: 
        if(!autName || !autSurname || !autEmail || !autBirth || !autPassword ) {
            alert("I campi contrassegnati sono obbligatori!")
        } else if (autPassword.length < 8) {
            alert("La password deve essere lunga almeno 8 caratteri!")
        } else {

            const authorData = {
            name: autName,
            surname: autSurname,
            email: autEmail,
            birth: autBirth,
            password: autPassword,
            avatar: autAvatar || defaultAvatar
            }

            // console.log(authorData);
            onRegister(authorData);
        }        
    }

    return (
        <>
        <h2 className="mt-3">Registrati</h2> 
        <div className="my-4">
            <Form className="d-flex flex-column align-items-center" autoComplete="on">

                <Form.Group className="mb-3 w-100" controlId="formBasicName">
                    <Form.Label className="form-labels">Nome*</Form.Label>
                    <Form.Control type="text" placeholder="es. Marco" autoComplete="given-name"
                    value={autName} onChange={(e) => {setAutName(e.target.value)}}/>
                </Form.Group>

                <Form.Group className="mb-3 w-100" controlId="formBasicSurname">
                    <Form.Label className="form-labels">Cognome*</Form.Label>
                    <Form.Control type="text" placeholder="es. Rossi" autoComplete="family-name"
                    value={autSurname} onChange={(e) => setAutSurname(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3 w-100" controlId="formBasicEmail">
                    <Form.Label className="form-labels">Indirizzo e-mail*</Form.Label>
                    <Form.Control type="text" placeholder="es. mioindirizzo@email.com" autoComplete="email"
                    onChange={(e) => setAutEmail(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3 w-100" controlId="formBirthDate">
                    <Form.Label className="form-labels">Data di nascita*</Form.Label>
                    <Form.Control type="date" name="dateOfBirth" autoComplete="bday"
                    value={autBirth} onChange={(e) => setAutBirth(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3 w-100" controlId="formBasicPassword">
                    <Form.Label className="form-labels">Scegli una password*</Form.Label>
                    <Form.Control type="password" 
                    aria-describedby="passwordHelpBlock" autoComplete="new-password"
                    value={autPassword} onChange={(e) => setAutPassword(e.target.value)}/>
                    <Form.Text id="passwordHelpBlock" muted>
                        Scegli una password sicura, con almeno 8 caratteri
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicAvatar">
                    <Form.Label className="form-labels">Carica la tua immagine profilo</Form.Label>
                    <Form.Control type="file" name="avatar"
                    onChange={(e) => setAutAvatar(e.target.files[0])}/>
                </Form.Group>

                <button type="submit" className="login-button px-3 py-2 mt-1" onClick={getDataFromInput}>
                    Registrati
                </button>
            </Form>
        </div>
        </>
    )
}