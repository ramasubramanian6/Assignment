const express = require('express');
const router = express.Router();



const visit_handler=(req,res,next)=>{
    let visitCount = req.cookies.visitCount || 0;
    visitCount++;
    res.cookie('visitCount', visitCount, { maxAge: 900000, httpOnly: false }); // Due I just make the httpOnly False 
    console.log(`Visit count: ${visitCount}`);
    
}

module.exports = visit_handler;