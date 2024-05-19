import { Router } from "express";
import Express from "express";
import JWT  from "jsonwebtoken";
import bcrypt from "bcrypt"
import verifytoken from "../middlewares/verifytoken.js";
const router=Router()
import { getquery,instquery,updateQuery} from "../config/queries.js";
router.post("/register", async (req,res)=>{

    const { body } = req;
    const sql=`select * from userdetails where username='${body.username}'`
    const data=await getquery(sql)
    console.log(data.rows)
    if(data.rowCount===1)
        return res.status(200).send({message:"User already exist"})
    const hashpassword=await bcrypt.hash(body.password,10)
    const user={
        
        username:body.username,
        password:hashpassword
    }
    const token= JWT.sign(user,"$2b$10$syYs8JejWRxBNHviBdIzde",{
        algorithm:"HS256"})
    const inssql=`insert into userdetails (username,password,jsontoken) values ($1,$2,$3)`
    const result=await instquery(inssql,[body.username,hashpassword,token])
    res.status(201).send({data:user,message:"user created successfully"})
})

router.post('/login',verifytoken,async (req,res)=>{
    return res.status(201).send({message:"Login successfully"})

})
export default router