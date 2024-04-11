  //Driver register
const { registerValid, loginValid } = require("../validations.js");
const Driver = require("../Models/Driver.js");
const PoliceOfficer = require("../Models/PoliceOfficer.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const database=require('../Services/Database.js')
  
const authController={



EmployeeRegister: async (req, res) => {
    try {
      const Email = req.body.Email;
      const Fname = req.body.Fname;
      const Lname = req.body.Lname;
      const Password = req.body.Password;
      const NIC = req.body.NIC;
      const Province = req.body.Province;
      const District  = req.body.District;
      const errorMessage = registerValid(
      Email ,
      Fname ,
      Lname ,
      Password ,
      NIC ,
      Province ,
      District 
      )
      if (errorMessage) return res.status(400).json({ message: errorMessage });
      const DriverExists = await Driver.findOne({ NIC });
      if (DriverExists) {
        return res
          .status(400)
          .json({ message: "This NIC Already Uesd" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      await new Driver({
        Email ,
        Fname ,
        Lname ,
        Password :hashedPassword,
        NIC ,
        Province ,
        District 
      }).save();
      res.status(201).json({
        message: "You have successfully registered. Please login now",
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