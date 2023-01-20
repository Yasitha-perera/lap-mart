const express=require('express');
const authRoutes=require('./auth.route');
const orderRoutes=require("./order.route")
const router = express.Router();

router.use('/auth',authRoutes);
router.use('/orders',orderRoutes);
module.exports=router;

