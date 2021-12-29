const Equipment = require("../models/equipment");
const Use = require("../models/use");
const User= require("../models/user");
const Invoice=require("../models/invoice");

exports.modification=(req,res,next)=>{

}

exports.listefactures= async(req,res,next)=>{

    const iduser=req.body.id;
    const all=Invoice.findAll({
        where: iduser
    });
    
}


exports.newUtilisation= async(req,res,next)=>{
    const iduser=req.body.id ;
    const idmachine=req.params.id;
    const user=Use.findOne({where: iduser});
    const equipement= await Equipment.findOne({where : idmachine})
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
  /*await newUsage.setUser(user);*/
  console.log(newUsage)
  res.redirect("/frontend/membre/utilisation_reception.html")

    
}

exports.getMembreById=(req,res,next)=>{
    User.findAll({where: { id: req.params.id}})
    .then((membre)=>res.status(200).json(membre))
    .catch((error)=>res.status(400).json({error}));
    res.render("membre/membre_accueil")
}