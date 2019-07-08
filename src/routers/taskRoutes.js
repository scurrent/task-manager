const express = require('express')
const router = new express.Router()
const Task = require("../models/task.js")


router.get('/tasks', async (req, res) => {

    try {
        const task = await Task.find({})
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }

})

router.delete('/tasks/:id', async (req, res) => {

    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if (!utaskser) {
            return res.status(404).send()

        }
        res.sendStatus(200).send(task)
    } catch (e) {
        res.status(500).send(e)
    }


})

router.get('/tasks/:id', async (req, res) =>{
    console.log(req.params)
    const _id = req.params.id
    
    try {
     const task = await   Task.findById(_id)
     if(!task){
        res.setStatus(404).send()
        }else{
            res.send(task)
        }   
    } catch(e){
        console.log(e)
        res.status(500).send()
    }

  
      
  
})



router.post('/tasks', async (req, res) => {
    console.log(req.body)
    const task = new Task(req.body)
    try{
        task.save()
        res.setStatus(201).send(task)
    }catch (e){
        console.log("in error")

        res.status(400)
        res.send(e)
    }
 
})

router.patch('/tasks/:id', async (req, res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description',  'completed']
    const isValidOperaion = updates.every((update)=> allowedUpdates.includes(update))

    if(!isValidOperaion){
        return res.status(400).send({error : "invalid task updates!"})
    }

    try{
        const task = await Task.findById(req.params.id)
        
        updates.forEach((update)=>{
            task[update] = req.body[update]
        })
        await task.save()   


       // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true})
        if(!task){
            return res.status(404).send()

        }
        res.send(task)
    }catch(e){
        res.status(400).send(e)
    }


})




module.exports = router