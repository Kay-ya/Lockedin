const express = require('express')
const  mongoose  = require('mongoose')

const app= express()

mongoose.connect('mongodb://localhost:27017/lockedin')

app.listen(3001, () =>{
  console.log("it works finally! ")
})
