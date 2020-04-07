const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    author: { type: String },
    content: { type: String },
    article: { type: mongoose.SchemaTypes.ObjectId, ref: 'Article' },
    create_data: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Comment', schema, 'comments')
