import { dbname1,client } from "../Model/index.js";
import 'dotenv/config.js';
import nodemailer from "nodemailer";
const add=async(req,res)=>{
    await client.connect()
    try{
        let db=client.db(dbname1);
        let {fname,price,imglink,state}=req.body;
        await db.collection('fooddetails').insertOne({fname,price,imglink,state});
        res.status(200).send({
            message:"Data added successfullly"
        })
    }
    catch(err){
        res.status(500)({
            message:"Data error"
        })
    }
}
const addcart=async(req,res)=>{
    await client.connect()
    try{
        let db=client.db(dbname1);
        let {name,price,email,state}=req.body;
        await db.collection('foodcart').insertOne({name,price,email,quantity:1,state});
        res.status(200).send({
            message:"Data added successfullly"
        })
    }
    catch(err){
        res.status(500)({
            message:"Data error"
        })
    }
}
const get=async(req,res)=>{
    await client.connect();
    try{
        let db=client.db(dbname1)
        let {state}=req.query;
        let payload=await db.collection('fooddetails').find({state:state}).toArray();
        res.status(200).send({
            message:"Data fetched successfully",
            data:payload})
    }
    catch(err){
        res.status(500).send({
            message:"Data not fetched"
        })
    }
}
const delete1 =async(req,res)=>{
   await client.connect();
   try{
    let {name}=req.query;
    let db=client.db(dbname1)

    await db.collection('foodcart').deleteOne({"name":name});
    res.status(200).send({
        message:"Data deleted"
    })

   }
   catch(err){
    res.status(500).send({
        message:"data not deleted"
    })
   }

}
const delete3 =async(req,res)=>{
    await client.connect();
    try{
     let {name}=req.query;
     let db=client.db(dbname1)
 
     await db.collection('fooddetails').deleteOne({"fname":name});
     res.status(200).send({
         message:"Data deleted"
     })
 
    }
    catch(err){
     res.status(500).send({
         message:"data not deleted"
     })
    }
 
 }
const getcart=async(req,res)=>{
    await client.connect();
    try{
        let db=client.db(dbname1)
        let payload=await db.collection('foodcart').find().toArray();
        res.status(200).send({
            message:"Data fetched successfully",
            data:payload})
    }
    catch(err){
        res.status(500).send({
            message:"Data not fetched"
        })
    }
}
const get_order=async(req,res)=>{
    await client.connect();
    try{
        let {year}=req.query
        let db=client.db(dbname1)
        let payload=await db.collection('foodreport').find({year:parseInt(year)}).toArray();
        res.status(200).send({
            message:"Data fetched successfully",
            data:payload})
    }
    catch(err){
        res.status(500).send({
            message:"Data not fetched"
        })
    }
}
const bill =async(req,res)=>
{
    const { email, pdfBase64 } = req.body;
    console.log(process.env.email)

  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail", 
      auth: {
        user:"220701236@rajalakshmi.edu.in",
        pass: "clja bzln svkx alas",
      },
    });

    const mailOptions = {
      from: "220701236@rajalakshmi.edu.in",
      to: email,
      subject: "Your Hotel Bill - Ace Spad Hotel",
      text: "Thank you for dining with us. Please find your bill attached.",
      attachments: [
        {
          filename: "AceSpadHotel_Bill.pdf",
          content: Buffer.from(pdfBase64, "base64"),
          contentType: "application/pdf",
        },
      ],
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Email sent!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Email send failed" });
  }
}
const get_cart = async (req, res) => {
    try {
        await client.connect();
        const db = client.db(dbname1);

        const arr = await db.collection('foodcart').find().toArray();

        const now = new Date();
        const currentDate = now.toLocaleDateString();
        const currentYear = now.getFullYear();

        const modifiedArr = arr.map(item => ({
            ...item,
            date: currentDate,
            year: currentYear
        }));

        if (modifiedArr.length > 0) {
            await db.collection('foodreport').insertMany(modifiedArr);
        }

        res.status(200).send({
            message: "ProcessFinished"
        });
    } catch (err) {
        console.error(err); 
        res.status(500).send({
            message: "Process not finished"
        });
    } finally {
        await client.close(); 
    }
};


const delete2 = async (req, res) => {
    try {
        await client.connect();
        const db = client.db(dbname1);

        await db.collection('foodcart').deleteMany({});

        res.status(200).send({
            message: "ProcessFinished"
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            message: "Process not finished"
        });
    } finally {
        await client.close();
    }
};
export default{
    add,get,addcart,getcart,delete1,bill,get_cart,delete2,get_order,delete3
}