const Order = require('../models/order');
exports.createOrder = (req, res, next) => {
    const order = new Order({
        clientName: req.body.clientName,
        clientPhone: req.body.clientPhone,
        deliveryWay: req.body.deliveryWay,
        paymentWay: req.body.paymentWay,
        addressDelivery: req.body.addressDelivery,
        dateDelivery: req.body.dateDelivery,
        timeDelivery: req.body.timeDelivery,
        receiveSolo: req.body.receiveSolo,
        friendName: req.body.friendName,
        friendPhone: req.body.friendPhone,
        itemCount: req.body.itemCount,
        cartPrice: req.body.cartPrice,
        shipped: req.body.shipped,
        cart: req.body.cart
    });
    order.save()
        .then(createdOrder => {
            res.status(201).json({
                message: "Заказ добавлен удачно",
                order: createdOrder
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Не удалось создать заказ!"
            });
            console.log(error)
        });
};
exports.getOrders = (req, res, next) => {
    const orderQuery = Order.find();
    let fetchedOrders;
    orderQuery
        .then(documents => {
                fetchedOrders = documents;
                console.log(fetchedOrders);
                res.status(200).json({
                    message: "заказы получены!",
                    orders: fetchedOrders,
                });
            }
        )
        .catch(
            error => {
                res.status(500).json({
                    message: "Не удалось получить заказы!"
                })
            }
        )
};
exports.updateOrder = (req, res, next) => {

    const order = new Order({
        _id: req.body._id,
        clientName: req.body.clientName,
        clientPhone: req.body.clientPhone,
        deliveryWay: req.body.deliveryWay,
        paymentWay: req.body.paymentWay,
        addressDelivery: req.body.addressDelivery,
        dateDelivery: req.body.dateDelivery,
        timeDelivery: req.body.timeDelivery,
        receiveSolo: req.body.receiveSolo,
        friendName: req.body.friendName,
        friendPhone: req.body.friendPhone,
        shipped: req.body.shipped,
        itemCount: req.body.itemCount,
        cartPrice: req.body.cartPrice,
        cart: req.body.cart
    });
    Order.updateOne({_id: req.body._id}, order)
        .then(result => {
            console.log('result is' + order);
            res.status(200).json({
                message: "Обновленно удачно!",
                order: order
            });
            // if (result.n > 0) {
            //     res.status(200).json({ message: "Обновленно удачно!",
            //     order: order});
            // } else {
            //     res.status(401).json({ message: "не авторизированы!" });
            // }
        })
        .catch(error => {
            res.status(500).json({
                message: "Не удалось обновить заказ!"
            });
        });
};
exports.deleteOrder = (req, res, next) => {
    Order.deleteOne({_id: req.params.id})
        .then(result => {
            res.status(200).json({
                message: "Deletion successful!",
                order: result
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Deleting orders failed!"
            });
        });
};