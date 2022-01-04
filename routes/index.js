const express = require("express");
const bcrypt= require("bcrypt")
const { getMembreById, newUtilisation,getEquipements,getEquipementById, updateUser, getFactureById,factureDetails ,getFactureDetailsById, equipementPage} = require("../controllers/ficheMembre");
const router = express.Router();
const {User,Equipment} = require("../models/schema");
const { generate } = require("../jwt_generator");
const  jwt_decode  = require("jwt-decode");
const { getUserById, updateAdmin, createEquipement, updateEquipement, deleteEquipement, getAdminEquipementById } = require("../controllers/ficheAdmin");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("login")
  res.clearCookie('id');
  res.clearCookie('jwt_token');
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
    res.redirect("frontend/admin/index.html");
  }
  else{
    res.redirect("frontend/comptable/index.html");
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
router.get("/equipement_list",equipementPage);
router.get("/equipement", getEquipements)
router.get("/equipement/:id", getEquipementById);
router.get("/facture/:id",getFactureById);
router.post("/membre/utilisation/:id",newUtilisation);
router.get("/modification/user/:id",getMembreById);
router.post("/user/update",updateUser);
router.get("/facturedetails/:id",factureDetails);
router.get("/getfacture",getFactureDetailsById);

//administrator routers
router.get("/admin/profile",getUserById);
router.post("/admin/update",updateAdmin);
router.get("/admin/equipement/:id",getAdminEquipementById);
router.post("/equipement/create",createEquipement);
router.post("/equipement/update",updateEquipement); 
router.get("/equipement/delete/:id",deleteEquipement);

module.exports = router;
