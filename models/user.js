const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    cart: {
        items: [{
            count: {
                type: Number,
                require: true,
                default: 1
            },
            courseId: {
                type: Schema.Types.ObjectId,
                require: true,
                ref: 'Course'
            }
        }]
    }
});

module.exports = model('User', userSchema, 'users');