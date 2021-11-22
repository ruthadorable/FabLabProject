const mongoose = require('mongoose');
const Utilisateur = require('./utilisateurModel');

const factureSchema= mongoose.Schema({
utilisateur:{
    type: mongoose.Schema.Types.ObjectId,
    required:true,
    ref:Utilisateur
},
numero:{
    type: Number,
    required:true
},
date_generation:{
    type: Date,
    required:true
},
utilisation:[{
    type: mongoose.Schema.Types.ObjectId,
    required:true,
    ref:Utilisation
}],
machine:[
    {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:Machine
    }],
duree_total:
{
    type: Number,
    required:true,
},
montant_total:
{
    type:Number,
    required:true
}



},{timestamps:true})
const Facture=mongoose.model('Facture',factureSchema);
module.exports=Facture;