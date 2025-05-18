import express from 'express';
const UserController=express.Router();
import Userservice from '../Service/Userservice.js';
UserController.post('/signup',Userservice.create_login);
UserController.post('/login',Userservice.login);
export default UserController