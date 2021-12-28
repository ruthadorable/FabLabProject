const express = require("express");
const bcrypt= require("bcrypt")
const { getMembreById } = require("../controllers/ficheMembre");
const router = express.Router();
const {User,Equipment} = require("../models/schema")

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("login")
});
router.post("/login", async function (req, res){

  const user = await User.findOne({ where : {email :req.body.email}})

  if (!user || ((user) && user.password != req.body.password)){
      res.status(401)
      .send({ message: "L'utilisateur n'a pas été trouvé ou le mot de passe est incorrect"})
  }else{
    /*res.status(200)
    .send({message : user})*/
    
    if(user.role_id==2)
  {
    res.redirect("/frontend/membre/equipement_list.html");
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
  const salt= await bcrypt.genSalt(10);
  const newUser = await User.create({
    first_name : req.body.first_name,
    last_name : req.body.last_name,
    email : req.body.email,
    password : await bcrypt.hash(req.body.password,salt),
    roles_id:2 //membre par defaut
  })
  newUser.setRoles(2)
  console.log(newUser)
  res.render("login")
})

router.get("/equipement_list",function (req, res, next) {
  res.redirect("/frontend/membre/equipement_list.html");
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
router.get("/equipement/:id", async (req,res)=>{
  const id=req.params.id;
  try{
    const equipementParId = await Equipment.findOne({
      where: {id },
    })   
    return res.json(equipementParId); 
  }catch(err){}
})

router.get("/membre/:id",getMembreById);
router.get("/membre/modification/:id", function (req, res, next) {
  res.render("membre/modification")
});
router.get("/membre/facture/:id", function (req, res, next) {
  res.render("membre/membre_facture")
});
router.get("/membre/utilisation/:id", function (req, res, next) {
  res.render("membre/membre_utilisation")
});
module.exports = router;
