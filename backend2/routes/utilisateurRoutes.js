const express=require('express');
const router=express.Router();
const Utilisateur=require('../models/user');

router.post("/register",(req,res)=>{
    const newuser= new Utilisateur(req.body)
    newuser.save(err=>{
        if(!err){
            res.send('Utilisateur Inscrit avec Succes!')
        }
        else{
            res.send('Something went wrong');
        }
    })
});
module.exports=router;