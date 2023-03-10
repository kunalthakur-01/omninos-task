const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    items: [],
    shippingFee: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Cart', cartSchema);