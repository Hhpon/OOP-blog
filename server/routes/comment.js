module.exports = app => {
    const express = require('express')
    const router = express.Router()
    const multer = require('multer')
    const Article = require('../models/Article')
    const Comment = require('../models/Comment')

    const upload = multer({ dest: './uploads' })

    router.post('/comment', async (req, res) => {
        const model = await Comment.create(req.body)
        res.send(model)
    })

    router.get('/comments/:id', async (req, res) => {
        const model = await Comment.find()
            .where({
                article: { $in: req.params.id }
            })
            .populate('articles')
        res.send(model)
    })

    router.delete('/comment/:id', async (req, res) => {
        const model = await Comment.findByIdAndDelete(req.params.id)
        res.send(model)
    })

    router.get('/article', async (req, res) => {
        const model = await Article.find().populate('categories')
        res.send(model)
    })

    router.get('/article/:id', async (req, res) => {
        const model = await Article.findById(req.params.id)
        res.send(model)
    })

    router.post('/article', async (req, res) => {
        const model = await Article.create(req.body)
        res.send(model)
    })

    router.put('/article/:id', async (req, res) => {
        const model = await Article.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })

    router.delete('/article/:id', async (req, res) => {
        const model = await Article.findByIdAndDelete(req.params.id)
        res.send(model)
    })

    app.use('/api/admin/rest/', router)
}
