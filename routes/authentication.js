var express = require('express');
var router = express.Router();
var {userRegister,userLogin}  = require('../service/authentication_service')

router.post("/register", async (req, res) =>{
  let body = req.body;
  let response = await userRegister(body)
  //console.log(body)
  res.json(response)
});

//login 
router.post("/login", async (req, res) =>{
  let body = req.body;
  let response = await userLogin(body)
  res.json(response)
});

module.exports = router;
