const { user } = require('../models');
const crypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.user = async (req, res) => {
    try {
        const getAllUser = await user.findAll();

        return res.status(200).send({
            message: 'get all user succes',
            data: getAllUser,
        });
    } catch (error) {
        res.status(500).send({
            message: 'an error occured',
            data: error.message,
        });
    }
};

exports.createUser = async (req, res) => {
    try {
        const { firstName, lastName, username, email, password } = req.body;
        const hashedPassword = crypt.hashSync(password, 8);

        const input = await user.create({
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email,
            password: hashedPassword,
        });

        return res.status(201).send({
            message: 'register succes',
        });
    } catch (error) {
        res.status(500).send({
            message: 'an error occured',
            data: error.message,
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const getData = await user.findOne({
            where: { username: username },
        });

        if (!getData) {
            return res.status(404).send({
                message: 'Login Failed, user not found',
            });
        }

        const isPasswordValid = crypt.compareSync(
            password,
            getData.dataValues.password
        );
        if (!isPasswordValid) {
            return res.status(400).send({
                message: 'Login Failed, Wrong Password',
            });
        }

        const token = jwt.sign(
            {
                id: getData.dataValues.id,
                username: getData.dataValues.username,
                email: getData.dataValues.email,
            },
            process.env.JWT_KEY,
            { expiresIn: 3600 }
        );

        res.send({
            message: 'login succes',
            username: getData.dataValues.username,
            token: token,
        });
    } catch (error) {
        res.status(500).send({
            message: 'an error occured',
            data: error.message,
        });
    }
};

exports.getMe = async (req, res) => {
    try {
        const user = req.user;
        console.log(user);
        const getData = await user.findOne({
            where: { id: user.id },
        });

        if (!getData) {
            return res.status(404).send({
                message: 'user not found',
            });
        }

        return res.status(200).send({
            message: 'get My profile succes',
            data: getData.dataValues,
        });
    } catch (error) {
        res.status(500).send({
            message: 'an error occured',
            data: error.message,
        });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { firstName, lastName, username, email, password } = req.body;
        const hashedPassword = crypt.hashSync(password, 8);

        await user.update(
            {
                firstName: firstName,
                lastName: lastName,
                username: username,
                email: email,
                password: hashedPassword,
            },
            {
                where: { id: req.user.id },
            }
        );

        let getUser = await user.findOne({
            where: { id: req.user.id },
        });

        return res.status(201).send({
            message: 'user updated',
            data: getUser.dataValues,
        });
    } catch (error) {
        res.status(500).send({
            code: 500,
            status: false,
            message: error.message,
            data: null,
        });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        console.log(req);
        let deleted = user.destroy({
            where: { id: req.user.id },
        });

        return res.status(200).send({
            message: 'user deleted',
        });
    } catch (error) {
        res.status(500).send({
            code: 500,
            status: false,
            message: error.message,
            data: null,
        });
    }
};
