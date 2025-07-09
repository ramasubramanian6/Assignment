const express = require('express');
const mongoose = require('mongoose');

const UserModel = require('../model/User');
const ProductModel = require('../model/Product');
const CategoryModel = require('../model/Category');
const dynamic=require("../dynamicApi")


const app = express();

const router = express.Router();



// For demo not use the encyrt to store password just store as String 
const Adduser = async (req, res) => {
    try {
        const user = new UserModel(req.body);
        await user.save();
        return res.status(201).send(user);
    } catch (error) {
        return res.status(400).json({
            message: "Error while adding user",
            error: error.message
        });
    }
}

//Not Use this function for Demo  :)

const editUser = async (req, res) => {
    try {
        const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send({
            message: "Error while editing user",
            error: error.message
        });
    }
}

//Not Use this function for Demo  :)


const deleteUser = async (req, res) => {
    try {
        const user = await UserModel.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        res.status(200).send({ message: "User deleted successfully" });
    } catch (error) {
        res.status(400).send({
            message: "Error while deleting user",
            error: error.message
        });
    }
}




const getUser = async (req, res) => {
    try {
       
        const User_emai = req.body.email;
        const Input_password = req.body.password;
         console.log(User_emai);
        if (!User_emai || !Input_password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
        const user = await UserModel.findOne({ email: User_emai });

        if (user.password != Input_password) {
            return res.status(404).send({ message: "User not found" })
        }
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        if (user) return res.status(200).send(user);
    } catch (error) {
        res.status(400).send({
            message: "Error while fetching user",
            error: error.message
        });
    }
}


//Not Use this function for Demo  :)

const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(400).send({
            message: "Error while fetching users",
            error: error.message
        });
    }
}


const AddProduct = async (req, res) => {
    try {
        const product = new ProductModel(req.body);
        await product.save();
        res.status(201).send(product);
    } catch (error) {
        res.status(400).send({
            message: "Error while adding product",
            error: error.message
        });
    }
}
const editProduct = async (req, res) => {
    try {
        const product = await ProductModel.findByIdAndUpdate(req.params
            .id, req.body, { new: true });
        if (!product) {
            return res.status(404).send({ message: "Product not found" });
        }
        res.status(200).send(product);
    } catch (error) {
        res.status(400).send({
            message: "Error while editing product",
            error: error.message
        });
    }
}


const deleteProduct = async (req, res) => {
    try {
        const product = await ProductModel.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).send({ message: "Product not found" });
        }
        res.status(200).send({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(400).send({
            message: "Error while deleting product",
            error: error.message
        });
    }
}


//dynamic only in back end code not used by frontend due to short time

const getProduct = async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id);
        if (!product) {
            return res.status(404).send({ message: "Product not found" });
        }
        if(product.stock==0 ){
            res.status(400).send({ message:`Product was not avaliable for now, no.of.stock: ${product.stock} `})
        }

        const productCookies=`${product.id}`
        let visitCount = parseInt(req.cookies[productCookies]) || 0;
        visitCount += 1;

        res.cookie(productCookies, visitCount, { maxAge: 5*24*60*60*1000 }); // 5 naaal 5*
        let dynamicPrice = product.price;

        if (visitCount < 5) {
            dynamicPrice = product.price * 0.9;
        } else if (visitCount < 10) {
            dynamicPrice = product.price * 0.8;
        }


        product.price = dynamicPrice;
        res.status(200).send(product);
    } catch (error) {
        res.status(400).send({
            message: "Error while fetching product",
            error: error.message
        });
    }
};

//Search by product name

const getAllProducts = async (req, res) => {
    try {
        const result_data = new dynamic(ProductModel.find(), req.query);
        const last= result_data.query_based_search().filter_category().filter_by_price();
        const products = await last.query;
        res.status(200).send(products);
    } catch (error) {
        res.status(400).send({
            message: "Error while fetching products",
            error: error.message
        });
    }
}



//search by name filter by price

// const getAllProducts = async (req, res) => {
//     try {
//         const result_data = new dynamic(ProductModel.find(), req.query);
//         const last= result_data.query_based_search().filter_by_price();
//         const products = await last.query;
//         res.status(200).send(products);
//     } catch (error) {
//         res.status(400).send({
//             message: "Error while fetching products",
//             error: error.message
//         });
//     }
// }



const AddCategory = async (req, res) => {
    try {
        const category = new CategoryModel(req.body);
        await category.save();
        res.status(201).send(category);
    } catch (error) {
        res.status(400).send({
            message: "Error while adding category",
            error: error.message
        });
    }
}
const editCategory = async (req, res) => {
    try {
        const category = await CategoryModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!category) {
            return res.status(404).send({ message: "Category not found" });
        }
        res.status(200).send(category);
    } catch (error) {
        res.status(400).send({
            message: "Error while editing category",
            error: error.message
        });
    }
}


const deleteCategory = async (req, res) => {
    try {
        const category = await CategoryModel.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(404).send({ message: "Category not found" });
        }
        res.status(200).send({ message: "Category deleted successfully" });
    } catch (error) {
        res.status(400).send({
            message: "Error while deleting category",
            error: error.message
        });
    }
}


const getCategory = async (req, res) => {
    try {
        const category = await CategoryModel.findById(req.params.id);
        if (!category) {
            return res.status(404).send({ message: "Category not found" });
        }
        res.status(200).send(category);
    } catch (error) {
        res.status(400).send({
            message: "Error while fetching category",
            error: error.message
        });
    }
}

// for Search by category name
const getAllCategories = async (req, res) => {
    try {
        const dynamic=new dynamicApi(CategoryModel.find(), req.query)
        dynamic.query_based_search();
        const categories = await dynamic.query;
        res.status(200).send(categories);
    } catch (error) {
        res.status(400).send({
            message: "Error while fetching categories",
            error: error.message
        });
    }
}



module.exports = {
    Adduser,
    editUser,
    deleteUser,
    getUser,
    getAllUsers,

    AddProduct,
    editProduct,
    deleteProduct,
    getProduct,
    getAllProducts,

    AddCategory,
    editCategory,
    deleteCategory,
    getCategory,
    getAllCategories
};


