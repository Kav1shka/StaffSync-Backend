const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
// const DB=require('./Services/Database')

require("dotenv").config({ path: `${process.cwd()}/.env`});
const app = express();
mongoose.set("strictQuery", false);

const PORT = process.env.PORT || 8000 ;
app.use(cors());

app.use(bodyParser.json());

const AuthRouter = require("./Routes/AuthRoute");
app.use("/User", AuthRouter);
app.listen(PORT,()=> console.log(`Server running on PORT ${PORT}`))