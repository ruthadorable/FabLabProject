
const express=require('express');
const router=express();
const Utilisateur=require('../models/utilisateurModel');

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