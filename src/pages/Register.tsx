import React, { useState } from "react"
import { UserAuth } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register () {
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate()
    const { createUser } = UserAuth() 


    async function handleSubmit (e: React.SyntheticEvent) {
        e.preventDefault()
        setErrorMessage("")

        if (password !== confirmPassword) {
            setErrorMessage("Passwords Do Not Match!")
            return
        } 

        try {
            await createUser(email, password)
            navigate("/")                    
        }
        catch (caughtError: unknown) {
            if (caughtError instanceof Error) {
                setErrorMessage(caughtError.message)
            }
            else {
                setErrorMessage(String(caughtError))
            }  
        }    
    }

    return (
        <div className="form-page">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
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
                <input 
                    name="confirmPassword" 
                    type="password" 
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <button type="submit">Register</button>
            </form>
        </div>
    )
}