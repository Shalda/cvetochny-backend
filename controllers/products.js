const Product = require('../models/product');
exports.getProducts = (req, res, next) => {
    const productQuery = Product.find();
    let fetchedProducts;
    productQuery
        .then(documents => {
                fetchedProducts = documents;
                res.status(200).json({
                    message: "Продукты получены!",
                    products: fetchedProducts,
                });
            }
        )
        .catch(
            error => {
                res.status(500).json({
                    message: "Не удалось получить продукты!"
                })
            }
        )
};

exports.createProduct = (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const product = new Product({
        name: req.body.name,
        parentCategory: req.body.parentCategory,
        category: req.body.category,
        subcategory: req.body.subcategory,
        diameter: req.body.diameter,
        description: req.body.description,
        price: req.body.price,
        img: url + "/images/" + req.file.filename,
        create_ts: req.body.create_ts
    });
    product.save()
        .then(createdProduct => {
            res.status(201).json({
                message: "Продукт добавлен удачно",
                product:createdProduct
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Не удалось создать продукт!"
            });
        });
};

exports.updateProduct = (req, res, next) => {
    let imagePath = req.body.img;
    if (req.file) {
        const url = req.protocol + "://" + req.get("host");
        imagePath = url + "/images/" + req.file.filename;
    }
    const product = new Product({
        _id: req.body._id,
        name: req.body.name,
        parentCategory: req.body.parentCategory,
        category: req.body.category,
        subcategory: req.body.subcategory,
        diameter: req.body.diameter,
        img: imagePath,
        description: req.body.description,
        price: req.body.price,
        create_ts: req.body.create_ts
    });
    Product.updateOne({_id: req.body._id}, product)
        .then(result => {
            console.log('result is' + product);
            res.status(200).json({ message: "Обновленно удачно!",
                product: product});
            // if (result.n > 0) {
            //     res.status(200).json({ message: "Обновленно удачно!",
            //     product: product});
            // } else {
            //     res.status(401).json({ message: "не авторизированы!" });
            // }
        })
        .catch(error => {
            res.status(500).json({
                message: "Не удалось обновить товар!"
            });
        });
};

exports.getProduct = (req, res, next) => {
    Product.findById(req.params.id)
        .then(product => {
            if (product) {
                res.status(200).json({
                    message: "Продукт получен",
                    product: product
                });
            } else {
                res.status(404).json({message: "Product not found!"});
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Fetching product failed!"
            });
        });
};

exports.deleteProduct = (req, res, next) => {
    Product.deleteOne({_id: req.params.id})
        .then(result => {
            res.status(200).json({
                message: "Deletion successful!",
                product: result
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Deleting products failed!"
            });
        });
};