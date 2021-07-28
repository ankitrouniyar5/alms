const express = require("express")
const router = express.Router()
const auth = require('../utilities/auth')
const isUser = auth.isUser
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');


const Branch = require('../models/Branch');
const Notification = require('../models/Notification');

//---logging in user
router.post('/login', async (req,res)=>{

    try {
        const {username , password} = req.body;

        if(!username|| !password ) {
            return res.status(400).json({errorMessage : "Please fill all the fields" });
        }
    
        const user = await Branch.findOne({username});
        if(user){
            var isMatch = await bcrypt.compare(password,user.password);
        }

        if(!isMatch){
            return res.status(401).json({errorMessage : "Invalid username or password"});
        } 

        const token = jwt.sign({
            user_name : user.username,
            user_branch : user.Branch_Name
        },
        process.env.JWT_KEY);
        
        res.cookie("token",token,{
            httpOnly :true
        }).send()
        
    } catch (error) {
        // console.log(error)
        res.status(500).json({errorMessage : "Internal Server Error"})
    }
})

//--------- Log Out user 
router.get('/logout',async (req,res)=>{
    res.cookie("token" ,"",{
        httpOnly : true,
        expires : new Date(0)
    }).send()
})


//----------to check is a user is logged in or not
router.get('/isloggedin',(req,res)=>{

    try {
        const token = req.cookies.token;
        if(!token) return res.status(200).json(false);
     
        jwt.verify(token,process.env.JWT_KEY);
        res.json(true);
        
    } catch (error) {
        // console.log(error);
        res.json(false);
    }
})

//----------to get a username is logged in or not
router.get('/role',(req,res)=>{

    try {
        const token = req.cookies.token;
        if(!token) return res.status(200).json("");
     
        role = jwt.verify(token,process.env.JWT_KEY);
        res.json(role.user_name);
        
    } catch (error) {
        // console.log(error);
        res.json(false);
    }
})

//getting notifications for a logged in user
router.get('/notifications', isUser ,async (req,res)=>{

    try {
        let page = req.query.page;
        if(!page) page = 0;
        const user_branch = req.user_branch;
        const notifications = await Notification.find({Branch_Name : user_branch}).sort({ time : -1 }).limit(10).skip(page*10).exec(); 
        res.status(200).json(notifications);
        
        
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
})

//for updating notification seen status
router.put('/notifications/:id',async(req,res)=>{

    try{
        const id = req.params.id;
        const doc = await Notification.findById(id);
        doc.read = true;
        await doc.save();
        res.json({successMessage : "Updated"});

    }catch(error){
        // console.log(error)
        res.json({errorMessage : "Error cannot update the notification now"})
    }
})

module.exports = router;