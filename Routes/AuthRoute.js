const express=require("express");
const router = express.Router();

const {signup}=require("../Controllers/AuthController");

//Driver Routes
router.post("/UserSignup",function(req,res){
    
    signup(req, res);
    
}), 

// router.post("/EmployeeLogin",function(req,res){
    
//     EmployeeLogin(req, res);
    
    
// });
module.exports= router;