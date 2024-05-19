import { Router } from "express";
const bookRouter=Router()
import { getquery } from "../config/queries.js";
                 
// this is an open api, no need of authorization required
 bookRouter.get('/allbooks',async (req,res)=>{
    try{
    const sql=`select * from books`;
    const data=await getquery(sql);
    return res.send({data:data.rows});
    }
    catch(err){
        res.status(403).send("internal server error")
    }
 })

export default bookRouter

