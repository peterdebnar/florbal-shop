import React, {useState} from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase"
import { useNavigate } from "react-router-dom"

export default function Login () {
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate()

    function signIn (e: React.SyntheticEvent) {
        e.preventDefault() 
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
            console.log(userCredentials)
            navigate("/")
        })
        .catch((error) => {
            if (error.message === "Firebase: Error (auth/user-not-found).") {
                setErrorMessage("Login Failed: User Does Not Exist")
            }
            else if (error.message === "Firebase: Error (auth/wrong-password).") {
                setErrorMessage("Login Failed: Incorrect Password!")
            }
            else {
                setErrorMessage(error.message)
            }
        })
    }

    return (
        <div className="form-page">
            <h1>Log In</h1>
            <form onSubmit={signIn}>
                <input 
                    name="email" 
                    type="email" 
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                    name="password" 
                    type="password" 
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <button type="submit">Log in</button>
            </form>
        </div>
    )
}