var mongoose =require ('mongoose')
const Utilisation = require('./utilisationModel')
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
    password: {
        type: String,
        required : true
    },
    utilisations:[{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'Utilisation'
    }],
    roleId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'Role'
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