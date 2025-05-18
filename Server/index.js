import express from 'express'
import cors from 'cors'
import controller from './Controller/index.js';
import 'dotenv/config.js';
const app=express();
app.use(express.json())
app.use(cors());
app.use(controller)
const PORT=3000 || process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server is running at the ${PORT}`);
})