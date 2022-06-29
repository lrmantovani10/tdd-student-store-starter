const express = require("express")
const router = express.Router()
const {BadRequestError} = require("../utils/errors")
const Store = require("../models/store")

router.get("/purchases", (request, response, next) =>{
    try{
        response.status(200).send({
            "purchases" :  Store.getPurchases()
        })
    }
    catch(error){
        console.log(error)
        next(error)
    }
})

router.get("/:productId", (request, response, next) =>{
    let productId = request.params.productId
    try{
        response.status(200).send({
            "product": Store.getProduct(productId)
        })
    }
    catch(err){
        next(err)
    }
})

router.get("/", (request, response, next) =>{
    try{
        response.status(200).send({
            "products" : Store.listProducts()
        })
    }
    catch(err){
        next(err)
    }
})

router.post("/", (request, response, next) =>{
    let shoppingCart = request.body.shoppingCart
    let user = request.body.user
    if(!shoppingCart || (!request.body.user)){
        next(new BadRequestError())
    }
    else{
        try{
            response.status(201).send({
                "purchase" :  Store.createPurchase(user, shoppingCart)
            })
        }
        catch(error){
            next(error)
        }
    }
})

module.exports = router