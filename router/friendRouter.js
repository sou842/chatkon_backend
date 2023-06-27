const express = require('express')
const {friendModel} = require('../model/friendModel.js')

const friendRouter = express.Router();


friendRouter.post('/create',async(req,res)=>{
    const {creater,friend,createrName,friendName,massages} = req.body;

    const user1 = await friendModel.findOne({"friend":friend,"creater":creater})
    const user2 = await friendModel.findOne({"friend":creater,"creater":friend})

    try{
        if(user1 || user2){
            res.status(200).json({msg:'Already added',updatedUser:req.body}) 
        } else{
            const chat = new friendModel({creater,friend,createrName,friendName,massages})
            await chat.save()
            res.status(200).json({msg:'Complited',updatedUser:req.body}) 
        }

    } catch(err){
        res.status(400).json({error:err.massage})
    }
})


friendRouter.get('/friends/:number',async(req,res)=>{
    const {number} = req.params;

    try{
        const creater = await friendModel.find({"creater":+number})
        const friend = await friendModel.find({"friend":+number})

        res.status(200).json({msg:'Data Recived',creater,friend})

    } catch(err){
        res.status(400).json({error:err.massage})
    }
})


module.exports = {friendRouter}