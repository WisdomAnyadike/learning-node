const productModel = require('../Models/Productsmodel')
const { cloudinary }  = require( '../Config/cloudinaryConfig')


// Create a new product
// access : private
const createProduct = async(req, res)=> {
    const { productName , productDescription , productPrice , productImage , productCategory } = req.body
    if (!productName || !productDescription || !productPrice || !productImage || !productCategory ){
        res.status(400).send({message:'all fields are required'})
    }
    try {
     const imageUpload = await cloudinary.uploader.upload(productImage,{folder:'product images'})
       const productLink = imageUpload.secure_url
       console.log('product link:' , productLink) ;
        const createProduct = await productModel.create({
            productName,
            productDescription,
            productPrice,
            productImage: productLink,
            productCategory
        })

        if(!createProduct){
            res.status(400).send({message:"unable to create product" , status:"false"})
        }else {
            res.status(200).send({message:"product succcessfully posted" , status:"success"})
        }
        
    } catch (error) {
        console.log(error);
        
    }




}



const getList = async (req, res)=> {
    try {
        const productList = await productModel.find()
        if (!productList) {
            res.status(400).send({message:"unable to fetch products" , status:"false"})
        }else {
            res.status(200).send({message:"products fetched successfully" , status:"okay" , data:productList})
            console.log('product list', productList);
        }
        
    } catch (error) {
        res.status(400).send({message:"internal server error"})
        console.log('server error', error);
    }

}

const getProductById = async (req, res) => {
  const id = req.params.id 
  if(!id){
    res.status(400).send({message:'id is not provided'})
  }else{
    try {
        const product = await productModel.findById(id)
        if (!product) {
            res.status(400).send({message:"product not found" , status:'false'} )
            
        }else {
            console.log('product found:', product);
            res.status(200).send({message:"product successfully fetched", status:"okay", product})
        }
    } catch (error) {
        res.status(400).send({message:"internal server error" } )
        console.log('server error', error);
    }
  }
};


const deleteProductById = async(req,res)=> {
const id = req.params.id
if(!id){
    res.status(400).send({message:'id is not provided'}) 
}else{
    try {
        const productToDelete = await productModel.findByIdAndDelete(id)
        if (!productToDelete) {
            res.status(400).send({message:"Unable to delete product" , status:'false'} )
        }else {
            res.status(200).send({message:"product successfully deleted", status:"okay"})
            console.log('deleted product:', productToDelete);
        }
        
    } catch (error) {
        res.status(400).send({message:"internal server error" } )
        console.log('server error', error); 
    }
}


}

const updateProductById = async(req,res)=> {
    const id = req.params.id 
    if(!id){
        res.status(400).send({message:'id is not provided'}) 
    }else{
        const { productImage , productCategory , productDescription , productName , productPrice} = req.body
        if (!productName || !productDescription || !productPrice || !productImage || !productCategory ){
            res.status(400).send({message:'all fields are required'})
        }else{
            try {
                const imageUpload = await cloudinary.uploader.upload(productImage,{folder:'product images'})
                const productLink = imageUpload.secure_url
                const productToUpdate = await productModel.findByIdAndUpdate( id , {
                    productName,
                    productDescription,
                    productPrice,
                    productImage : productLink,
                    productCategory
                }, {new: true})
            
                if (!productToUpdate) {
                    res.status(400).send({message:"Unable to edit product" , status:'false'} )
                }else {
                    res.status(200).send({message:"product successfully updated", status:"okay"})
                    console.log('updated product:', productToUpdate);
                }
            
            } catch (error) {
                res.status(400).send({message:"internal server error" } )
        console.log('server error', error);
            }
        }
        



    }

}



module.exports = {createProduct , getList , getProductById , deleteProductById , updateProductById }