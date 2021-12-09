var mongoose =require ('mongoose')
const {Facture} = require('./factureModel')
const {Machine} = require('./machineModel')
const {Utilisateur} = require('./utilisateurModel')
const utilisationSchema = mongoose.Schema({
    membre_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Utilisateur'
    },
    machine_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Machine'
    },
    facture_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Facture'
    },
    duree:{
        type: Number,
        required: true,
    },
    date:{
        type:Date,
        required:true

    },
    montant:{
        type: Number,
        required:true
    }

},{
    timestamps: true
})
const Utilisation=mongoose.model('Utilisation',utilisationSchema)
module.exports=Utilisation