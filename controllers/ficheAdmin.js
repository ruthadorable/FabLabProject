const Equipment = require("../models/equipment");
const Use = require("../models/use");
const User= require("../models/user");
const Invoice=require("../models/invoice");
const  jwt_decode  = require("jwt-decode");
const InvoiceDetail = require("../models/invoicedetail");


exports.getUserById=async(req,res,next)=>{
    const token=req.cookies.jwt_token;
    const decoded = jwt_decode(token);
    const id=decoded.sub;
    try{
     const userById =await User.findOne({
        where: {id:id},
     })
     console.log(userById);
     return res.json(userById)
    }catch(err){}
    
}
exports.updateAdmin