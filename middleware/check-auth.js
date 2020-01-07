const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, "The_film_was_a_moderate_box_office_success_and_is_considered_a_cult_film");
        req.userData = { username: decodedToken.username, userId: decodedToken.userId };
        next();                   
    } catch (error) {
        res.status(401).json({ message: "Вы не авторизированы" });
    }
};
