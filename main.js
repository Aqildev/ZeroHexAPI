const express = require('express');
const app = express();
var cors = require('cors'); 
app.use(cors());
const authController = require('./auth/AuthController');
const config=require('./configuration/config')


app.use('/api/users', authController);

process.on('unhandledRejection', error => {
   //Will print "unhandledRejection err is not defined"
  console.log( error.message);
});


var server = app.listen(4000, () => {
    console.log("Server is listening on port::", server.address().port);
})

