const express=require("express");
const router = express.Router();

const {EmployeeRegister}=require("../Controllers/AuthController");

//Driver Routes
router.post("/EmployeeRegister",function(req,res){
    EmployeeRegister(req, res);

    
});

// router.post("/DriverLogin",function(req,res){
//     login
// });
// //Police Officer Routes
// router.post("/PoliceOfficerRegister",function(req,res){
//     register
// });

// router.post("/PoliceOfficerLogin",function(req,res){
//     login
// });
module.exports= router;