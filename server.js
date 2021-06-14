const express = require('express');
const app = express();
var cors = require('cors'); 
app.use(cors());
const userRoutes = require('./auth/userRoutes');


app.use('/api/users', userRoutes);
process.on('unhandledRejection', error => {
   //Will print "unhandledRejection err is not defined"
  console.log( error.message);
});

var PORT=process.env.PORT||4000;
var server = app.listen(PORT, () => {
    console.log("Server is listening on port::",PORT);
})

