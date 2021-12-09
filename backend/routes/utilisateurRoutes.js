const mongoose= require('mongoose');
const express=require('express');
const router=express();
const Utilisateur=require('../models/utilisateurModel');

router.post("/register",(req,res)=>{

    User.find({email: req.body.email},(err,docs)=>{
        if(docs.length>e){
            res.send('Email already registered')
        }
        else{
            
        }
    })

    const newuser= new Utilisateur(
        {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
    )
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