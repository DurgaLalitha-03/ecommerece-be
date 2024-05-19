import JWT from "jsonwebtoken"
import { getquery } from "../config/queries.js"
import bcrypt from "bcrypt"

const verifytoken = async (req,res,next)=>{
    try{
        const sql=`select * from userdetails where username='${req.headers["username"]}'`
        const result=await getquery(sql)
        const token=result.rows[0].jsontoken;
    if(!token)
        {
          return res.status(401).send("token is required");
        }
        console.log(req.headers)
        const decodedtoken = JWT.decode(token, "$2b$10$syYs8JejWRxBNHviBdIzde");
        console.log("token is:", decodedtoken);
        if(req.headers["username"]===decodedtoken.username && await bcrypt.compare(req.headers["password"],decodedtoken["password"])){
            console.log("token verified");
            next();
        } 
        else{
            res.status(403).send({message:"Invalid user"})
        }
    }
   catch(error){
        console.log(error)
        res.status(403).send({message:"Login to perform action"})
   }
}
export default verifytoken;