import "./ShoppingCart.css"

export default function ShoppingCart(props){
    let partialTotal = 0
    let chosenProduct
    if(props.shoppingCart.length == 0){
        return(
            <p className="notification">
                No items added to the cart yet. <br/> Start shopping now!
            </p>
        )
    }
    else{
        return (
        <div className="shopping-cart">
            {props.shoppingCart.map((element, index) => {
                chosenProduct = props.products.find(product => product.id == element.itemId);
                partialTotal += (chosenProduct.price * element.quantity);
                return(
                    <div key = {"itemized"+index} className= "itemized">
                        <p className="cart-product-name">
                            {chosenProduct.name + ":"}
                        </p>
                        <p className="cart-product-quantity">
                            {element.quantity}
                        </p>
                    </div>
                )
            })}
            <div id = "receipt">
                {props.receipt.map((element, index) =>{
                return(
                    <p className = "receiptResult" key = {"receipt" + index}>
                        {element}
                    </p>
                )
                })}
            </div>
            <p className = "subtotal">
                {"Subtotal: $" + (partialTotal).toFixed(2)}
            </p>
            <p className = "subtotal">
                {"Taxed total: $" + (partialTotal + (0.0875 * partialTotal)).toFixed(2)}
            </p>
        </div>)
    }
}
