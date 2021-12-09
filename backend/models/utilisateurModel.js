var mongoose =require ('mongoose')
const {Utilisation} = require('./utilisationModel')
const utilisateurSchema = mongoose.Schema({
    
    nom: {
        type: String,
        required : true,
    },
    prenom: {
        type: String,
        required : true,
    },
    email: {
        type: String,
        required : true,
        unique: true
    },
    mdp: {
        type: String,
        required : true
    },
    utilisations:[{
        type:mongoose.Schema.Types.ObjectId,
        required:false,
        ref: 'Utilisation'
    }],
    role_id:{
        type:Number,
        required:false,
        
    },
    isAdmin: {
        type: Boolean,
        required : true,
        default: false
    },
    isComptable:{
        type:Boolean,
        required:true,
        default:false
    }
},{
    timestamps: true
})
const Utilisateur=mongoose.model('Utilisateur',utilisateurSchema)
module.exports=Utilisateur