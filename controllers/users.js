const User   = require('../models/User');
const errorhandler = require('../utils/errorHandler');

module.exports.setUser = async function (req, res) {
    const userEmail = await User.findOne({email: req.body.email});

    if (userEmail) {
        res.status(404).json({
            message: 'This email allready in base',
        })
    } else {
        const user = new User({
            email   : req.body.email,
            name    : req.body.name,
            lastName: req.body.lastName,
        });

        try {
            await user.save();
            res.status(201).json(user)
        }
        catch(e){
            errorhandler(res, e);
        }
    }
}

module.exports.getUsers = async function (req, res) {
    try{
        const users = await User.find();  
        res.status(200).json(users)
    }catch(e){
        errorhandler(res, e);
    }
}

module.exports.update = async function (req, res) {
    const userExist = await User.findById(req.params.userId);
    if ( userExist ) {
        try{
            const updateUser = await User.findByIdAndUpdate(
                { _id: req.params.userId },
                { $set:{
                    name: req.body.name,
                    lastName: req.body.lastName,
                    email: req.body.email,
                } },
                { new :true }
                );
            res.status(200).json({
                success: true,
                message: 'User updated',
                user:updateUser
            })
        }catch(e){
            errorhandler(res, e);
        }
    } else {
        res.status(404).json({
            message: 'User not exist'
        })
    }
}

module.exports.delete = async function (req, res) {
    try {
        await User.remove({_id: req.params.userId});
        res.status(200).json({
            success: true,
            message: 'User deleted'
        });
    } catch (e) {
        errorhandler(res, e);
    }
}