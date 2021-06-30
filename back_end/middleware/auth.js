const jsonwebtoken = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.header.authorization.split(' ')[1];
        const decodedToken = jsonwebtoken.verify(token, 'Secret_key_to_change');
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            console.log("User ID non available");
            throw "User ID non available";
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({ error: error | 'Non authorized request' });
    }
}