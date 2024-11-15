const express=require("express");
const router = express.Router();

const {signup,login}=require("../Controllers/AuthController");

//Driver Routes
router.post("/UserSignup",function(req,res){
    
    signup(req, res);
    
}), 

router.post("/EmployeeLogin",function(req,res){
    
    login(req, res);
    
    
});
module.exports= router;