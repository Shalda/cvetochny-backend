const mongoose = require("mongoose");
const dataSchema = mongoose.Schema({
    file:{ type: String, required: true},
    create_ts:{type: String, default: new Date().toLocaleString()},
})
module.exports = mongoose.model("Data", dataSchema);