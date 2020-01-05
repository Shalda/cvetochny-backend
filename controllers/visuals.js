const Visual = require('../models/visual');

exports.getVisuals = (req, res, next) => {
    const visualQuery = Visual.find();
    let fetchedVisuals;
    visualQuery
        .then(documents => {
                fetchedVisuals = documents;
                res.status(200).json({
                    message: "получены товары из оформления!",
                    visuals: fetchedVisuals,
                });
            }
        )
        .catch(
            error => {
                res.status(500).json({
                    message: "Не удалось получить продукты из оформления!"
                })
            }
        )
};

exports.createVisual = (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    let filePath = [];
    for (let i = 0; i < req.files.length; i++) {
        filePath.push(url + "/images/" + req.files[i].filename)
    }
    const visual = new Visual({
        name: req.body.name,
        parentCategory: req.body.parentCategory,
        category: req.body.category,
        description: req.body.description,
        price: req.body.price,
        img: filePath,
        create_ts: req.body.create_ts
    });
    visual.save()
        .then(createdVisual => {
            res.status(201).json({
                message: "Оформление добавлено удачно",
                visual: createdVisual
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Не удалось создать офромление!"
            });
        });
};

exports.updateVisual = (req, res, next) => {
    let filePath = req.body.img;
    if (req.files) {
        const url = req.protocol + "://" + req.get("host");
        filePath = [];
        for (let i = 0; i < req.files.length; i++) {
            filePath.push(url + "/images/" + req.files[i].filename)
        }
    }
    const visual = new Visual({
        _id: req.body._id,
        name: req.body.name,
        category: req.body.category,
        parentCategory: req.body.parentCategory,
        img: filePath,
        description: req.body.description,
        price: req.body.price,
        create_ts: req.body.create_ts
    });
    Visual.updateOne({_id: req.body._id}, visual)
        .then(updatedVisual => {
                res.status(200).json({
                    message: "Обновленно удачано!",
                    visual: visual
                })
            }
        )
        .catch(error => {
            res.status(500).json({
                message: "Не удалось обновить товар!"
            });
        });
};

// exports.getVisual = (req, res, next) => {
//     Visual.findById(req.params.id)
//         .then(visual => {
//             if (visual) {
//                 res.status(200).json({
//
//                     visual});
//             } else {
//                 res.status(404).json({message: "Visual not found!"});
//             }
//         })
//         .catch(error => {
//             res.status(500).json({
//                 message: "Fetching visual failed!"
//             });
//         });
// };

exports.deleteVisual = (req, res, next) => {
    Visual.deleteOne({_id: req.params.id})
        .then(result => {
            res.status(200).json({
                message: "Deletion successful!",
                visual: result
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Deleting visuals failed!"
            });
        });
};
