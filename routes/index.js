const express = require("express");
const bcrypt= require("bcrypt")
const { getMembreById, newUtilisation, listefactures, getEquipementById, updateMembre } = require("../controllers/ficheMembre");
const router = express.Router();
const {User,Equipment} = require("../models/schema");
const { generate } = require("../jwt_generator");
const  jwt_decode  = require("jwt-decode");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("login")
});
router.post("/login", async function (req, res){

  const user = await User.findOne({ where : {email :req.body.email}})

  if (!user || ((user) && user.email != req.body.email)){
      res.status(401)
      .send({ message: "L'utilisateur n'a pas été trouvé ou le mot de passe est incorrect !"})
  }else{
    const token = generate(user.id,user.first_name);
    res.cookie("jwt_token", token);
    const decoded = jwt_decode(token);
    console.log(decoded.preferred_username);
    
    if(user.role_id==2)
  {
    res.redirect("frontend/membre/equipement_list.html");
  }
  else if( user.role_id==1)
  {
    res.render("manager/manager_accueil")
  }
  else{
    res.render("comptable/comptable_accueil")
  }
  }
  

})

router.get("/register", function (req, res, next) {
  res.render("register");
});
router.post("/register", async function (req,res,next){
  const user = await User.findOne({ where : {email :req.body.email}})

  if (!user || ((user) && user.email != req.body.email)){
   
  const salt= await bcrypt.genSalt(10);
  const newUser = await User.create({
    first_name : req.body.first_name,
    last_name : req.body.last_name,
    email : req.body.email,
    password : await bcrypt.hash(req.body.password,salt),
    role_id:2 //membre par defaut
  })
  newUser.setRoles(2)
  console.log(newUser)
  res.render("login")
  }else{
    res.status(401)
    .send({ message: "L'email est déjà dans la base de donnée!"})
  }
})


//membre routers
router.get("/equipement_list",function (req, res, next) {
  res.redirect("frontend/membre/equipement_list.html");
});
router.get("/equipement", async function (req, res) {
  try{
    const equipements = await Equipment.findAll()
    return res.json(equipements);
  }catch(err){
    console.log(err);
    return res.status(500).json({error: 'Something went wrong'})
  }
})
router.get("/equipement/:id", getEquipementById);

router.get("/facture",listefactures);

router.post("/membre/utilisation",newUtilisation);

router.get("/modification/user/:id",getMembreById);

router.post("/membre/update",updateMembre);
module.exports = router;
