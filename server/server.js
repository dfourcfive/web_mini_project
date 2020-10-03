const express = require('express')
const mongoose=require('mongoose')
const morgan=require('morgan')
const cors=require('cors')
const bodyParser=require('body-parser')

const UserRoute=require('./routes/auth')



mongoose.connect('mongodb://localhost:27017/myapp',{useNewUrlParser:true})
const db=mongoose.connection
console.log(mongoose.connection.readyState)

db.on('error',(err)=>{
    console.log(err)
})

db.once('open',()=>{
    console.log('database connection established')
})

const app=express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use(cors())
const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log('server is running')
})

app.use('/api',UserRoute)