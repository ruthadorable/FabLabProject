const utilisateurs=[
    {
        _id: 1,
        role_id:1,
        prenom: 'Mathieu',
        nom:'Nebra',
        email: 'mathieunebra@gmail.com',
        mdp: bcrypt(jklkjv),
        utilisations_id: {
           
        }
    },
    {
        _id: 2,
        role_id:2,
        prenom: 'Mathieu',
        nom:'Nebra',
        email: 'mathieunebra@gmail.com',
        mdp: bcrypt(kjhkjh),
        utilisations_id:{
            _id:1,
            _id:4,
        },
    },
];
export default utilisateurs;