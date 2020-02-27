const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
    name:{ type: String, required: true},
    parentCategory:{ type: String, required: true},
    category:{ type: String, required: true},
    subcategory:{ type: String},
    diameter:{ type: Number},
    img:{ type: String},
    description:{ type: String, required: true},
    note:{ type: String},
    price:{ type: Number, required: true},
    create_ts:{type: String, default: new Date().toLocaleString()},
});
module.exports = mongoose.model("Product", productSchema);
