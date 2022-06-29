const {storage} = require("../data/storage")
const errors = require("../utils/errors")
let allProducts = storage.get("products").value()

class Store{
    static listProducts(){
        return allProducts
    }

    static getProduct(productId){
        let foundProduct = allProducts.find(product => product.id == productId)
        if(foundProduct){
            return foundProduct
        }
        else{
            throw new errors.NotFoundError()
        }
    }
    
    static getPurchases(){
        return storage.get("purchases").value()
    }

    static createPurchase(user, shoppingCart, next){
        let totalCost = 0
        let itemIds = []
        shoppingCart.forEach(element => {
            if(!element.quantity || !element.itemId){
                throw new errors.BadRequestError()
            }
            else if(itemIds.find(item => item == element.itemId)){
                throw new errors.BadRequestError()
            }
            else{
                itemIds.push(element.itemId)
                totalCost += (element.quantity * (allProducts.find(item => item.id == element.itemId).price))
            }
        })
        
        let partialCost = totalCost
        totalCost *= 1.0875
        totalCost = Number(totalCost.toFixed(2))
        let currentDate = new Date()
        currentDate = currentDate.toDateString() + " " + currentDate.toLocaleTimeString()
        let productRows = []
        let lines = ["Showing receipt for " + user.name + " available at " + user.value]
        let currentItem
        shoppingCart.map((element, index) =>{
            currentItem = allProducts.find(product => product.id == element.itemId)
            lines.push(element.quantity + " total " + currentItem.name + " purchased at a cost of " +
            currentItem.price + " for a total cost of " + Number((element.quantity * currentItem.price).toFixed(2)))
            productRows.push({
                "category":currentItem.category,
                "description": currentItem.description,
                "id": currentItem.id,
                "image": currentItem.image,
                "name": currentItem.name,
                "price": currentItem.price,
                "quantity": element.quantity,
                "source": currentItem.source,
                "totalPrice": Number((currentItem.price * element.quantity).toFixed(2))
            })
        })

        lines[shoppingCart.length + 1] = "Before taxes, the subtotal was " + partialCost
        lines[shoppingCart.length + 2] = "After taxes and fees were applied, the total comes out to " + totalCost

        let purchase = {
            "id" : shoppingCart.length + 1,
            "name": user.name,
            "email": user.value,
            "order": shoppingCart,
            "total": totalCost,
            "createdAt": currentDate,
            "receipt":{
                "lines":lines,
                "productRows": productRows,
                "userInfo": {
                    "name": user.name,
                    "email": user.value
                }
            }
        }
        storage.get("purchases").push(purchase).write()
        return purchase
    }
}

module.exports = Store