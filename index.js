import  Express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from "./Routes/Register.js"
import verifytoken from './middlewares/verifytoken.js';
import bookRouter from './Routes/Books.js';
import mycart from './Routes/mycart.js';
import myorders from './Routes/myorders.js';
const app=Express()
app.use(bodyParser.json())
app.use(cors({
    Origin: '*',
    methods : ['GET','POST','PUT','DELETE']
})) 

app.use("/",router)

app.use("/",bookRouter)
app.use("/",myorders)
app.use("/",mycart)
app.listen(4001, () => {
    console.log("Server at 4001");
});
