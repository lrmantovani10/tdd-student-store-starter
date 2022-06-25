import {useParams} from "react-router-dom"
import ProductCard from "../ProductCard/ProductCard"
import "./ProductView.css"
export default function ProductView(props){
    let productId = useParams().productId
    let itemInCart = props.shoppingCart.find(element => element.itemId == productId)
    let itemQuantity = itemInCart?.quantity || 0

    return(
    <div className = "product-view">
        <h1 className = "product-id">
            Product#{productId}
        </h1>
        <ProductCard
        wider = {true}
        key = {"product" + productId}
        handleRemoveItemFromCart = {props.handleRemoveItemFromCart}
        handleAddItemToCart = {props.handleAddItemToCart}
        quantity = {itemQuantity}
        productId = {productId}
        product = {props.product}
        showDescription = {true}
        setFetching = {props.setFetching}/>
    </div>)
}
