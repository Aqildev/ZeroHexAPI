const express = require('express');
const app = express();
var cors = require('cors'); 
app.use(cors());
const userRoutes = require('./auth/UserRoutes');
const errorHandler = require('./middleware/error');

//@info all routes
app.use(express.json())
app.use('/api/users', userRoutes);
app.use(errorHandler);
//port at which server running
var PORT=process.env.PORT||4000;
//@info server listening
var server = app.listen(PORT, () => {
    console.log("Server is listening on port::",PORT);
})
//@info server will be closed in case of any unhandledRejection
process.on('unhandledRejection', error => {
 console.log( error.message);
 server.close(()=>process.exit(1));
});
