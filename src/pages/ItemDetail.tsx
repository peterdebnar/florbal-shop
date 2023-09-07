
import React from "react"
import { useLoaderData, useLocation, Link, useParams, useNavigate } from "react-router-dom"
import { getItem, deleteItem } from "../firebase"

interface ILoaderParams {
    params: string;
}

// {params: ILoaderParams}
// Promise<{ id: string | undefined }>
export function loader ({ params }: any) {
    return getItem(params.id)
}

export default function ItemDetail () {

    const location = useLocation()
    const navigate = useNavigate()
    const { id } = useParams()

    const search = location.state?.search || "";

    interface IItem {
        id: string;
        name: string;
        type: string;
        price: number;
        imageUrl: string;
        detail: string;
    }

    const item = useLoaderData() as IItem

    function handleDelete (itemId: string | undefined) {
        deleteItem(itemId)

        setTimeout(() => {
            navigate("/shop")
        }, 1000);
    } 

    return (
        <div className="item-detail-page">
            <div id="item-detail-back-box">
                <Link 
                    className="back-link" 
                    relative="path" 
                    to={`..${search}`}
                >Back</Link>
            </div>
            <img 
                src={item.imageUrl}
                onError={({currentTarget}) => {
                    currentTarget.onerror = null
                    currentTarget.src="/item-default.jpg"
                    }}
            />
            <h1>Name: {item.name}</h1>
            <div id="item-info">
                <div id="item-detail">
                    <h2>Details:</h2>
                    <h3>{item.detail}</h3>
                </div>
                <div className="item-buy">
                    <h2>Price: {item.price.toFixed(2)}€</h2>
                    <button>Add to Cart</button>
                    <button id="remove-item" onClick={() => handleDelete(id)}>Remove Item</button>
                </div>
            </div>
        </div>
    )
}
