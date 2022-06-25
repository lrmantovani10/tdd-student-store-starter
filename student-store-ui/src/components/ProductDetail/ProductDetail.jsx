import { useState, useEffect } from "react"
import {useParams} from "react-router-dom"
import axios from 'axios'
import ProductView from "../ProductView/ProductView"
import NotFound from "../NotFound/NotFound"
import "./ProductDetail.css"
const apiURL = "https://codepath-store-api.herokuapp.com"

export default function ProductDetail(props){
    let [product, setProduct] = useState({})
    const [notFound, setNotFound] = useState(true)
    let params = useParams()
    let productId = params.productId
    
    useEffect(() =>{
        props.setFetching(true)
        axios.get(apiURL + "/store/" + productId).then(function (response){
            setProduct(response.data.product)
            setNotFound(false)
        }).finally(()=>{
            props.setFetching(false)
        }).catch(function (error){
            props.setError(error)
            setNotFound(true)
        })
    },[])

    if(notFound && (!props.isFetching)){
        return <NotFound error = {props.error}/>
    }

    if(props.isFetching){
       return(<h1 className = "loading">Loading...</h1>)
    }

    else{
        return(
            <>
                <div className = "product-detail">
                    <ProductView
                    setFetching = {props.setFetching}
                    wider = {true}
                    handleAddItemToCart = {props.handleAddItemToCart}
                    handleRemoveItemFromCart = {props.handleRemoveItemFromCart}
                    product = {product}
                    shoppingCart = {props.shoppingCart}/>
                </div>
            </>
        )
    }
}
