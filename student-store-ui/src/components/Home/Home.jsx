import * as React from "react"
import "./Home.css"
import Hero from "../Hero/Hero"
import ProductGrid from "../ProductGrid/ProductGrid"
import CodePath from "./CodePath.jpeg"
import GoldenGate from "./GoldenGate.jpeg"
import Footer from "../Footer/Footer"

export default function Home(props) {
  let updateCategory = function(newCategory){
    if(newCategory.length > 0){
      const newProducts  = props.products.filter(prd => prd.category == newCategory)
      props.setFilteredProducts(newProducts)
      props.setFinalProducts(newProducts.filter(prd => prd.name.toLowerCase().includes(props.currentQuery)))
    }
    else{
      props.setFilteredProducts(props.products)
      props.setFinalProducts(props.products)
    }
  }

  let searchProduct = function(event) {
    const inputText = event.target.value.toLowerCase()
    const newProducts = props.filteredProducts.filter(prod => prod.name.toLowerCase().includes(inputText))
    props.setQuery(inputText)
    props.setFinalProducts(newProducts)
  }

  if(props.isFetching){
    return null
  }
  return (
    <div className="home">
      <Hero/>
      <div>
        <input type = "text" id = "searchBar" placeholder="Search for a product..." onChange = {searchProduct}/>
      </div>
      <div className="contentNavigation">
        <a className="category" onClick = {() => updateCategory("")}>
          All Categories
        </a>
        <a className="category" onClick = {() => updateCategory("clothing")}>
          Clothing
        </a>
         <a className="category" onClick = {() => updateCategory("food")}>
          Food
        </a>
        <a className="category" onClick = {() => updateCategory("accessories")}>
          Accessories
        </a>
        <a className="category" onClick = {() => updateCategory("tech")}>
          Tech
        </a>
      </div>
      <ProductGrid
      shoppingCart = {props.shoppingCart}
      handleAddItemToCart = {props.handleAddItemToCart}
      handleRemoveItemFromCart = {props.handleRemoveItemFromCart}
      finalProducts = {props.finalProducts}
      setFetching = {props.setFetching}/>
      
      <div className = "about" id = "about">
        <div className="aboutText">About</div>
        <div className = "aboutInfo">
          <div className = "aboutParagraph">
            The codePath student store offers great products at great prices from a great team and for a great cause.
            We've searched far and wide for items that perk the interests of even the most eccentric students and decided to offer them all here in one place.
            All proceeds go towards bringing high quality CS education to college students around the country.
          </div>
          <img src = {CodePath} className = "aboutImage"/>
        </div>
      </div>
      
      <div className = "contact" id = "contact">
        <div className="contactText">Contact Us</div>
        <div className = "contactInfo">
          <div className = "contactItems">
            <div className = "contactItem">
              Email:    code@path.org
            </div>
            <div  className = "contactItem">
              Phone:    1-800-CODEPATH
            </div>
            <div  className = "contactItem">
              Address:  123 Fake Street, San Francisco, CA
            </div>
          </div>
          <img src = {GoldenGate} className = "contactImage"/>
        </div>
      </div>
      <Footer />
    </div>
  )
}
