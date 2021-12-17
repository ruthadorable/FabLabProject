const express = require("express");
const router = express.Router();
const {User} = require("../models/schema")

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("login")
});
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
  console.log(newUser)
})


router.post("/login", async function (req, res){

  const user = await User.findOne({ where : {email :req.body.email}})

  if (!user || ((user) && user.password != req.body.password)){
      res.status(401)
      .send({ message: "L'utilisateur n'a pas été trouvé ou le mot de passe est incorrect"})
  }else{
    res.status(200)
    .send({message : user})
  }





})

module.exports = router;
