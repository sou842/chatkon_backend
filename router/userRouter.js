const express = require('express');
const { userModel } = require('../model/usermodel');


const userRouter = express.Router();


userRouter.get('/search/:number',async(req,res)=>{
    const {number} = req.params;

    try{
        const user = await userModel.findOne({number})
        if(user){
            res.status(200).json({msg:'User Founded',mark:true,user})
        } else{
            res.status(200).json({msg:'User Not Founded',mark:false})
        }
                
    } catch(err){
        res.status(400).json({error:err.massage})
    }
})

userRouter.post('/register',async(req,res)=>{
    const {name, number} = req.body;
    
    try{
        const available = await userModel.findOne({number})
        if(available){
            res.status(200).json({msg:'Account registered!!!',updatedUser:req.body}) 
        } else{
            const user = new userModel({name,number})
            await user.save()
            res.status(200).json({msg:'Account Created',updatedUser:req.body}) 
        }

    } catch(err){
        res.status(400).json({error:err.massage})
    }
})

userRouter.post('/login',async(req,res)=>{
    const { number } = req.body;

    try{
        const user = await userModel.findOne({number})
        if(user){
            res.status(200).json({msg:'available',user})
        } else{
            res.status(200).json({msg:'unavailable'})
        }
    } catch(err){
        res.status(400).json({error:err.massage})
    }

})

module.exports = { userRouter }
