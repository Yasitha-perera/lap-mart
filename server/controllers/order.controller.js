const Order = require("../models/order.model");

async function submitOrder(order) {
  console.log("saving order object to database", order);

  return await new Order(order).save();
}

async function getOrderById(orderId){
  console.log(`Searching order for`, orderId);

  return await Order.findById(orderId);
}

async function getAllOrders(){
  console.log(`Fetching all orders`);

  return await Order.find({});
}

async function getOrdersByUserId(userId){
  console.log(`Searching orders for user`,userId);

  const orders = await Order.find({
    userId,
  });

  const mappedOrder = orders.map((order)=>({
    ...order.toObject(),
    orderId: order._id,
  }));
  return mappedOrder;
}

module.exports = {
  submitOrder,
  getOrderById,
  getAllOrders,
  getOrdersByUserId
};
