const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.post("", (req, res) => {
    console.log("request came");
    let user = req.body;
    sendMail(user, info => {
        console.log(`The mail has beed send and the id is ${info.messageId}`);
        res.send(info);
    });
});

async function sendMail(user, callback) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "cvetochny.mailing@gmail.com",
            pass: "PuKjUM6sW"
        }
    });

    let mailOptions = {
        from: `${user.name}`, // sender address
        to: 'cvetochny.kh@gmail.com', // list of receivers
        subject: "Сообщение от посетителя сайта!", // Subject line
        html: `<h1>Пришло сообщение от ${user.name}</h1><br>
    <h4>Пользователь пришел со страницы товара: ${user.product} id товара:  ${user._id}</h4>
    <h4>Текст сообщения:</h4>
    <span>${user.message}</span>
    <h4>телефон посетителя: ${user.phone}</h4>
    <h4>почта посетителя: ${user.email}</h4>`

    };

    // send mail with defined transport object
    let info = await transporter.sendMail(mailOptions);

    callback(info);

}

module.exports = router;