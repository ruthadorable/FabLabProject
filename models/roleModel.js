const mongoose = require('mongoose');
const Utilisateur = require('./utilisateurModel');

const roleSchema= mongoose.Schema({
    nom:{
        type:String,
        require
    },
    permissions:
        [{
            type: String,
            required: false
        }]
    ,
    utilisateurs:
        [{
            type: mongoose.Schema.Types.ObjectId,
            required:true,
            ref: 'Utilisateur'
        }],

},{timestamps:true})
const Role=mongoose.model('Role',roleSchema);
module.exports=Role;