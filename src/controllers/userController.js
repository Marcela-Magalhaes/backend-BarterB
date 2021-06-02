
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {

    addUser: async function(req, res){
        try {
            const user = new User(req.body);
            //  console.log('~ user', user);

            // Utilizar bcrypt antes de atribuir la contraseña al usuario
            const salt = await bcrypt.genSalt(10);
            const encryptedPassword = await bcrypt.hash(user.password, salt);
            user.password = encryptedPassword;

            //Verificar si ya existe el username antes de guardarlo en la BBDD
            const searchUsername = await User.find({username: user.username });
           
            if(searchUsername[0]) {
                res.status(200).json({
                    message: "This username is not available"
                });
                
            } else {
                // Guardar el usuario en la BBDD
                await user.save((err, savedInfo) => {
                if(err) throw new Error('Error adding user', err);

                res.status(200).json({
                    message: 'Successfully added user',
                    savedInfo
                });
                });
            }
           
        } catch (error) {
            res.status(500).json({
                message: 'Internal Server Error'
            });
        }
    },

    getUserById: async function(req, res){
        try{
            const { id } = req.params;
            const selectedUser = await User.findById(id);

            res.status(200).json({
                selectedUser
            });

        } catch(error){
            res.status(500).json({
                message: 'Internal Server Error'
            });
        }
    },

    updateUser: async function(req, res){
        try {
            const { id } = req.params;
            const selectedUser = await User.findById(id);
            if(selectedUser === null){
                res.status(200).json({
                    message: 'User not found'
                });
            } else {

                const userInfo = req.body;
                
                if(userInfo.password !== undefined){
                    const salt = await bcrypt.genSalt(10);
                    const encryptedPassword = await bcrypt.hash(userInfo.password, salt);
                    userInfo.password = encryptedPassword;
                }

                await User.findByIdAndUpdate(userId, userInfo, { new: true}, (err, response) => {
                    if(err) throw new Error('Error updating user', err);

                    res.status(200).json({
                        message: 'Successfully updated user',
                        response
                    });
                });
            }
            
        } catch (error) {
            res.status(500).json({
                message: 'Internal Server Error'
            });
        }
    },

    deleteUser: async function(req, res){
        try {
            const { id }= req.params;
            const selectedUser = await User.findById(id);
            if(selectedUser === null){
                res.status(200).json({
                    message: 'User not found'
                });
            } else {
               await User.deleteOne({_id: id}, (err) => {
                    if(err) throw new Error('Error deleting user');

                    res.status(200).json({
                        message: 'Successfully deleted user'
                    });
               });
            }
            
        } catch (error) {
           // console.log('Error', error);
            res.status(500).json({
                message: 'Internal Server Error'
            });
        }
    },

    userLogin: async function(req, res){
        try {
          const userInfo = req.body;
          //  console.log('~ userInfo', userInfo);
          
          // comprobar username
            const checkedData = await User.findOne({ username: userInfo.username });
            // console.log('~ checkedData', checkedData);
            if(checkedData === null){
                res.status(401).json({
                    message: 'Incorrect user o password'
                });
                return;
            }

          // comprobar password
            const checkedPassword = await bcrypt.compare(userInfo.password, checkedData.password);
            // console.log('~ checkedPassword', checkedPassword);

            if(checkedPassword === false){
                res.status(401).json({  
                    message: 'Incorrect user or password'
                });
                return;
            }

          // Si todo está OK, se genera el token para login
            const token = jwt.sign( { username: checkedData.username, _id: checkedData._id}, process.env.SECRET, { expiresIn: 60*60*12 });
                        
            res.status(200).json({
                message: 'Correct Login',
                token
            });
        } catch (error) {
           res.status(500).json({
                message: 'Internal Server Error'
           });
        }
    }
};


