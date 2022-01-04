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
exports.getAdminEquipementById=async (req,res)=>{
    const id=req.params.id;
    res.cookie('idmachine',id,{expire:new Date()+10*60*1000});
    try{
      const equipementParId = await Equipment.findOne({
        where: {id },
      })   
      return res.json(equipementParId); 
    }catch(err){}
  }

exports.createEquipement=async(req,res)=>{
    const {nom,tarif,image,reserved,description}=req.body;
    const imagedefault="../../images/ajoutimage.JPG".toString();
    try{
        const newEquipement=Equipment.create({
        name:nom,
        price_minute:tarif,
        image: imagedefault,
        reserved:reserved,
        description: description
        });
        res.redirect("/frontend/admin/pages/equipmentstable.html");
    }catch(err)
    {}
}
exports.updateEquipement=async(req,res)=>{
    const idmachine = req.cookies.idmachine;
    const {nom,tarif,image,reserved,description}=req.body;
    const imagedefault="../../images/ajoutimage.JPG".toString();
    try{
        const equipmentById =await Equipment.findOne({
            where: {id:idmachine }});
       if(nom!==""&&tarif!==""&&image!=""&&reserved!==""&&description!=="")
       {
           equipmentById.update({
               name:nom,
               price_minute:tarif,
               image: image,
               reserved: reserved,
               description:description
           });
        }   
           res.redirect("/frontend/admin/pages/equipmentstable.html");
    }catch(err){}
}
exports.deleteEquipement=async(req,res)=>{
    const idmachine= req.params.id;
    try{
    Equipment.destroy({
        where:{id:idmachine}
    })
    res.redirect("/frontend/admin/pages/equipmentstable.html");
    }catch(err){}
}