const express = require('express')
const morgan = require('morgan')
const store = require("./routes/store")
const cors = require("cors")
const {NotFoundError} = require("./utils/errors")
const app = express()
app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())
app.use("/store", store)

app.get("/", (request, response) =>{
    response.send({
        "ping" : "pong"
    }, 200)
})

app.use((req,res,next) =>{
    next(new NotFoundError())
})

app.use((error,req,res,next)=>{
    const status = (error.status ? error.status : 500)
    res.status(status).json({error : {
                message : (error.message ? error.message : "Something went wrong in the application"),
                status: status
                }
        })
})

module.exports = app

