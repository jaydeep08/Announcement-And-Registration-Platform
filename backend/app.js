require('dotenv').config({path:"./.env"});
const express = require("express");
const cors =require("cors");
const registrationRouter = require("./src/routers/registrationRouters");
const clubRegistrationRouter = require("./src/routers/clubRegistrationRouters");
const loginRouter =require ("./src/routers/loginRouter")
const account=require("./src/routers/userAccountRouter")

const path = require('path');

const app = express();
const port = process.env.PORT || 8080;
require("./src/db/conn");

app.use(express.json());

app.use(cors());
app.use(express.static(path.join(__dirname, "frontend", "build")))






app.use(registrationRouter);
app.use(clubRegistrationRouter);
app.use(loginRouter);
app.use(account);





// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
// });


app.listen(port,()=>{
    console.log(`connection is setup ${port}`);
})