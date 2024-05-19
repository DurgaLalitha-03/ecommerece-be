import POOL from "pg";
const {Pool}=POOL
const pool=new Pool({
    user:"postgres",
    host:"localhost",
    database:"Bookstore",
    password:"postgres",
    port:5432 
})
pool.connect((err)=>{
    if(err)  throw err
    console.log("DB connected")
})
export const getquery=(query)=>{
    return new Promise((resolve,reject)=>{
        pool.query(query,(error,result)=>{
            if(error)   reject(error)
            resolve(result)
        })
    })
}

export const instquery=(query,data)=>{
    return new Promise((resolve,reject)=>{
        pool.query(query,data,(error,result)=>{
            if(error)   reject(error)
            resolve(result)
        })
    })
}

export const updateQuery=(query,data)=>{
    return new Promise((resolve,reject)=>{
        pool.query(query,data,(error,result)=>{
            if(error)   reject(error)
            resolve(result)
        })
    })
}

export const deleteQuery=(query,data)=>{
    return new Promise((resolve,reject)=>{
        pool.query(query,data,(error,result)=>{
            if(error)   reject(error)
            resolve(result)
        })
    })
}

