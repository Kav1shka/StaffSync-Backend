const user = require('../db/models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const catchAsync = require('../utils/catchAsync.js');
const AppError = require('../utils/appError.js');

  
console.log("came here 3");

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

console.log("came here 4");

const signup = catchAsync(async (req, res, next) => {
  const body = req.body;
console.log(body);
  if (!['1', '2'].includes(body.userType)) {
      throw new AppError('Invalid user Type', 400);
  }
  console.log("came here 5");
  const newUser = await user.create({
      userType: body.userType,
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      NIC:body.NIC,
      password: body.password,
      confirmPassword: body.confirmPassword,
  });
  console.log("came here 6");
  if (!newUser) {
      return next(new AppError('Failed to create the user', 400));
  }
  console.log("came here 7");
  const userExists = await user.findOne({ NIC });
  if (userExists) {
    return res
      .status(400)
      .json({ message: "This NIC Already Uesd" });
  }
  if (Password !== confirmPassword){
      return res
      .status(400)
      .json({message: "Passwords do not match"})
  }
  const hashedPassword = await bcrypt.hash(Password, 10);
  const result = newUser.toJSON();

  delete result.password;
  delete result.deletedAt;

  result.token = generateToken({
      id: result.id,
  });

  return res.status(201).json({
      status: 'success',
      data: result,
  });
});

const authentication = catchAsync(async (req, res, next) => {
  // 1. get the token from headers
  let idToken = '';
  if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
  ) {
      // Bearer asfdasdfhjasdflkkasdf
      idToken = req.headers.authorization.split(' ')[1];
  }
  if (!idToken) {
      return next(new AppError('Please login to get access', 401));
  }
  // 2. token verification
  const tokenDetail = jwt.verify(idToken, process.env.JWT_SECRET_KEY);
  // 3. get the user detail from db and add to req object
  const freshUser = await user.findByPk(tokenDetail.id);

  if (!freshUser) {
      return next(new AppError('User no longer exists', 400));
  }
  req.user = freshUser;
  return next();
});

const restrictTo = (...userType) => {
  const checkPermission = (req, res, next) => {
      if (!userType.includes(req.user.userType)) {
          return next(
              new AppError(
                  "You don't have permission to perform this action",
                  403
              )
          );
      }
      return next();
  };

  return checkPermission;
};

   // Employee login
  //  EmployeeLogin: async (req, res) => {
  //   try {
  //     const { nic, password } = req.body;
  //     // const errorMessage = loginValid(nic, password);
  //     // if (errorMessage) return res.status(400).json({ message: errorMessage });

  //     const result = await database.pool.query('SELECT password FROM Employee WHERE nic = $1', [nic]);
  //     const driver = result.rows[0];
  //     console.log(driver);

    
  //     const Password = await database.pool.query('SELECT FROM Employee WHERE nic = $1', [password]);
  //     console.log(Password);
  //     // console.log(Password);
  //     // const details = await Driver.findOne(Driver);
  //     // if (!driver)
  //     //   return res.status(400).json({ message: "Not registered NIC" });

  //     // const match = await bcrypt.compare(password, Password);

  //     // console.log(match);
  //     // if (!match) {
  //     //   return res.status(400).json({ message: "Invalid NIC or password" });
  //     // }

  //     // const token = jwt.sign({ _id: Driver._id }, process.env.JWT_SECRET, {
  //     //   expiresIn: "7d",
  //     // });

  //     // Driver.password = undefined;  
  //     res
  //       .status(200)
  //       .json({
  //         message: "You have successfully logged in",
  //         // Driver,
  //         // token,
  //         // details,
  //       });
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).json({ message: error.message });
  //   }
  // }

  module.exports = { signup, authentication, restrictTo };