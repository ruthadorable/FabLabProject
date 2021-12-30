const Equipment = require("../models/equipment");
const Use = require("../models/use");
const User= require("../models/user");
const Invoice=require("../models/invoice");
const  jwt_decode  = require("jwt-decode");


exports.newUtilisation= async(req,res,next)=>{
    const iduser=req.body.iduser;
    const idmachine=req.body.idmachine;
    const user=Use.findOne({where:{id:iduser}});
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
        amount_total: req.body.total
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

exports.updateMembre=async(req,res)=>{
    
    const id=req.cookies.id;
    const {nom,prenom,email,motdepasse}=req.body;
    try{
        const userById =await User.findOne({
            where: {id }})
       if(nom!==""&&email!==""&&prenom!=""&&motdepasse!=="")
       {
           User.update({
               first_name:prenom,
               last_name:nom,
               email:email,
               password: motdepasse
           },{
               where : {id:id}
           });
           res.clearCookie('id');
           res.redirect("/frontend/membre/modification_reception.html");
       }
    }catch(err){}
}

exports.getFactureById= async (req,res)=>{
    const id=req.cookies.id;
    
    try{
      const factureParId = await Invoice.findAll({
        where: {userId:id },
      })   
      res.send(factureParId);
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
        //faire le include Invoice et Equipement ici
        const factureParId = await Invoice.findOne({where:{id:id}})
        res.clearCookie('idfacture');   
        res.send(factureParId); 
        return res.json(factureParId);
        
      }catch(err){}

  }