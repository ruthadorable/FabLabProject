const Equipment = require("../models/equipment");
const Use = require("../models/use");
const User= require("../models/user");
const Invoice=require("../models/invoice");
const  jwt_decode  = require("jwt-decode");
exports.modification=(req,res,next)=>{

}

exports.listefactures= async(req,res,next)=>{

    const iduser=req.body.id;
    const all=Invoice.findAll({
        where: iduser
    });
    
}


exports.newUtilisation= async(req,res,next)=>{
    const token=req.cookies.jwt_token;
    const decoded = jwt_decode(token);
    const iduser=decoded.sub;
    const idmachine=req.params.id;
    
   const newUsage = await Use.create({
      durating_M: req.body.minutes,
      amount_to_be_paid: req.body.total,
      date: Date(),
      userId: iduser,
      equipmentId: idmachine
  })
  
  
  console.log(newUsage)
  res.redirect("/frontend/membre/utilisation_reception.html")

    
}

exports.getMembreById=(req,res,next)=>{
    User.findAll({where: { id: req.params.id}})
    .then((membre)=>res.status(200).json(membre))
    .catch((error)=>res.status(400).json({error}));
    res.render("membre/membre_accueil")
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
    
    const token=req.cookies.jwt_token;
    const decoded = jwt_decode(token);
    const iduser=decoded.sub;
    const {nom,prenom,email,motdepasse,confmotdepasse}=req.body;
    
    try{
        const userById =await User.findOne({
            where: {id:iduser }})
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
  exports.getUsesById=async(req,res)=>{
    const id=req.params.id;
    try{
    const uses= await Use.findAll({where:{userId:id}})
    return res.json(uses);
    }catch(err){

    }
  }
  exports.getUses=async(req,res)=>{
    try{  
    const uses= await Use.findAll();
    return res.json(uses);
    }catch(err){

    }

  }

