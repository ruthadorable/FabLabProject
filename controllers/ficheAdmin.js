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
exports.updateAdmin=async(req,res)=>{
    
    const id=req.cookies.id;
    const {nom,prenom,email,motdepasse,confmotdepasse}=req.body;
    
    try{
        const userById =await User.findOne({
            where: {id }})
       if(nom!==""&&email!==""&&prenom!=""&&motdepasse!=="")
       {
        if(confmotdepasse!=motdepasse){

          res.send("Les mots de passe ne sont pas identiques!")
        }else{
           userById.update({
               first_name:prenom,
               last_name:nom,
               email:email,
               password: motdepasse
           },{
               where : {id:id}
           });
           res.clearCookie('id');
           res.redirect("/frontend/admin/pages/profile_update_reception.html");
       }}
    }catch(err){}
}