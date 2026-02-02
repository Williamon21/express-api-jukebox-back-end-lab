const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose')
const express = require('express')
const morgan = require('morgan')
const cors = require("cors")
const trackController = require("./controllers/tracks.controller")

const app = express()

app.use(cors())

mongoose.connect(process.env.MONGODB_URI)

// Logs on connection
mongoose.connection.on('connected', ()=> {
    console.log(`Connected to mongodb on ${mongoose.connection.name}`)
})
// Logs on errors
mongoose.connection.on('error', (error)=> {
    console.log(`Mongoose had an error connecting ${error.message}`)
})

// Tell express we want to use JSON
app.use(express.json())

// Morgan Logger
app.use(morgan('tiny'))

// ROUTE
app.get('/', (req, res) =>{
    res.json({ 
        message: "Please leave a message!"
    })
})

app.use("/tracks", trackController)

app.listen(3000, ()=>console.log("Who let the dogs out on port 3000"))
