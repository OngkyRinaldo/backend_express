const { post } = require('../models');

exports.posts = async (req, res) => {
    try {
        const getAllPost = await post.findAll();
        console.log(getAllPost);

        return res.status(200).send({
            message: 'get all post succes',
            data: getAllPost,
        });
    } catch (error) {
        res.status(500).send({
            message: 'an error occured',
            data: error.message,
        });
    }
};

exports.createPost = async (req, res) => {
    try {
        const { title, body } = req.body;

        await post.create({
            user_id: req.user.id,
            title: title,
            body: body,
        });

        return res.status(201).send({
            message: 'post has been created successfully',
        });
    } catch (error) {
        res.status(500).send({
            message: 'an error occured',
            data: error.message,
        });
    }
};

exports.updatePost = async (req, res) => {
    try {
        const { title, body } = req.body;

        await post.update(
            {
                user_id: req.user.id,
                title: title,
                body: body,
            },
            {
                where: { id: req.params.id },
            }
        );

        let getPost = await post.findOne({
            where: { id: req.params.id },
        });

        return res.status(201).send({
            message: 'post has been updated successfully',
            data: getPost.dataValues,
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

exports.deletePost = async (req, res) => {
    try {
        await post.destroy({
            where: { id: req.params.id },
        });

        return res.status(200).send({
            message: 'post has been deleted successfully',
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
