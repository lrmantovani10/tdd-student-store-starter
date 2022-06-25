import * as React from "react"
import "./Sidebar.css"
import ShoppingCart from "../ShoppingCart/ShoppingCart"
import CheckoutForm from "../CheckoutForm/CheckoutForm"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

export default function Sidebar(props) {
  
  let removeAnimation = function(){
    const sideButton = document.querySelector(".toggle-button")
    sideButton.style.animationName = ""
    sideButton.style.animationDuration = ""
  }

  let addAnimation = function(){
    const newButton = document.querySelector(".toggle-button")
    newButton.style.animationName = "buttonShow"
    newButton.style.animationDuration = "3s"
  }


  let toggleButtonClosed = <button className = "toggle-button"
  onClick = {() => {props.handleOnToggle(props.isOpen); addAnimation()}}
  onMouseOver = {() => {setTimeout(removeAnimation, 2000)}}>
    <ArrowForwardIcon style = {{ color: 'white', fontSize: "xx-large"}}/>
  </button>
  let toggleButtonOpen = <button className = "toggle-button open"
  onClick = {() => {props.handleOnToggle(props.isOpen); addAnimation()}}
  onMouseOver = {() => {setTimeout(removeAnimation, 2000)}}>
    <ArrowBackIcon style = {{ color: 'white', fontSize: "xx-large"}}/>
  </button>
  if(props.isOpen){
    return (
      <section className="sidebar open">
        {toggleButtonOpen}
        <ShoppingCart isOpen = {props.isOpen} 
        products = {props.products} 
        shoppingCart = {props.shoppingCart}
        receipt = {props.receipt}/>
        <CheckoutForm
        isOpen = {props.isOpen}
        isSuccessful = {props.isSuccessful}
        error = {props.error}
        changeCart = {props.changeCart}
        changeCheckout = {props.changeCheckout}
        shoppingCart = {props.shoppingCart}
        checkoutForm = {props.checkoutForm}
        handleOnCheckoutFormChange = {props.handleOnCheckoutFormChange}
        handleOnSubmitCheckoutForm = {props.handleOnSubmitCheckoutForm}/>
      </section>
    )
  }
  else{
    return (
      <section className="sidebar">
        {toggleButtonClosed}
      </section>
    )
  }
}
