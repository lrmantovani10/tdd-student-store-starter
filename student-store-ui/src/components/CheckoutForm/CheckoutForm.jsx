import "./CheckoutForm.css"

export default function CheckoutForm(props){
    let successHTML = <p className="success">Success!</p>
    let failureHTML = <p className="error">{props.error}</p>
    return (
        <div className="checkout-form">
            <div className = "formInput">
               Name: <input className="checkout-form-input"
               type = "text" name = "user-name"
               id = "nameCheckout"
               placeholder = "Your name here"
               value = {props.checkoutForm.name}
               onChange = {(event) => props.handleOnCheckoutFormChange(true, event.target.value)} required></input>
            </div>
            <div className = "formInput" id = "lowerForm">
                Email: <input className="checkout-form-input" 
                type = "email" name = "email" 
                id = "emailCheckout"
                placeholder= "student@codepath.org"
                value = {props.checkoutForm.value}
                onChange = {(event) => props.handleOnCheckoutFormChange(false, event.target.value)} required></input>
            </div>
            <form id = "submitForm">
                <input id = "finalCheck" type = "checkbox" required/> I agree to the terms and conditions.
                <button className="checkout-button" onClick = {props.handleOnSubmitCheckoutForm}>Checkout</button>
                {props.isSuccessful ? successHTML : failureHTML}
                {props.isSuccessful ? props.changeCart([]) : null}
                {props.isSuccessful ? props.changeCheckout({"name": "", "value": 0}) : null}
            </form>
        </div>)
}
