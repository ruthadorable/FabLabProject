const Equipment = require("../models/equipment");
const Use = require("../models/use");
const User= require("../models/user");
const Invoice=require("../models/invoice");
const  jwt_decode  = require("jwt-decode");
const InvoiceDetail = require("../models/invoicedetail");


exports.newUtilisation= async(req,res,next)=>{
    const iduser=req.cookies.id;
    const idmachine=req.body.idmachine;
    const use=Use.findOne({where:{id:iduser}});
    const equipement= await Equipment.findOne({where : {id:idmachine}})
   const newUsage = await Use.create({
      durating_M: req.body.minutes,
      amount_to_be_paid: req.body.total,
      date: Date(),
      user_id: iduser
  })
   const newFacture = await Invoice.create({
        num: Math.floor(Math.random()*(9999999-1111111+1)+1111111),
        date: Date(),
        amount_total: req.body.total,
        userId: iduser
   })
   const newInvoiceDetail = await InvoiceDetail.create({
    equipmentId:equipement.id,
    equipment_name: equipement.name,
    equipment_tarif: equipement.price_minute,
    duration_M: newUsage.durating_M,
    amount_total: newUsage.amount_to_be_paid,
    facturation: true,
    useId:newUsage.id,
    invoiceId:newFacture.id,
    date: Date()
   })
  await newUsage.setEquipment(equipement);
  await newUsage.setUser(iduser);
  await newFacture.setUser(iduser);
  
}

exports.getMembreById=async(req,res,next)=>{
    const id=req.params.id;
    res.cookie('id',id,{expire:new Date()+10*60*1000});
    try{
     const userById =await User.findOne({
        where: {id},
     })
     return res.json(userById)
    }catch(err){}
    
    console.log(user);
}
exports.equipementPage=function (req, res, next) {
    res.redirect("frontend/membre/equipement_list.html");
  }
exports.getEquipements=async(req, res)=> {
    try{
      const equipements = await Equipment.findAll()
      return res.json(equipements);
    }catch(err){
      console.log(err);
      return res.status(500).json({error: 'Something went wrong'})
    }
  }
exports.getEquipementById = async (req,res)=>{
    const id=req.params.id;
    
    try{
      const equipementParId = await Equipment.findOne({
        where: {id },
      })   
      return res.json(equipementParId); 
    }catch(err){}
  }

exports.updateUser=async(req,res)=>{
    
    const id=req.cookies.id;
    const {nom,prenom,email,motdepasse,confmotdepasse}=req.body;
    
    try{
        const userById =await User.findOne({
            where: {id }})
       if(nom!==""&&email!==""&&prenom!=""&&motdepasse!=="")
       {
        if(confmotdepasse!=motdepasse){

          res.send("Les mots de passe ne sont pas identiques!")
        }
        //gestion duplicate 
        
        else{
           userById.update({
               first_name:prenom,
               last_name:nom,
               email:email,
               password: motdepasse
           });
           res.clearCookie('id');
           res.redirect("/frontend/membre/modification_reception.html");
       }}
    }catch(err){}
}

exports.getFactureById= async (req,res)=>{
    const id=req.params.id;
    
    try{
      const factureParId = await Invoice.findAll({
        where: {userId:id },
      })   
      
      return res.json(factureParId); 
    }catch(err){}
  }

exports.factureDetails=function(req,res){
    const id=req.params.id;
    res.cookie('idfacture',id,{expire:new Date()+10*60*1000});
    res.redirect("/frontend/membre/facturedetails.html");
  }

  exports.getFactureDetailsById=async(req,res)=>{
      const id=req.cookies.idfacture;
      try{
        const factureDetailsParId = await InvoiceDetail.findAll({where:{invoiceId:id}});
        res.clearCookie('idfacture');   
        return res.json(factureDetailsParId);
      }catch(err){}

  }