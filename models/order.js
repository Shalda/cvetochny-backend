const mongoose = require("mongoose");
const orderSchema = mongoose.Schema({
    clientName:{ type: String, required: true},
    clientPhone:{ type: String, required: true},
    deliveryWay:{ type: String, required: true},
    paymentWay:{ type: String, required: true},
    addressDelivery :{ type: String},
    dateDelivery:{ type: String},
    timeDelivery:{ type: String},
    receiveSolo:{ type: String},
    friendName:{ type: String},
    friendPhone:{ type: String},
    itemCount:{ type: Number},
    cartPrice:{ type: Number},
    shipped:{ type: Boolean, required: true, default: false},
    cart:{ type: Object, required: true},

});
module.exports = mongoose.model("Order", orderSchema);