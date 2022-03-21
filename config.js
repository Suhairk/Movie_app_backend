const config = require('./package.json').projectconfig


module.exports = {
    mongoConfig :{
        connectionURL : config.mongoConnectionURL,
        database : "movie_app",
        collections:{
            USERS :"users"
        }
    },
    tokenSecret : "movie_app"
}