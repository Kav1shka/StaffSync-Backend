const express=require("express");
const router = express.Router();

const {signup,login}=require("../Controllers/AuthController");
console.log("came here 2");
//Driver Routes
router.post("/UserSignup",function(req,res){
    
    signup(req, res);
    
}), 
console.log("route end");
router.post("/EmployeeLogin",function(req,res){
    
    login(req, res);
    
    
});
module.exports= router;