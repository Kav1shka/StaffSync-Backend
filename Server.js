require('dotenv').config({ path: `${process.cwd()}/.env` });
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const catchAsync = require('./utils/catchAsync');
const AppError = require('./utils/appError');

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));


const AuthRouter = require("./Routes/AuthRoute");
app.use("/User", AuthRouter);

const productRouter = require("./Routes/product");
app.use("/products", productRouter);

app.use(bodyParser.json());

app.use(
    '*',
    catchAsync(async (req, res, next) => {
        throw new AppError(`Can't find ${req.originalUrl} on this server`, 404);
    })
);
const PORT = process.env.PORT || 8000 ;
app.listen(PORT,()=> console.log(`Server running on PORT ${PORT}`))