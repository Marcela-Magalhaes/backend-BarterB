const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: String,
    address: {
        zipCode: {type: Number, required: true },
        district: {type: String, required: true }
    },
    imgUrl: String,
    productsList: [{ type: Schema.Types.ObjectId, ref: 'Product'}]
});

module.exports = mongoose.model('User', UserSchema);