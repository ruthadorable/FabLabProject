const express = require("express");
const bcrypt= require("bcrypt")
const { newUtilisation,getEquipements,getEquipementById, updateUser, getFactureById,factureDetails ,getFactureDetailsById, equipementPage, getUsesById, getUses, getMembreById} = require("../controllers/ficheMembre");
const router = express.Router();
const {User,Equipment,Use,Invoice} = require("../models/schema");
const { generate } = require("../jwt_generator");
const  jwt_decode  = require("jwt-decode");

const {getUserfromAdmin,getFacturesByUser,getUsageByInvoiceId, getUserById,
   updateAdmin, createEquipement, updateEquipement, deleteEquipement,
    getAdminEquipementById, getUsers,newUser, updateUserfromAdmin,
     deleteUser, getFactures, getMembers, updateFacture, getFactureByIdfromAdmin,
       createFacture,deleteFacture, getUtilisations ,newUtilisationByAdmin, getUtilisationById, deleteUseById, getUseByEquipmentId,createUseByUserIdAsParams} = require("../controllers/ficheAdmin");


/* GET home page. */
router.get("/", function (req, res, next) {
  res.clearCookie('jwt_token');
  res.render("login")
});
router.post("/login", async function (req, res){

  const user = await User.findOne({ where : {email :req.body.email}})

  if (!user || ((user) && user.email != req.body.email)){
      res.status(401)
      .send({ message: "L'utilisateur n'a pas été trouvé ou le mot de passe est incorrect !"})
  }else{
    const token = generate(user.id,user.first_name,user.role_id);
    res.cookie("jwt_token", token);
    const decoded = jwt_decode(token);
    console.log(decoded.preferred_username);
    
    if(user.role_id==2)
  {
    res.redirect("frontend/membre/equipement_list.html");
  }
  else if( user.role_id==1)
  {
    res.redirect("frontend/admin/pages/equipmentstable.html");
  }
  else{
    res.redirect("frontend/comptable/pages/invoicestable.html");
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
router.get("/modification/user/:id",getUserById);
router.post("/user/update",updateUser);
router.get("/uses/:id",getUsesById);
router.get("/alluses",getUses);


//administrator routers
router.get("/profile/:id",getUserById);
router.post("/admin/update",updateAdmin);
router.get("/admin/equipement/:id",getAdminEquipementById);
router.post("/equipement/create",createEquipement);
router.post("/equipement/update/:id",updateEquipement); 
router.get("/equipement/delete/:id",deleteEquipement);
router.get("/users",getUsers);
router.get("/getuserbyid/:id",getMembreById);
router.post("/user/create",newUser);
router.get("/user/:id",getUserfromAdmin);
router.post("/user/update/:id",updateUserfromAdmin);
router.get("/user/delete/:id",deleteUser);
router.get("/factures",getFactures);
router.get("/members",getMembers);
router.post("/facture/update/:id",updateFacture);
router.get("/admin/facture/:id",getFactureByIdfromAdmin);
router.get("/facture/delete/:id",deleteFacture);
router.post("/facture/generate",createFacture);
router.post("/utilisation/create",newUtilisationByAdmin)
router.get("/utilisation/:id",getUtilisationById);
router.get("/use/delete/:id",deleteUseById);
router.get("/facturedetails/:id",getFactureById);
router.get("/facturesbyuser/:id",getFacturesByUser);
router.get("/uses/machineid/:id",getUseByEquipmentId);
router.post("/use/create/:id",createUseByUserIdAsParams);
router.get("/usagebyinvoiceid/:id",getUsageByInvoiceId);
module.exports = router;

