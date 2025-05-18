import { MongoClient } from "mongodb";
import 'dotenv/config.js';
export const  client=new MongoClient(process.env.URL)
export const dbname1='Hotel';
