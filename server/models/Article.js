const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: { type: String },
  author: { type: String },
  body: { type: String },
  description: { type: String },
  keyword: { type: String },
  coverImg: { type: String },
  browse: { type: Number, default: 0 },
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
  create_data: { type: Date, default: Date() }
})

module.exports = mongoose.model('Article', schema, 'articles')
