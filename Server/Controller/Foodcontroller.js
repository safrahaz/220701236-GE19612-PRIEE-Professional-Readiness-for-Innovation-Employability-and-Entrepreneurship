import express from 'express';
import Foodservice from '../Service/Foodservice.js';
const foodController=express.Router();
foodController.post('/add',Foodservice.add);
foodController.get('/get',Foodservice.get);
foodController.post('/addcart',Foodservice.addcart);
foodController.get('/cart',Foodservice.getcart);
foodController.delete('/del_cart',Foodservice.delete1);
foodController.post('/bill',Foodservice.bill);
foodController.get('/get_cart',Foodservice.get_cart);
foodController.delete('/delete2',Foodservice.delete2);
foodController.delete('/delete3',Foodservice.delete3);
foodController.get('/get_order',Foodservice.get_order);
export default foodController