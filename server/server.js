const express = require('express')
const app = express()
const port = process.env.PORT || 5000
require('dotenv').config()
const dbconfig = require('./config/dbConfig')
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const userRoute = require('./routes/UserRoute')
const inventoryRoute = require('./routes/inventoryRoute')

app.use('/api/users', userRoute)
app.use("/api/inventory", inventoryRoute);

app.listen(port , ()=>{
    console.log(`server is running on port ${port}`)
})