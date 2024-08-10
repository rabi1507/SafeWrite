const express= require("express");
const app=express();
require('dotenv').config();
const bodyParser = require('body-parser')
const cors = require('cors')
const {connect}=require('./config/database');
const {userPath} = require("./Router/user");
const{blogPath} = require('./Router/blog');
const{tagPath} = require('./Router/tag');
const {commentPath} = require("./Router/comment");
const {rateLimiter} = require("./utils/rateLimit");

// to send data in req.body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const rateCare = rateLimiter(30, 500); 
app.use(cors());
app.use(rateCare);


app.use("/api/v1/user", userPath); // correct
app.use("/api/v1/blog", blogPath);  // correct
app.use("/api/v1/blogtag", tagPath); // 
app.use("/api/v1/comment", commentPath);

const PORT=process.env.PORT;
connect();
app.listen(PORT, ()=>{
    console.log(`app is listing at port ${PORT}`);
})


