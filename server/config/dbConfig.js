const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL)

const connection = mongoose.connection

connection.on('connected' , ()=>{
    console.log(`Mongodb connection succesfull`)
})

connection.on('error',()=>{
    console.log(`Mongodb connection error`)
})