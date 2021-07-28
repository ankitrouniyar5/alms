const express = require("express")
const router = express.Router()
const auth = require('../utilities/auth')
const isAdmin = auth.isAdmin 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Branch = require('../models/Branch');
const Notification = require('../models/Notification');


/* Get all branch names */
router.get("/branches",isAdmin, async (req,res)=>{

    try {
        const branch = await Branch.find({},'Branch_Name username');
        res.json(branch);
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg : "Internal Server Error"});
    }
    
})

/* Get all notification of a branch*/
router.get("/notifications/:branch",isAdmin, async (req,res)=>{
    
    try{
        const branch = req.params.branch;
        const notification = await Notification.find({Branch_Name : branch});
        res.status(200).json(notification);
    }catch(error){
        return res.status(500).json({msg : "Internal Server Error"});
        console.log(error);
    }
})

/* Get count of  notification of a branch*/
router.get("/notifications/count/:branch",isAdmin, async (req,res)=>{
    
    try{
        const branch = req.params.branch;
        if(branch === "all" ) {
        
            const count = await Notification.countDocuments({});
            return res.status(200).json(count);
            
        }else{
            const count = await Notification.countDocuments({ Branch_Name : branch});
            return res.status(200).json(count);
        }
        
        
    }catch(error){
        console.log(error);
        return res.status(500).json({msg : "Internal Server Error"});
    }
})

/* Get count of  notification of a branch*/
router.get("/notifications/count/read/:branch",isAdmin, async (req,res)=>{
    
    try{
        const branch = req.params.branch;
        if(branch === "all" ) {
        
            const count = await Notification.countDocuments({read : false});
            return res.status(200).json(count);
            
        }else{
            const count = await Notification.countDocuments({ Branch_Name : branch , read : false});
            return res.status(200).json(count);
        }
        
        
    }catch(error){
        console.log(error);
        return res.status(500).json({msg : "Internal Server Error"});
    }
})

/* Get a branch  */
router.get("/branches/:branch",isAdmin, async (req,res)=>{

    try {

        const branch = await Branch.find({Branch_Name : req.params.branch});
        
        res.status(200).json(branch);
    } catch (error) {
        // console.log(error)
        return res.status(500).json({msg : "Internal Server Error"});
    }
    
})

/*Create a branch */
router.post("/branches",isAdmin,async (req,res)=>{

    try {

        req.checkBody('Branch_Name', "Branch Name Cannot be empty").notEmpty();
        req.checkBody('Address', "Address Cannot be empty").notEmpty();
        req.checkBody('City', "Branch city Cannot be empty").notEmpty();
        req.checkBody('Contact_Number', "Contact Number cannot be empty").notEmpty();
        req.checkBody('Branch_Incharge', "Branch Incharge cannot be empty").notEmpty();
        req.checkBody('username', "User name cannot be empty").notEmpty();
        req.checkBody('password', "Paswword is too small").notEmpty().isLength({ min: 5 });

        var errors = req.validationErrors();
        if (errors) {
            return res.status(400).json(errors);
        }else{
        
        const Branch_Name = req.body.Branch_Name;
        const Address = req.body.Address;
        const City = req.body.City;
        const Contact_Number = req.body.Contact_Number;
        const Branch_Incharge = req.body.Branch_Incharge;
        const username = req.body.username;
        const pincodes = req.body.pincodes;
        const password = req.body.password;
        const hashedPassword = await bcrypt.hash(password, 8)
        const branch = await new Branch({
            pincodes,
            Branch_Name,
            Address,
            City,
            Contact_Number,
            Branch_Incharge,
            username,
            password : hashedPassword
        });
        await branch.save();
        res.status(201).json(branch);
    }
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg : "Internal Server Error"});
    }
    
})

/* update a branch */
router.put("/branches/:branch",isAdmin,async (req,res)=>{

    try {
    
        const password = req.body.password;
        req.checkBody('Branch_Name', "Branch Name Cannot be empty").notEmpty();
        req.checkBody('Address', "Address Cannot be empty").notEmpty();
        req.checkBody('City', "Branch city Cannot be empty").notEmpty();
        req.checkBody('Contact_Number', "Contact Number cannot be empty").notEmpty();
        req.checkBody('Branch_Incharge', "Branch Incharge cannot be empty").notEmpty();
        req.checkBody('username', "User name cannot be empty").notEmpty();
        
        if(password.length !== 0){
            req.checkBody('password', "Password too small").isLength({min : 5});   
        }

        var errors = req.validationErrors();
        if (errors) {
            return res.status(400).json(errors);
        }else{
        
        const Branch_Name = req.body.Branch_Name;
        const Address = req.body.Address;
        const City = req.body.City;
        const Contact_Number = req.body.Contact_Number;
        const Branch_Incharge = req.body.Branch_Incharge;
        const username = req.body.username;
        const pincodes = req.body.pincodes;
        
        
        const b = await Branch.findOne({Branch_Name : req.params.branch});

        console.log(b)
        if(!b) return res.status(400).json({msg : "Branch not Found"});

        b.Branch_Name = Branch_Name;
        b.Address = Address;
        b.City = City;
        b.Contact_Number = Contact_Number;
        b.Branch_Incharge = Branch_Incharge;
        b.username = username;
        b.pincodes = pincodes;
        if( password.length !== 0){
            const hashedPassword = await bcrypt.hash(password, 8);
            b.password = hashedPassword;
        }
        await b.save();
        res.status(201).json(b);
    }
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg : "Internal Server Error"});
    }
    
})

/* Delete a branch */
router.delete("/branches/:branch",isAdmin,async (req,res)=>{

    try {
        const Branch_Name = req.params.branch;
        const branch = await Branch.findOneAndDelete({Branch_Name});
        if(branch){
            const noti = await Notification.deleteMany({Branch_Name});
        }
        res.json({msg : "Successfull deleted"});

    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Internal server Error"});
    }
    
})

router.get('/isAdmin',async (req,res)=>{

    try {
        const token = req.cookies.token;
        if(!token) return res.status(200).json(false);
     
        role = jwt.verify(token,process.env.JWT_KEY);
        if(role.user_name === "admin"){
            return res.json(true);
        }
        res.json(false);
        
    } catch (error) {
        // console.log(error);
        res.json(false);
    }
})

module.exports = router
