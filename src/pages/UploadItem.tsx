import React, {useState, useEffect} from "react"
import { postItem } from "../firebase"
import { UserAuth } from "../components/AuthContext"
import { useNavigate, Link, useLocation } from "react-router-dom"

export default function UploadItem () {
    const [name, setName] = useState("")
    const [type, setType] = useState("")
    const [price, setPrice] = useState(0)
    const [imageUrl, setImageUrl] = useState("")
    const [detail, setDetail] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate()
    const { userRole } = UserAuth()
    const location = useLocation()

    const search = location.state?.search || "";

    function handleSubmit (e: React.SyntheticEvent) {
        
        e.preventDefault()

        const data: {
            name: string;
            type: string;
            price: number;
            imageUrl: string;
            detail: string
        } = {
            name: name,
            type: type,
            price: price,
            imageUrl: imageUrl,
            detail: detail    
        }
        
        if (data.name === "" || data.type === "" || data.imageUrl === "" || data.detail === "") {
            setErrorMessage("All the fields require input!")
            return
        }
        
        if (data.price <= 0) {
            setErrorMessage("Price can not be 0 or lower!")
            return
        } 

        postItem(data)
        setTimeout(() => {
            navigate("/shop")
        }, 1000);
        
    }

    if (userRole === "admin") {
        return (
            <div className="form-page">
                <div id="item-detail-back-box">
                    <Link 
                        className="back-link" 
                        relative="path" 
                        to={`../shop/${search}`}
                    >Back</Link>
                </div>
                <h1>Add new Item</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="input-name">Enter Item's Name:</label>
                    <input
                        type="text" 
                        id="input-name" 
                        placeholder="Item Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label htmlFor="input-type">Enter Item's Type:</label>
                    <input 
                        type="text"
                        id="input-type" 
                        placeholder="Item Type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    />
                    <label htmlFor="input-price">Enter Item's Price:</label>
                    <input
                        type="number" 
                        id="input-price" 
                        value={price}
                        onChange={(e) => setPrice(parseFloat(e.target.value))}
                    />
                    <label htmlFor="input-image-url">Enter Item's Image URL:</label>
                    <input
                        type="text" 
                        id="input-image-url" 
                        placeholder="Item Image URL"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
                    <label htmlFor="input-description">Enter Item's Description:</label>
                    <textarea
                        id="input-description" 
                        placeholder="Item Description"
                        value={detail}
                        onChange={(e) => setDetail(e.target.value)}
                    />
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <button type="submit">Upload Item</button>
                </form>
            </div>
        )
    }

    if (userRole === "normal") {
        return (
            <h1>You DO NOT have access to this site!</h1>
        )
    }
    else{
        return (
            <h1>ERROR</h1>
        )
    }
    
}