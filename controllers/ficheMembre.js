const User= require("../models/user");

exports.modification=(req,res,next)=>{

}

exports.listefactures=(req,res,next)=>{
    
}


exports.listeutilisation=(req,res,next)=>{
    
}

exports.getMembreById=(req,res,next)=>{
    User.findAll({where: { id: req.params.id}})
    .then((membre)=>res.status(200).json(membre))
    .catch((error)=>res.status(400).json({error}));
    res.render("membre/membre_accueil")
}