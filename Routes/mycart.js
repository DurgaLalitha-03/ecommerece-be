import { Router } from "express";
const mycart=Router()
import { getquery, instquery,deleteQuery, updateQuery } from "../config/queries.js";
import verifytoken from "../middlewares/verifytoken.js";


//username and password should be passed in the header for authorization.


mycart.post('/mycart',verifytoken,async (req,res)=>{
    try{
    const {body}=req
    const {myCart}=body
    const getsql=`select * from mycart where title='${myCart.title}' and username='${req.headers["username"]} '`
    const mycart= await getquery(getsql)
    if(mycart.rowCount>=1)
        return res.send({message:"Already added to the cart"})
    const sql=`insert into mycart (username,title,price,quantity,image,rating) values ($1,$2,$3,$4,$5,$6)`
    const result= instquery(sql,[req.headers.username,myCart.title,myCart.price,myCart.quantity,myCart.image,myCart.rating])
    console.log("Addedd successfully")
    return res.send({message:"Addedd succesfully"})
    }
    catch(err){
        res.status(403).send({message:"internal server error"})
    }
})

mycart.get('/mycart',verifytoken,async (req,res)=>{
    try{
    if(req.headers.username==null)
        return res.status(200).send({data:"user not found"})
    const sql=`select * from mycart where username='${req.headers["username"]}'`
    const mycart= await getquery(sql)
    return res.send({data:mycart.rows})
    }
    catch(err){
        res.status(403).send("internal server error")
    }
})

mycart.delete('/deletebook',verifytoken,async (req,res)=>{
    try{
    console.log("delete")
    const { body } = req;
    const sql=`delete from mycart where title='${body.title}' and username='${req.headers["username"]}'`;
    const data=await deleteQuery(sql);
    const getsql=`select * from mycart where username='${req.headers["username"]}'`;
    const mycart= await getquery(getsql);
    return res.status(200).send({data:data.rows,message:mycart.rows})
    }
    catch(err){
        res.status(403).send("internal server error")
    }
})

export default mycart;