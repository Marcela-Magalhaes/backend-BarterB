const { findByIdAndUpdate } = require('../models/categoryModel');
const Category = require('../models/categoryModel');


module.exports = {

    addCategory: async (req, res) => { 
        try{
            const category = new Category(req.body);
            
            await category.save((err, savedInfo) => {
              
                if(err) throw new Error('Error adding Category');
    
                res.status(200).json({
                    message: 'Successfully added category'
                });
            });
        }catch(error){
            res.status(500).json({
                message: 'Internal Server Error'
            });
        }  
    },
    
    getAllCategories: async(req, res) => {
        try {
            const listaCategorias = await Category.find();

            res.status(200).json(listaCategorias);
        } catch (error) {
            res.status(500).json({
                message: 'Internal Server Error'
            });
        }
    },

    getProductsByCategory: async (req, res) => {
        try {
            const { id } = req.params;
            await Category.findById( id, (err, selectedCategory) => {
                
                if(err) throw new Error('Error getting produtcs by category');

                const productsByCategory = selectedCategory.productsList;
                // console.log('~ productsByCategory', productsByCategory);

                res.status(200).json(productsByCategory);
            } );

        } catch (error) {
            res.status(500).json({
                message: 'Internal Server Error'
            });
        } 
    },

    getCategoryById: async (req, res) => {
        try {
            const { id } = req.params;
            await Category.findById( id, (err, category) => {
                if(err) throw new Error('Error getting category by id');

                res.status(200).json(category);
            });

        } catch (error) {
            res.status(500).json({
                message: 'Internal Server Error'
            });
        } 
    },

    updateCategory: async(req, res) => {
        try {
            const { id } = req.params;
            const updatedData = req.body;
            
            await Category.findByIdAndUpdate(id, updatedData, { new: true }, (err, response) => {
                if(err) throw new Error('Error updating category');

                res.status(200).json({
                    message: 'Successfully updated category'
                });
            });          

        } catch (error) {
            res.status(500).json({
                message: 'Internal Server Error'
            });
        }
    },

    deleteCategory: async (req, res) => {
        try {
            const { id } = req.params;

            await Category.deleteOne({ _id: id});

            res.status(200).json({
                message: 'Succesfully deleted category'
            });
        } catch (error) {
            res.status(500).json({
                message: 'Internal Server Error'
            });
        }
    }
};