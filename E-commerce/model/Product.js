const mongoose = require('mongoose');

const ProductObject = {
    name: {
        type: String,
        required: true,
        unique:true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },  
    stock: {
        type: Number,
        required: true
    },
    id:{
        type: Number,
        required:true,
        unique:true

    }

}

const productSchema = new mongoose.Schema(ProductObject);
const ProductModel = mongoose.model('Product', productSchema);
module.exports = ProductModel;