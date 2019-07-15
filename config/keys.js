/*
The files keys_dev and keys_prod are made to control which database will the servers use
Basically to decide the Env: environment

process.env written before the variable name  means the variable is coming from heroku config vars,
when we see (process.env.NODE_ENV) that means we have a config variable on heroku that is named NODE_ENV
when we see (process.env.mongoURI) that means we have a config variable on heroku that is named mongoURI

In both cases above, for the server (local or heroku server) to get the value of the variable (ex: NODE_ENV), the server 
that is running the code will check the value of process.env.NODE_ENV. If the server is the local one, the value will be NULL,
else if the server is heroku server, it will look online for KEYs and VALUEs and retrieve what we have stored in the VALUE from there. 
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
/* SUMMARY:

So, the salt is a randomly generated addition to your email and psswd all concatinated.
Then we use bcrypt library to hash them all together and they will get saved in the database afterwards if you are signing up

jwt: json web token is a web token which is in JSON format, which is used to maintain an encrypted var to let the browser know that 
you as a user have logged in and still are, when you navigate between different routes or pages. The encryption is done using the 
secret. but I'm still not sure if the secret is or isn't the same one for all users.

Passport is a library that has things ready for us and then we can install jwt, fb, linkedin, twitter, or github from npm to 
add to our code based on which method we want to use.
\

*/