const Equipment = require("../models/equipment");
const Use = require("../models/use");
const User= require("../models/user");
const Invoice=require("../models/invoice");
const  jwt_decode  = require("jwt-decode");




exports.getUser=(req,res,next)=>{

    

}

exports.listefactures= async(req,res,next)=>{

    const iduser=req.body.id;
    const all=Invoice.findAll({
        where: iduser
    });
    
}


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
  await newUsage.setInvoice(newFacture);
  /*res.redirect("/frontend/membre/utilisation_reception.html")*/
  res.render("membre/utilisation_reception");
    
}

exports.getMembreById=async(req,res,next)=>{
    const id=req.params.id;
    try{
     const userById =await User.findOne({
        where: {id},
     })
     return res.json(userById)
    }catch(err){}
    
    console.log(user);
}
exports.getEquipementById=async (req,res)=>{
    const id=req.params.id;
    res.cookie('id',id,{expire:new Date()+10*60*1000});
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