/* the files dev and prod are made to seperate which server will use the database

*/

if (process.env.NODE_ENV === 'production') {
    console.log("Env is production");
    module.exports = require('./keys_prod')
}
else {
    console.log("Env is development");
    module.exports = require('./keys_dev')
}