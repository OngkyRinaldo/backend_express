const jwt = require('jsonwebtoken');

exports.verifyToken = async (req, res, next) => {
    try {
        const jwtToken = req.headers['authorization'];
        if (!jwtToken) {
            return res.status(400).send({
                message: 'no jwt token provided',
            });
        }

        const verify = jwt.verify(jwtToken.split(' ')[1], process.env.JWT_KEY);
        if (!verify) {
            return res.status(403).send({
                message: 'failed to authenticate JWT Token',
            });
        }

        req.user = verify;
        next();
    } catch (error) {
        res.status(500).send({
            message: 'an error occured',
            data: error,
        });
    }
};
