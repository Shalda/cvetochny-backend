const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const productsRouts = require("./routes/products");
const visualsRouts = require("./routes/visuals");
const userRoutes = require("./routes/user");
const emailsRoutes = require("./routes/emails");
mongoose.connect(
    "mongodb+srv://zeppelin:K9ocRGcgbQrpUOfc@clusterfr-m9lkb.mongodb.net/cvetochny_db", {useUnifiedTopology: true,
        useNewUrlParser: true,}
).then(() => {
    console.log("connected to database!");
}).catch(() => {
    console.log("connection failed")
});

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/", express.static(path.join(__dirname, "angular")));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});
app.use("/api/products", productsRouts);
app.use("/api/visuals", visualsRouts);
app.use("/api/user", userRoutes);
app.use("/api/sendmail", emailsRoutes);
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "angular", "index.html"))
});
// app.use("/", (req, res) => {
//     res.statusCode = 200;
//     res.end('Hello Node!\n');
// });

module.exports = app;
