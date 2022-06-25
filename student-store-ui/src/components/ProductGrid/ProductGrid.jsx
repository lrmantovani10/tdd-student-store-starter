import ProductCard from "../ProductCard/ProductCard"
import "../ProductGrid/ProductGrid.css"

export default function ProductGrid(props){
    let itemInCart
    let itemQuantity
    return(
    <div id = "productGrid" className = "product-grid">
        {props.finalProducts.map((product, index) =>{
            itemInCart = props.shoppingCart.find(element => element.itemId == product.id)
            if(itemInCart != undefined){
                itemQuantity = itemInCart.quantity
            }
            else{
                itemQuantity = 0
            }
            return <ProductCard
            key = {product+index}
            quantity = {
                itemQuantity
            }
            showDescription = {false}
            wider = {false}
            productId = {product.id}
            handleAddItemToCart = {props.handleAddItemToCart}
            handleRemoveItemFromCart = {props.handleRemoveItemFromCart}
            product = {product}
            setFetching = {props.setFetching}/>
        })}
    </div>
    )
}
