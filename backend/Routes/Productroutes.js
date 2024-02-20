const express = require("express")
const router = express.Router()
const  {createProduct, getList, getProductById, deleteProductById, updateProductById}  = require("../Controllers/ProductControlller")

router.post('/uploadProduct' , createProduct )
router.get('/getProducts' , getList )
router.get('/getProducts/:id' , getProductById )
router.post('/deleteProduct/:id' , deleteProductById )
router.post('/updateProduct/:id' , updateProductById )
module.exports = router