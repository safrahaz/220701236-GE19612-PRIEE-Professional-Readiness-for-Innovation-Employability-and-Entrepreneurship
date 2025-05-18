import express from 'express';
import UserController from './Usercontroller.js';
import foodController from './Foodcontroller.js';
const controller=express.Router();
controller.use('/user',UserController)
controller.use('/food',foodController)
export default controller