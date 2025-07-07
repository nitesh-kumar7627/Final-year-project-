// environment variable config require
require('dotenv').config()

//data base connect 
const connectDB = require('./config/db')

//connect DB 
connectDB()


//import express -> create app
const express = require('express')
const app = express()

// import user Rouer
const UserRouter = require('./routes/UserRoutes')
const TaskRouter = require('./routes/TaskRoutes')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use('/api',UserRouter)
app.use('/api',TaskRouter)

//start server
app.listen(3000,() => {
    console.log('server started')
})