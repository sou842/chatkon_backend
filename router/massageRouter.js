const express = require('express');
const {massageModel} = require('../model/massageModel.js');

const massageRouter = express.Router();


massageRouter.get('/AllMassages/:ID',async(req,res)=>{
    const {ID} = req.params;

    try{
        const massage = await massageModel.find({ID})
        res.status(200).json({msg:"All data",data:massage})


    } catch(err){
        res.status(400).json({error:err.massage})
    }
})


massageRouter.post('/send',async(req,res)=>{
    const {creater,friend,msg,time,day,ID} = req.body;

    try{
        const massage = new massageModel({creater,friend,msg,time,day,ID})
        await massage.save()
        res.status(200).json({msg:'massage post successful.',data:req.body})

    } catch(err){
        res.status(400).json({error:err.massage})
    }
})


module.exports = {massageRouter};