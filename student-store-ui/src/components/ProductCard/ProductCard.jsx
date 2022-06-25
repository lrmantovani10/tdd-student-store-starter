import {Link} from "react-router-dom"
import "./ProductCard.css"

export default function ProductCard(props){
    let descriptionText = ""
    let rerouteLink = "/products/" + props.productId
    let fetchingCondition = true
    if(props.showDescription){
        descriptionText = props.product.description
        rerouteLink = "/"
        fetchingCondition = false
    }
    return (
    <div className = {"product-card" + (props.wider ? " wider" : "")}>
        <p className = "product-name">
            {props.product.name}
        </p>
        <p className = "product-description">
            {descriptionText}
        </p>
        <div className = "media">
            <Link onClick = {()=>props.setFetching(fetchingCondition)} to = {rerouteLink}>
                <img className = "product-image" src = {props.product.image}/>
            </Link>
        </div>
        <p className = "product-price">
            {"$"+props.product.price.toFixed(2)}
        </p>
        <div>
            <button className = "remove" onClick = {()=>props.handleRemoveItemFromCart(props.product.id)}>-</button>
            <button className = "add" onClick = {()=>props.handleAddItemToCart(props.product.id)}>+</button>
        </div>
        <p className = "product-quantity">
            {props.quantity}
        </p>
    </div>)
}
