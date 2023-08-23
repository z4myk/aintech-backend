const express = require('express');
require('dotenv').config();
const nodemailer = require('nodemailer')


const sendEmail = async(subject, message, send_to, sent_from, reply_to) => {
   const transporter = nodemailer.createTransport({
       host: process.env.EMAIL_HOST,
       port: 587,
       secure: false,
       auth: {
           user: process.env.EMAIL_USER,
           pass: process.env.EMAIL_PASS,
       },
       tls: {
           rejectUnauthorized: false,
       }
   })


   const options = {
       from: sent_from,
       to: send_to,
       replyTo: reply_to,
       subject: subject,
       html: message,

   }

   transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

   //send email
   transporter.sendMail(options, function(err, info) {
    if(err){
        console.log(err)
    }else{
        console.log(info)
    }
   })

   
}

module.exports = sendEmail;