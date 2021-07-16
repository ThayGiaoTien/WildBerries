const mongoose= require('mongoose')

const userSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: Number,
        default: 0 // 1 is admin, 0 is user
    },
    cart: {
        type: Array,
        default: []
    }

},{
    timestamps: true
})

module.exports = mongoose.model('user', userSchema)