const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb://localhost/todoslist'
const app = express()
const cors = require('cors')


//middlewhers
app.use(cors())
app.use(express.json())


// Importing routers
const allRoutes = require('./routers/allRoutes')


//Using routers ad middlewheres
app.use('/func', allRoutes)




//Routers
app.get('/', (req,res)=>{
    res.send("Home")
})


// connecting with db
mongoose.connect(url, {useNewUrlParser:true})
const con = mongoose.connection

con.on('open', ()=>{
    console.log('connected....')
})


//Listening
app.listen(3000, ()=>{
    console.log("Listening on port 3000")
})