const mongoose = require('mongoose');

const machineSchema= mongoose.Schema({
    nom:{
        type:String,
        require
    },
    modele: {
        type:String,
        require,
    },
    dimensions:{
        type:String,
        required:false,
    },
    specificite1:{
        type:String,
        require

    },
    specificite2:{
        type:String,
        required: false,

    },
    specificite3:{
        type:String,
        required: false,

    },
    categorie:{
        type:String,
        require,
    },
    tarif:{
        type:Number,
        require,
    },



},{timestamps:true})
const Machine=mongoose.model('Machine',machineSchema);
module.exports=Machine;