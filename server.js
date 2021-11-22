const express = require("express");
const bodyParser=require("body-parser");
const app=express()
var dbconnection=require('./db');
var machinesRoutes=require('./routes/machinesRoutes');
var utilisateurRoutes=require('./routes/utilisateurRoutes')


app.get("/",(req,res)=>{

    res.send('This is from backend')
})

const port=process.env.PORT || 5000;
app.listen(port ,()=> `Server running on port ${port}`);