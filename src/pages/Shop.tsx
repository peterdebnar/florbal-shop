import React, {useState} from "react"
import { useLoaderData, Link, useSearchParams } from "react-router-dom"
import { getItems } from "../firebase";
import { UserAuth } from "../components/AuthContext";

export function loader () {
    return getItems()
}

export default function Shop () {
    const [searchParams, setSearchParams] = useSearchParams()
    const [sortType, setSortType] = useState("name-a-z")
    const shopData = useLoaderData() as IItem[]
    const {userRole} = UserAuth()
    const filterArray = ["stick", "goal", "balls", "gear"]

    interface IItem {
        id: string;
        name: string;
        type: string;
        price: number;
        imageUrl: string;
        detail: string;
    }

    const typeFilter = searchParams.get("type")

    const filteredItems = typeFilter ? shopData.filter( item => item.type === typeFilter) : shopData 

    if (sortType == "name-a-z") {
        filteredItems.sort((a, b) => a.name && b.name ? a.name.localeCompare(b.name) : 0)       
    }
    else if (sortType == "name-z-a") {
        filteredItems.sort((a, b) => a.name && b.name ? b.name.localeCompare(a.name) : 0) 
    }
    else if (sortType == "price-ascending") {
        filteredItems.sort((a, b) => a.price - b.price)
    }
    else if (sortType == "price-descending") {
        filteredItems.sort((a, b) => b.price - a.price)
    }

    function handleFilter (key: string, value: string | null) {
        setSearchParams(prevParams => {
            if (value === null) {
                prevParams.delete(key)
            }
            else {
                prevParams.set(key, value)
            }
            return prevParams
        })
    }

    const itemElements = filteredItems.map((item: IItem) => {
        return (
            <Link 
                className="item-link" 
                to={item.id} key={item.id}
                state={{
                    search: `?${searchParams.toString()}`
                }}
            >
                <div className="item-box">
                    <img 
                        src={item.imageUrl} 
                        onError={({currentTarget}) => {
                            currentTarget.onerror = null
                            currentTarget.src="/item-default.jpg"
                            }}
                    />
                    <h2>{item.name}</h2>
                    {item.price !== undefined ? <h2>{item.price.toFixed(2)}€</h2> : <p>Price not available</p>}
                </div>
            </Link>
        )
    })

    const filterElements = filterArray.map((item: string) => {
        return (
            <button
                key={item} 
                onClick={() => handleFilter("type", item)}
                className={`filter-button${typeFilter === item ? "-selected" : ""}`}
            >{item}</button>
        )
    })

    return (
        <div className="shop-page">
            <div id="shop-options">
                <div id="filter-box">
                <p>Filter By:</p>
                    {filterElements}
                    {typeFilter && 
                    <button
                        onClick={() => handleFilter("type", null)}
                        className="clear-filter"
                    > 
                        Clear Filter    
                    </button>
                    }
                </div>
                <div id="sort-box">
                    <label htmlFor="sorting-select">Sort By:</label>
                    <select 
                        id="sorting-select" 
                        value={sortType} 
                        onChange={(e) => setSortType(e.target.value)}
                    >
                        <option value="name-a-z">Name (A - Z)</option>
                        <option value="name-z-a">Name (Z - A) </option>
                        <option value="price-ascending">Cheapest</option>
                        <option value="price-descending">Most Expensive</option>
                    </select>
                </div>
            </div>
            <div id="shop-items">{itemElements}</div>
            {
                userRole === "admin" && 
                <Link className="link-add" to="/addItem" state={{search: `?${searchParams.toString()}`}}>
                    <div className="shop-add">+</div>
                </Link>
            }  
        </div>
    )
}