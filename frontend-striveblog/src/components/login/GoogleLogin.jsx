import { FcGoogle } from "react-icons/fc";

export default function GoogleLogin () {

    const handleGoogleLogin = (e) => {
        e.preventDefault();
        const str = "http://localhost:3001/authorsarea/googleLogin";
        window.open(str, "_self");
    }

    return(
        <>
        <button onClick={handleGoogleLogin} className="google-btn d-flex align-items-center gap-1">
            accedi con <FcGoogle className="fs-5"/>
        </button>
        </>
    )
}