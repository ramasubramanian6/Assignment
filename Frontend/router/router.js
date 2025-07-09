
const express = require('express');
const router = express.Router();
const { Adduser, editUser, deleteUser, getUser , getAllUsers} = require('../controller/controller');
const { AddProduct, editProduct, deleteProduct, getProduct ,getAllProducts } = require('../controller/controller');
const { AddCategory, editCategory, deleteCategory, getCategory,getAllCategories } = require('../controller/controller');
const visit_handler = require('../middleware/visit_handler');


// User Routes
router.post('/adduser', Adduser);
router.put('/edituser/:id', editUser);
router.delete('/deleteuser/:id', deleteUser);
router.post('/getuser', getUser);
router.get('/getallusers', getAllUsers);

// Product Routes
router.post('/addproduct', AddProduct);
router.put('/editproduct/:id', editProduct);
router.delete('/deleteproduct/:id', deleteProduct);
router.get('/getproduct/:id',visit_handler, getProduct);
router.get('/getallproducts', getAllProducts);



// Category Routes
router.post('/addcategory', AddCategory);
router.put('/editcategory/:id', editCategory);
router.delete('/deletecategory/:id', deleteCategory);
router.get('/getcategory/:id', getCategory);
router.get('/getallcategories', getAllCategories);




module.exports = router;
