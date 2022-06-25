import * as React from "react"
import Navbar from "../Navbar/Navbar"
import Sidebar from "../Sidebar/Sidebar"
import ProductDetail from "../ProductDetail/ProductDetail"
import NotFound from "../NotFound/NotFound"
import Home from "../Home/Home"
import Footer from "../Footer/Footer"
import "./App.css"
import axios from 'axios'
import {BrowserRouter, Routes, Route} from "react-router-dom"
const apiURL = "https://codepath-store-api.herokuapp.com"

export default function App() {
  let [products, setProducts] = React.useState([])
  let [filteredProducts, setFilteredProducts] = React.useState([])
  let [currentQuery, setQuery] = React.useState("")
  let [finalProducts, setFinalProducts] = React.useState([])
  let [isFetching, setFetching] = React.useState(true)
  let [error, setError] = React.useState("")
  let [isOpen, setOpen] = React.useState(false)
  let [shoppingCart, setCart] = React.useState([])
  let [checkoutForm, setCheckout] = React.useState({"name": "", "value": ""})
  let [, setPrice] = React.useState(0)
  let [receipt, setReceipt] = React.useState([])
  let isSuccessful = false

  React.useEffect(() =>{
    setFetching(true)
    axios.get(apiURL + "/store").then(function (response){
      if(response.data.products.length > 0){
        setProducts(response.data.products)
        setFilteredProducts(response.data.products)
        setFinalProducts(response.data.products)
        setFetching(false)
      }
      else{
        setError("No products were fetched")
      }
    })
    .catch(function (error){
      setError(error)
    })
  },[])

  let handleOnToggle = function(){
    {isOpen? setOpen(false) : setOpen(true)}
  }

  let handleAddItemToCart = function(productId){
    let newItem = {"itemId" : productId, "quantity": 1}
    let itemFound = false
    shoppingCart.forEach((product, index) => {
      if(product.itemId == productId){
        itemFound = true
        shoppingCart[index]["quantity"] += 1
      }
    })
    if(!itemFound){
      setCart((x)=>[...x,newItem])
    }
    let productPrice = products.find(product => product.id == productId)
    setPrice((prev)=>prev + productPrice)
  }

  let handleRemoveItemFromCart = function(productId){
    let itemFound = false
    let cartArray = []
    shoppingCart.forEach((product, index) => {
      if(product.itemId == productId){
        itemFound = true
        shoppingCart[index]["quantity"] -= 1
      }
      if(shoppingCart[index]["quantity"] != 0){
        cartArray.push(shoppingCart[index])
      }
    })

    setCart(cartArray)
    let productPrice = products.find(product => product.id == productId)
    if(itemFound){
      setPrice((prev)=>prev - productPrice)
    }
  }

  let handleOnCheckoutFormChange = function(name, value){
    {name ? setCheckout({"name": value, "value": checkoutForm.value}) : 
    setCheckout({"name": checkoutForm.name, "value": value})}
  }

  let handleOnSubmitCheckoutForm  = function(event){
    event.preventDefault()
    if(document.querySelector("#finalCheck").checked){
      if(document.querySelector("#nameCheckout").value.length > 0 &&
        document.querySelector("#emailCheckout").value.length > 0){
          if(shoppingCart.length > 0){
            axios.post(apiURL + "/store",
            {
              user:{
                name: checkoutForm.name,
                email: checkoutForm.value
              },
              shoppingCart: [...shoppingCart]
            }
            ).then(function (data){
              setReceipt(data.data.purchase.receipt.lines)
              isSuccessful = true
            }).catch(function (error){
              setError(error)
              isSuccessful = false
            })
          }

          else{
            alert("You can't check out an empty cart :|")
          }
      }
      else{
        alert("Make sure to fill out your name and email!")
      }
    }
  }
let defaultPage =
<>  
  <Navbar />
  <Sidebar
    isOpen = {isOpen}
    isSuccessful = {isSuccessful}
    changeCart = {setCart}
    changeCheckout = {setCheckout}
    error  = {error}
    receipt = {receipt}
    shoppingCart = {shoppingCart}
    products = {products}
    checkoutForm = {checkoutForm}
    handleOnCheckoutFormChange = {handleOnCheckoutFormChange}
    handleOnSubmitCheckoutForm = {handleOnSubmitCheckoutForm}
    handleOnToggle = {handleOnToggle}
    />
    <Home
    setFilteredProducts = {setFilteredProducts}
    filteredProducts = {filteredProducts}
    currentQuery = {currentQuery}
    setQuery = {setQuery}
    finalProducts = {finalProducts}
    setFinalProducts = {setFinalProducts}
    isFetching={isFetching}
    shoppingCart = {shoppingCart}
    products = {products}
    setFetching = {setFetching}
    handleAddItemToCart = {handleAddItemToCart}
    handleRemoveItemFromCart = {handleRemoveItemFromCart}/>
    <div className="bsDisplayForAutograder">
      <Footer/>
    </div>
  </>

  
  let zoomedPage = 
  <>
     <Navbar />
    <Sidebar
      isOpen = {isOpen}
      isSuccessful = {isSuccessful}
      changeCart = {setCart}
      changeCheckout = {setCheckout}
      error  = {error}
      shoppingCart = {shoppingCart}
      products = {products}
      checkoutForm = {checkoutForm}
      handleOnCheckoutFormChange = {handleOnCheckoutFormChange}
      handleOnSubmitCheckoutForm = {handleOnSubmitCheckoutForm}
      handleOnToggle = {handleOnToggle}/>
    </>

  return (
    <div className = "app">
      <div className="columnApp">
          <BrowserRouter>
            <Routes>
              <Route path = "/" element = {defaultPage}
              products = {products}
              handleAddItemToCart = {handleAddItemToCart}
              handleRemoveItemFromCart = {handleRemoveItemFromCart}/>
              <Route path = "/products/:productId"
              element = {
                <>
                  {zoomedPage}
                  <ProductDetail
                  setError = {setError}
                  isFetching = {isFetching}
                  setFetching = {setFetching}
                  shoppingCart = {shoppingCart}
                  handleAddItemToCart = {handleAddItemToCart}
                  handleRemoveItemFromCart = {handleRemoveItemFromCart}/>
                  <div className="actualDisplay">
                    <Footer/>
                  </div>
                </>
              }/>
              <Route path = "*" element = {<NotFound error = "404"/>}/>
            </Routes>
          </BrowserRouter>
        </div>
    </div>
  )
  }
