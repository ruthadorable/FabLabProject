
const mongoose=require("mongoose");
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://RuthA:Romains1211@cluster0.f6qaw.mongodb.net/fablab?retryWrites=true&w=majority";
mongoose.connect(uri,{useUnifiedTopology:true,useNewUrlParser:true});
var dbconnect= mongoose.connection

mongoose.connect(uri,{useUnifiedTopology:true,useNewUrlParser:true});
var dbconnect= mongoose.connection
dbconnect.on('error',()=>{
    console.log(`Mongo DB Connection failed`);
})
dbconnect.on('connected',()=>{
    console.log(`Mongo DB Connection Succesful`);
})

module.exports=mongoose;