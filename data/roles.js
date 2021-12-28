const roles =[
    {
        _id:1,
        nom: 'Manager',
        permissions:{
            machines:'crud'
        },
        utilisateurs_id:{
            _id:10,
        } 
    },
    {
        _id:2,
        nom: 'Membre',
        permissions:{
            machines:'r'
        },
        utilisateurs_id:{
            _id:10,
        } 
    },
    {
        _id:3,
        nom: 'Comptable',
        permissions:{
            facture:'r'
        },
        utilisateur_id:{
            _id:12,
            _id:13
        } 
    }
    
    ] ;
    
    module.exports=roles