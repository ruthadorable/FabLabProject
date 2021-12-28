const express = require("express");
const router = express.Router();
const debug = require("debug");
const {User,Equipment} = require("../models/schema");
const { generate } = require("../jwt_generator");


/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("login")
});
router.post("/login", async function (req, res){

  const user = await User.findOne({ where : {email :req.body.email}})

  if (!user || ((user) && user.password != req.body.password)){
      res.status(401)
      .send({ message: "L'utilisateur n'a pas été trouvé ou le mot de passe est incorrect"})
  }
    const token = generate(user.id, user.email);
    console.log(token)
    res.cookie("jwt_token", token)
    res.redirect("/equipement_list") 
}
)

router.get("/register", function (req, res, next) {
  res.render("register");
});
router.post("/register", async function (req,res,next){
  const newUser = await User.create({
    first_name : req.body.first_name,
    last_name : req.body.last_name,
    email : req.body.email,
    password : req.body.password,
  })
  newUser.setRoles(2)
  res.redirect("/login")
  console.log(newUser)
})
router.get("/equipement_list", async function (req, res) {
  const equipement = await Equipment.findAll()
  console.log(equipement)
  res.render("equipement_list", {equipement : equipement})  
})


module.exports = router;
