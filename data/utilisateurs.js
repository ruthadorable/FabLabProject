const utilisateurs=[
    {
        _id: 1,
        role_id:1,
        prenom: 'Admin',
        nom:'Admin',
        email: 'admin@gmail.com',
        mdp: bcrypt.hashSync('123456',10),
        utilisations_id: {
           
        }
    },
    {
        _id: 2,
        role_id:2,
        prenom: 'Mathieu',
        nom:'Nebra',
        email: 'mathieunebra@gmail.com',
        mdp: bcrypt.hashSync('123456',10),
        utilisations_id:{
            _id:1,
            _id:4,
        },
    },
];
module.exports=utilisateurs