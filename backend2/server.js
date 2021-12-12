const express = require("express");
const bodyparser=require("body-parser");
const app=express()
const router= express.Router();
var dbconnection=require('./connection');
/*var machinesRoutes=require('../routes/machinesRoutes');*/
var utilisateurRoutes=require('./routes/utilisateurRoutes')


app.use(bodyparser.json());
/*app.use('/api/machines',machinesRoutes);*/
app.use('/api/users',utilisateurRoutes);


app.get("/",(req,res)=>{

    res.send('This is from backend')
})

const port=process.env.PORT || 5000;
app.listen(port ,()=> `Server running on port ${port}`);

module.exports=router;