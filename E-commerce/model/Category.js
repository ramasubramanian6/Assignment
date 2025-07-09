const mongoose = require('mongoose');
const category_Object = {
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    id:{
        type: Number,
        required:true,
        unique:true

    }
    
};
const categorySchema = new mongoose.Schema(category_Object);
const categoryModel = mongoose.model('category', categorySchema);
module.exports = categoryModel;