const nodemailer = require("nodemailer");

exports.consultationEmail = (req, res) => {
    console.log("request came");
    let user = req.body;
    let schema = 'consultation';
    sendMail(user, info => {
        console.log(`The mail has beed send and the id is ${info.messageId}`);
        res.send(info);
    }, schema);
};

exports.visualEmail = (req, res) => {
    console.log("request came");
    let user = req.body;
    let schema = 'visual';
    sendMail(user, info => {
        console.log(`The mail has beed send and the id is ${info.messageId}`);
        res.send(info);
    }, schema);
};

exports.orderEmail = (req, res) => {
    console.log("request came");
    let user = req.body;
    let schema = 'order';
    sendMail(user, info => {
        console.log(`The mail has beed send and the id is ${info.messageId}`);
        res.send(info);
    }, schema);
};

exports.oneClickOrder = (req, res) => {
    console.log("request came");
    let user = req.body;
    let schema = 'click';
    sendMail(user, info => {
        console.log(`The mail has beed send and the id is ${info.messageId}`);
        res.send(info);
    }, schema);
};

async function sendMail(user, callback, schema) {
    let cartStr;
    if (user.order && user.order.cart) {
        cartStr = JSON.stringify(user.order.cart)
            .replace(/productId/g, 'Id')
            .replace(/productName/g, 'Название')
            .replace(/productPrice/g, 'Цена за ед.')
            .replace(/productQuantity/g, 'Кол-во шт.')
            .replace(/:/g, ': ')
            .replace(/,/g, ' ')
            .replace(/[\[\]"{]/g, '')
            .replace(/}/g, '<br>');
    } else {
        cartStr = 'Не выбран товар'
    }
    const receiver = 'lazutikovnikita@gmail.com';
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port:587, // 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "cvetochny.mailing@gmail.com",
            pass: "PuKjUM6sW"
        }
    });
    let mailOptions;
    switch (schema) {
        case 'consultation':
            mailOptions = {
                from: `${user.name}`, // sender address
                to: receiver, // list of receivers
                subject: "Запрос на консультацию!", // Subject line
                html: `<h1>Посетителю ${user.name} нужна консультация!</h1><br>
    <h4>Текст сообщения:</h4>
    <span>${user.message}</span>
    <h4>телефон посетителя: ${user.phone}</h4>
    <h4>почта посетителя: ${user.email}</h4>`
            };
            break;
        case 'click':
            mailOptions = {
                from: `${user.name}`, // sender address
                to: receiver, // list of receivers
                subject: "Заказ в один клик!", // Subject line
                html: `<h1>Пришел заказ в один клик от ${user.name}</h1><br>
    <h4>Товар: ${user.product} id:  ${user._id}</h4>
    <h4>Телефон покупателя: ${user.phone}</h4>
   `
            };
            break;
        case 'order':
            mailOptions = {
                from: `${user.name}`, // sender address
                to: receiver, // list of receivers
                subject: "Пришел заказ!", // Subject line
                html: `<h1>Заказ от ${user.name}</h1><br>
        <p>Количество товара: <span>${user.order.itemCount} шт.</span></p>
        <p>Сумма заказа: <span>${user.order.cartPrice} грн.</span></p>
        <br>
         <hr>
        <h3>Информация о покупателе:</h3>
        <p>Имя: <span>${user.name}</span></p>
        <p>Телефон: <span>${user.phone}</span></p>
        <p>Способ доставки: <span>${user.order.deliveryWay}</span></p>
        <p>Способ оплаты: <span>${user.order.paymentWay}</span></p>
        <br>
        <p>адресс: <span>${user.order.addressDelivery}</span></p>
        <p>дата доставки: <span>${user.order.dateDelivery}</span></p>
        <p>время: <span>${user.order.timeDelivery}</span></p>
        <p>получатель: <span>${user.order.receiveSolo}</span></p>
         <br>
        <p>Имя получателя: <span>${user.order.friendName}</span></p>
        <p>Телефон получателя: <span>${user.order.friendPhone}</span></p>
        <br>
        <hr>
        <h3>Информация о заказе:</h3>
        <br>
         ${cartStr}
         <br>
         <h2>Итого: ${user.order.cartPrice} грн.</H2>
        <h3>Более детально про заказ можно узнать на сайте, админ панель, раздел заказы!!!</h3>
`
            };
            break;
        case 'visual':
            mailOptions = {
                from: `${user.name}`, // sender address
                to: receiver, // list of receivers
                subject: "Сообщение от посетителя со страницы Оформление!", // Subject line
                html: `<h1>Пришло сообщение от ${user.name}</h1><br>
    <h4>Пользователь пришел со страницы товара: ${user.product} id:  ${user._id}</h4>
    <h4>телефон посетителя: ${user.phone}</h4>`
            };
            break;
        default:
            mailOptions = {
                from: `${user.name}`, // sender address
                to: receiver, // list of receivers
                subject: "Сообщение от посетителя сайта!", // Subject line
                html: `<h1>Пришло сообщение от ${user.name}</h1><br>
    <h4>Пользователь пришел со страницы товара: ${user.product} id товара:  ${user._id}</h4>
    <h4>Текст сообщения:</h4>
    <span>${user.message}</span>
    <h4>телефон посетителя: ${user.phone}</h4>
    <h4>почта посетителя: ${user.email}</h4>`
            };
    }

    // send mail with defined transport object
    let info = await transporter.sendMail(mailOptions);
    callback(info);

}