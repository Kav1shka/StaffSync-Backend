const express=require("express");
const router = express.Router();

const {EmployeeRegister,EmployeeLogin}=require("../Controllers/AuthController");

//Driver Routes
router.post("/EmployeeRegister",function(req,res){
    
    EmployeeRegister(req, res);
    
}), 

router.post("/EmployeeLogin",function(req,res){
    
    EmployeeLogin(req, res);
    
    
});
module.exports= router;