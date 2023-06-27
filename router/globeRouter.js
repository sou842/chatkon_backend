const express = require('express')
const {globeModel} = require('../model/globeModel.js')

const globeRouter = express.Router();

globeRouter.post('/posts',async(req,res)=>{
    const {createrName,post,time,like,like_person,Comments} = req.body;

    try{
        const posts = new globeModel({createrName,post,time,like,like_person,Comments})
        await posts.save()
        res.status(200).json({msg:'post successful',posts})
    } catch(err){
        res.status(400).json({error:err.massage})
    }
})

globeRouter.get('/alldata',async(req,res)=>{
    
    try{
        const data = await globeModel.find()
        res.status(200).json({msg:"All Post",data})

    } catch(err){
        res.status(400).json({error:err.massage})
    }
})

globeRouter.post('/like',async(req,res)=>{
    const payload = req.body;

    try{
        await globeModel.findByIdAndUpdate({_id: payload._id},payload)
        res.status(200).json({msg:'Post Liked',payload})

    } catch(err){
        res.status(400).json({error:err.massage})
    }
})


module.exports = {globeRouter}