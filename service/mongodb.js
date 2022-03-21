const {MongoClient}  = require('mongodb')
const {mongoConfig} =require('../config')

class MongoDB {
    static connectToMongo = ()=>{
        MongoClient.connect(mongoConfig.connectionURL).then((con)=>{
            //console.log("mongodb connected")
            this.db = con.db(mongoConfig.database)
        }).catch((err)=>{
            //console.log("not connected")
        })
    }
}

MongoDB.db = null
//console.log(MongoDB.db)


module.exports = MongoDB