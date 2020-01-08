const Data = require('../models/data');

exports.getData = (req, res, next) => {
    const dataQuery = Data.find();
    let fetchedData;
    dataQuery
        .then(documents => {
                fetchedData = documents;
                res.status(200).json({
                    message: "получен hero_img!",
                    data: fetchedData,
                });
            }
        )
        .catch(
            error => {
                res.status(500).json({
                    message: "Не удалось получить hero_img!"
                })
            }
        )
};

exports.createData = (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    let filePath = [];
    for (let i = 0; i < req.files.length; i++) {
        filePath.push(url + "/images/" + req.files[i].filename)
    }
    const data = new Data({
        name: req.body.name,
        parentCategory: req.body.parentCategory,
        category: req.body.category,
        description: req.body.description,
        price: req.body.price,
        img: filePath,
        create_ts: req.body.create_ts
    });
    data.save()
        .then(createdData => {
            res.status(201).json({
                message: "Оформление добавлено удачно",
                data: createdData
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Не удалось создать офромление!"
            });
        });
};

exports.updateData = (req, res, next) => {
    let filePath = req.body.img;
    if (req.files) {
        const url = req.protocol + "://" + req.get("host");
        filePath = [];
        for (let i = 0; i < req.files.length; i++) {
            filePath.push(url + "/images/" + req.files[i].filename)
        }
    }
    const data = new Data({
        _id: req.body._id,
        name: req.body.name,
        category: req.body.category,
        parentCategory: req.body.parentCategory,
        img: filePath,
        description: req.body.description,
        price: req.body.price,
        create_ts: req.body.create_ts
    });
    Data.updateOne({_id: req.body._id}, data)
        .then(updatedData => {
                res.status(200).json({
                    message: "Обновленно удачано!",
                    data: data
                })
            }
        )
        .catch(error => {
            res.status(500).json({
                message: "Не удалось обновить hero_img!"
            });
        });
};

// exports.getData = (req, res, next) => {
//     Data.findById(req.params.id)
//         .then(data => {
//             if (data) {
//                 res.status(200).json({
//
//                     data});
//             } else {
//                 res.status(404).json({message: "Data not found!"});
//             }
//         })
//         .catch(error => {
//             res.status(500).json({
//                 message: "Fetching data failed!"
//             });
//         });
// };

exports.deleteData = (req, res, next) => {
    Data.deleteOne({_id: req.params.id})
        .then(result => {
            res.status(200).json({
                message: "Deletion successful!",
                data: result
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Deleting data failed!"
            });
        });
};
