/*
The files dev and prod are made to decide which database will the servers use
Basically to decide the Env: environment

process.env written before the variable name  means its coming from heroku config vars,
when we see (process.env.NODE_ENV) that means we have a config variable on heroku that has the name NODE_ENV
when we see (process.env.mongoURI) that means we have a config variable on heroku that has the name mongoURI

In both cases above, in order for the server here to get the value of the variable (NODE_ENV or mongoURI), the server 
will check heroku online for KEYs and VALUEs and retrieve what we have stored in the VALUE from there
*/

if (process.env.NODE_ENV === 'production') { /* when this line is executed from the local server, 
    NODE_ENV will be null cz we did not define it anywhere inside the code and therefore the else{} will be executed, 
    but when run through heroku, NODE_ENV will be defined in the config vars hence this condition will be true */
    console.log("Env is production");
    module.exports = require('./keys_prod')
}
else {
    console.log("Env is development");
    module.exports = require('./keys_dev')
}