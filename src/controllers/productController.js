const Product = require('../models/productModel');
const User = require('../models/userModel');
const Category = require('../models/categoryModel');


module.exports = {

    addproduct: async (req, res) => {
        try {
            const product = new Product(req.body);
            
           product.name = product.name.toLowerCase();             
           await product.save(async(err, savedInfo) => {

                if(err) throw new Error('Error adding product', err);
                
                await User.findByIdAndUpdate(`${product.userId}`, { $push: { productsList: savedInfo._id }});
                await Category.findOneAndUpdate({_id: product.categoryId}, { $push: { productsList: savedInfo._id}});
                    
                res.status(200).json({
                    message: 'Successfully added product'
                });   
            });

        } catch (error) {
            res.status(500).json({
                message: 'Internal Server Error'
            });
        }
    },

    getProductById: async (req, res) => {
        try {
            const { id } = req.params;
            const selectedProduct = await Product.findById( id );
            
            res.status(200).json(selectedProduct);
            
        } catch (error) {
            res.status(500).json({
                message: 'Internal Server Error'
            });
        }
    },

    getAllProducts: async (req, res) => {
        try {
            const listaProductos = await Product.find();

            res.status(200).json(listaProductos);

        } catch (error) {
            res.status(500).json({
                message: 'Internal Server Error'
            }); 
        }
    },

    updateProduct: async (req, res) => {
        try {
            const { id } = req.params;
            const productInfo = req.body;

            await Product.findByIdAndUpdate(id, productInfo, { new: true }, (err, response) => {
                if(err) throw new Error('Error updating product');

                res.status(200).send('Successfuly updated product');
            });

        } catch (error) {
            res.status(500).json({
                message: 'Internal Server Error'
            });
        }
    }, 

    deleteProduct: async (req, res) =>{
        try {
            const { id } = req.params;

            await Product.deleteOne({ _id: id });

            await Category.findOneAndUpdate({ "productsList": id }, { "$pull": { "productsList": id }});
            await User.findOneAndUpdate({ "productsList": id }, { "$pull": { "productsList": id }});

            res.status(200).json({
                message: 'Successfully deleted product'
            });

        } catch (error) {
            res.status(500).json({
                message: 'Internal Server Error'
            });
        }
    },

    searchByName: async(req, res) => { 
        try {
            const { searchedProduct } = req.params;
            
            const listaTodosProductos = await Product.find();
            const selectedProducts = listaTodosProductos.filter( product => product.name.includes(searchedProduct.toLowerCase()));
                     
            res.status(200).json(selectedProducts);
            
        }catch(error){
            res.status(500).json({
                message: 'Internal Server Error'
            });
        }
    }
};