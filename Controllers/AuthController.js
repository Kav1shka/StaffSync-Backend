  //Driver register
// const { registerValid, loginValid } = require("../validations.js");
// const Driver = require("../Models/Driver.js");
// const PoliceOfficer = require("../Models/PoliceOfficer.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const database=require('../Services/Database.js')
  
const authController={

EmployeeRegister: async (req, res) => {
    try {
      const email = req.body.email;
      const fname = req.body.fname;
      const lname = req.body.lname;
      const password = req.body.password;
      const nic = req.body.nic;
      const address = req.body.Province;
      const District  = req.body.District;
      // const errorMessage = registerValid(
      // email ,
      // fname ,
      // lname ,
      // password ,
      // nic ,
      // address 
      // )
      if (errorMessage) return res.status(400).json({ message: errorMessage });

      // const DriverExists = await database.pool.query({
      //   text: `SELECT EXISTS (SELECT * FROM Employee WHERE name =$1)`,
      //   values: [nic]
      // });
      // if (DriverExists) {
      //   return res
      //     .status(400)
      //     .json({ message: "This NIC Already Uesd" });
      // }
      // const hashedPassword = await bcrypt.hash(password, 10);
      const  result=await database.pool.query( 'INSERT INTO Employee ( email , fname , lname , password , nic ,address ) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [email,fname,lname,password,nic,address,District]
      );
      res.status(201).json({
        message: "You have successfully registered. Please login now",
        result
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  },

   // Employee login
   EmployeeLogin: async (req, res) => {
    try {
      const { NIC, password } = req.body;
      const errorMessage = loginValid(NIC, password);
      if (errorMessage) return res.status(400).json({ message: errorMessage });

      const driver = await Driver.findOne({ NIC });

      const details = await Driver.findOne(Driver);
      if (!driver)
        return res.status(400).json({ message: "Not registered NIC" });

      const match = await bcrypt.compare(password, Driver.password);

      console.log(match);
      if (!match) {
        return res.status(400).json({ message: "Invalid NIC or password" });
      }

      const token = jwt.sign({ _id: Driver._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      Driver.password = undefined;

      // Customer.password = undefined;
      // Customer.password = undefined;
      res
        .status(200)
        .json({
          message: "You have successfully logged in",
          Driver,
          token,
          details,
        });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }
}
module.exports=authController;