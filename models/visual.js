const mongoose = require("mongoose");
const visualSchema = mongoose.Schema({
    name:{ type: String, required: true},
    parentCategory:{ type: String, required: true},
    category:{ type: String, required: true},
    img:{ type: Array},
    description:{ type: String, required: true},
    price:{ type: Number, required: true},
    create_ts:{type: String, default: new Date().toLocaleString()},
})
module.exports = mongoose.model("Visual", visualSchema);