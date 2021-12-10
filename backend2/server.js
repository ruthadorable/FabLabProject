const express = require("express");
const bodyparser=require("body-parser");
const app=express()
var dbconnection=require('./connection.js');
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

if (config.use_env_variable) {
    var sequelize = new Sequelize(process.env[config.use_env_variable]);
  } else {
    var sequelize = new Sequelize('burger_shop_DB', 'root', 'hoist', {
        host: "127.0.0.1",
        dialect: 'mysql',
        define: {
            timestamps: false
        }
    })
}