const mongoose = require('mongoose')

const productSchema= new mongoose.Schema({
    
    title: {
        type: String, 
        required: true,
        unique: true
    },
    price: {
        type: Number, 
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    images: {
        type: Object,
        required: true
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'category'
    },
    checked: {
        type: Boolean,
        default: false
    },
    sold: {
        type: Number,
        default: 0
    },
    stock: {
        type: Number
    },
    instock:{
        type: Boolean,
        default: true
    }, 
    reviews: {
        type: Array,
        default: []
    }

},{
    timestamps: true
})

module.exports= mongoose.model('product', productSchema)