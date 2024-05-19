import { Router } from "express";
const myorders=Router()
import { getquery, instquery,deleteQuery, updateQuery } from "../config/queries.js";
import verifytoken from "../middlewares/verifytoken.js";

//username and password should be passed in the header for authorization.

myorders.get('/myorders',verifytoken,async (req,res)=>{
    try{
    const {headers}=req
    const status='ordered'
    const getsql=`select * from myorders where username='${headers.username}' and status='${status}'`;
    const mycart= await getquery(getsql);
    console.log(mycart)
    return res.status(200).send({data:mycart.rows})
    }
    catch(err){
        res.status(403).send("internal server error")
    }
})

myorders.post('/listoforders',verifytoken,async (req,res)=>{
    try{
    const {body}=req
    console.log(body)
    const status="list"
    const instsql=`insert into myorders (title,status,price,username) values ($1,$2,$3,$4)`;
    await instquery(instsql,[body.title,"list",body.price,req.headers.username]);

    const getsql=`select * from myorders where status='${status}'and username='${req.headers["username"]}'`;
    const myorders= await getquery(getsql);
    // console.log(mycart.rows)
    return res.status(200).send({data:myorders.rows})
    }
    catch(err){
        res.status(403).send("internal server error")
    }
})

myorders.put('/orderedbooks',verifytoken,async (req,res)=>{
    try{
    const {body}=req;
    for(let i=0;i<body.length;i++){
    const sql = `update myorders set status = $1 where title = '${body[i].title}' and username='${req.headers["username"]}'`;
    await updateQuery(sql,['ordered']);
    }
    return res.status(200).send({message:"ordered"})
    }
    catch(err){
        res.status(403).send("internal server error")
    }
})

myorders.put('/itemcount',async (req,res)=>{
    try{
    const {headers}=req;
    const getsql=`select count from myorders where title='${req.body.title}' and username='${headers["username"]}'`
    const result =await getquery(getsql)
    let count=result.rows[0].count
    if(req.body.type==="increment")  
    {
        console.log("increment")
        count+=1
    }
    else 
    {
        console.log("decrement")

        if(count!=1)    
            count-=1
    }
    const sql=`update myorders set count= $1 where title = '${req.body.title}' and username='${headers["username"]}'`
    await updateQuery(sql,[count]);
    return res.status(200).send({data:count})
    }
    catch(err){
        res.status(403).send({data:"internal server error"})
    }
})

export default myorders;