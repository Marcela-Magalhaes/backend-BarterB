const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: { type: String, required: true },
    description: String,
    imgUrl: { type: String, required: true},
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true},
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, 
{
     timestamps: true
});

module.exports = mongoose.model('Product', ProductSchema);