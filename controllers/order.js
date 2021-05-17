const { isBuffer } = require("lodash");
const { Order, ProductCart} = require("../models/Order")

exports.getOrderById = (req, res) => {
    Order.findById(id)
    .populate("products.product","name price")
    .exec((err, order) => {
        if(err){
            return res.status(400).json({
                error:"No order found in DB"
            })
        }
        req.order = order;
        next();
    });
}

exports.createOrder = (req, res) => {
    req.body.order.user = req.profile
    const order = new Order(req.body.order)
    order.save((err, order) => {
        if(err){
            return res.status(400).json({
                error:"Failed to save your ORDER in DB"
            })
        }
        res.json(order)
    })
}

exports.getAllOrders = (req, res) => {
    Order.find()
    .populate("user","_id name")
    .exec((err, order)=>{
        if(err){
            return res.status(400).json({
                error:"Failed to get ORDER from DB"
            })
        }
        res.json(order);
    });
}

exports.getOrderStatus = (req, res) => {
    res.json(Order.schema.path("status").enumValues);

}

exports.updateStatus = (req, res) => {
    Order.updateOne(
        {_id: req.body.orderId},
        {$set: {status: req.body.status}},
        (err, order) => {
            if(err){
                return res.status(400).json({
                    error:"Cannot update Order Status"
                })
            }
            res.json(order)
        }
    )
}