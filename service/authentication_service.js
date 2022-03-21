const MongoDB = require('./mongodb')
const {mongoConfig, tokenSecret} = require('../config')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userRegister = async (user)=>{
    try{
        if (!user?.username || !user?.email || !user?.password)
            return {
                status :false,
                message:"Please fill the all fields"
            }
        const passwordHased = await bcrypt.hash(user?.password ,10 )

        let userObject = {
            username : user?.username,
            email:user?.email,
            password:passwordHased
        }
        let savedUser = await MongoDB.db.collection(mongoConfig.collections.USERS).insertOne(userObject)
        console.log(savedUser)
        if (savedUser?.acknowledged && savedUser?.insertedId){
            let token = jwt.sign({email:user?.email}, tokenSecret , {expiresIn : '120'})
            return {
                status:true,
                message:"user has been registrered",
                token:token
            }
        }else{ 
            return {
                status :false,
                message :"User registration failed"
            }
        }
    }catch(error){
           console.log(error);
           let errormessage = "User registration has failed";
           error?.code === 11000 && error?.keyPattern?.email ? (errormessage = "Email already exist"):null;
           return {
            status :false,
            message :errormessage,
            error :error?.toString()
           }
    }

}

//user login

const userLogin = async (user) =>{

    try {
    if (!user?.username || !user?.password)
        return {
            status : false,
            message :"Please fillout all fields"
        };

    let userObject = await MongoDB.db.collection(mongoConfig.collections.USERS).findOne(
        {
            username : user?.username
        }
    );
    if (userObject){
        let passwordVerified = await bcrypt.compare(
            user?.password , userObject?.password
        );
        if (passwordVerified){
            let token = jwt.sign({
                email:userObject?.email
            }, tokenSecret , {expiresIn : '120'});
            return {
                status :true,
                message:"Usr login succesfull",
                data:token
            };
        }else{
            return {
                status:false,
                message:"Incorrect password"
            };
        }

    }else{
        return{
            status:false,
            message:"No users found"
        };
    }
    }catch(error){
        return{
            status:false,
            message:"Login failed",
            error : error?.toString()
        }
    }
}

module.exports  = {userRegister,userLogin}

