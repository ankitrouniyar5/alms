const jwt = require('jsonwebtoken');


exports.isUser = (req,res,next) => {

    try {
        
        const token = req.cookies.token;
        if(!token) {
            res.status(401).json({errorMessage : "Error : 401 Unauthorized "})
        }
     
        const verified  = jwt.verify(token,process.env.JWT_KEY);
        req.user_name = verified.user_name;
        req.user_branch = verified.user_branch;
        next()
    } catch (error) {
        
        res.status(401).json({errorMessage : "Error : 401 Unauthorized "})
        
    }
}

exports.isAdmin = (req,res,next) => {

    try {
        
        const token = req.cookies.token;
        if(!token) {
            return res.status(401).json({errorMessage : "Error : 401 Unauthorized. You are not an admin"})
        }
     
        const verified  = jwt.verify(token,process.env.JWT_KEY);
        if(verified.user_name != "admin"){
            return res.status(401).json({errorMessage : "Error : 401 Unauthorized . You are not an admin"})
        }
        req.user_name = verified.user_name;
        req.user_branch = verified.user_branch;
        next()
    } catch (error) {
        
        res.status(401).json({errorMessage : "Error : 401 Unauthorized "})
        
    }
}