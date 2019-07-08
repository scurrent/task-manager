const express = require('express')
const router = new express.Router()
const User = require("../models/user.js")

const auth = require("../middleware/auth")


// with middleware  - will run auth first
router.get('/users/me', auth, async (req, res) => {
   
   res.send(req.user)

})

router.get('/users/:id', async (req, res) => {
    console.log(req.params)
    const _id = req.params.id

    try {
        const user = await User.findById(_id)
        if (!user) {
            res.setStatus(404).send()
        } else {
            res.send(user)
        }
    } catch (e) {
        console.log(e)
        res.status(500).send()
    }

})



router.post('/users', async (req, res) => {
   
    const user = new User(req.body)
    
    try {
        await user.save()
        console.log("saved")
        const token = await user.genAuthToken()
        console.log(token)

         res.status(201).send({user, token})
    } catch (e){
        console.log("error " + e)
        res.status(400)
        res.send(e)
    }
   
  
})

router.patch('/users/:id', async (req, res) => {
console.log("patch user")

    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperaion = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if (!isValidOperaion) {
        return res.status(400).send({ error: "invalid updates on user!" })
    }

    try {
        const user = await User.findById(req.params.id)
        console.log("patch 1")
         updates.forEach((update)=>{
            user[update] = req.body[update]
        })
        user.save()        
//   This bypasses the mongoose and therefor the Schema "on save" functionality
//    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!user) {
            return res.status(404).send()

        }
        res.send(user)
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }


})

router.post('/users/login', async (req, res) =>{
    try{
        const user = await User.doLogin(req.body.email, req.body.password)
        //instance method
        const token = await user.genAuthToken() 
       // res.send({user, token})     
      // res.send({user: user.getPublicProfile(), token})     
      res.send({user, token})   //user will call the toJSON method that we are not explicitly calling

       
    }catch(e ){
         res.status(400).send()   
    }
})

router.post('/users/logout', auth, async (req, res) =>{
    try{


        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })


        await req.user.save() 
        res.status(200).send()
    }catch( e ){
        console.log(e)
         res.status(500).send()   
    }
})

router.post('/users/logoutAll', auth,  async (req, res) =>{
    try{
      req.user.tokens = []
       await req.user.save() 
      res.status(200).send()
    }catch( e ){
         res.status(500).send()   
    }
})




router.delete('/users/:id', async (req, res) => {

    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            return res.status(404).send()

        }
        res.sendStatus(200).send(user)
    } catch (e) {
        res.status(500).send(e)
    }


})



module.exports = router