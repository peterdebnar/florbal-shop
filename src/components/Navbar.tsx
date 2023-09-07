import React from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { UserAuth } from "./AuthContext";

export default function Navbar () {

    const { user, logout } = UserAuth()
    const navigate = useNavigate()

    const styleActive = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#2C79D3"
    }

    const styleDefault = {
        color: "black"
    }

    async function handleLogout () {
        try {
            await logout()
            navigate("/login")
        }
        catch (error: unknown) {               
            if (error instanceof Error) {
                console.log(error.message)
            }
            else {
                console.log(String(error))
            }  
        }
    }

    return (
        <div className="navbar">
            <div id="navbar-logo" className="logo">
                <h2 className="logo-florbal">Florbal</h2>
                <h2 className="logo-shop">Shop</h2>
            </div>
            <div className="nav-links-box">
                <NavLink 
                    className="nav-links" 
                    to="/"
                    style={({isActive}) => isActive ? styleActive : styleDefault}
                >
                    Home
                </NavLink>
                <NavLink 
                    className="nav-links" 
                    to="/shop"
                    style={({isActive}) => isActive ? styleActive : styleDefault}
                >
                    Shop
                </NavLink>
                <NavLink 
                    className="nav-links" 
                    to="/contact"
                    style={({isActive}) => isActive ? styleActive : styleDefault}
                >
                    Contact
                </NavLink>
                {!user && 
                <NavLink 
                    className="nav-links" 
                    to="/login"
                    style={({isActive}) => isActive ? styleActive : styleDefault}
                >
                    Login
                </NavLink>
                }
                {!user && 
                <NavLink 
                    className="nav-links" 
                    to="/register"
                    style={({isActive}) => isActive ? styleActive : styleDefault}
                >
                    Register
                </NavLink>
                }
                {
                    user && 
                    <button onClick={handleLogout}>
                        Logout
                    </button>
                }
            </div>
        </div>
    )
}

