const express = require('express')
const path = require('path');
const session = require('express-session')
const auth = require('./utilities/auth') 
const cors = require('cors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator')
require("dotenv").config();

const port = process.env.PORT || 4000 

const Branch = require('./models/Branch');
const Notification = require('./models/Notification');

//initializing app
const app = express()

//connecting database

require("./mongoose");

//setting up view engine
app.set('views',path.join(__dirname,'views'))
app.set('view engine', 'ejs')

//seting up public folder 
app.use(express.static(path.join(__dirname,'public')))

//setting up body parser middle ware
app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



app.use(cors({
    origin : "*",
    credentials : true
}));

//setting up express-session middle ware
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: process.env.SECRET,
  resave: true,
  saveUninitialized: true,
//   cookie: { secure: true }
}))


//setting up express validator middleware
app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        var namespace = param.split('.')
                , root = namespace.shift()
                , formParam = root;
  
        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    },
    customValidators: {
        isImage: function (value, filename) {
            var extension = (path.extname(filename)).toLowerCase();
            switch (extension) {
                case '.jpg':
                    return '.jpg';
                case '.jpeg':
                    return '.jpeg';
                case '.png':
                    return '.png';
                case '':
                    return '.jpg';
                default:
                    return false;
            }
        }
    }
  })); 

//setting up socket io

const socketio = require('socket.io')
const http = require('http');
const server = http.createServer(app)

const io = socketio (server, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"],
        credentials: false
    }
});

io.on('connection',(socket)=>{

    socket.on('join',(username)=>{
        socket.join(username);
        // console.log(typeof(username));
    })
    socket.on('sendNotification',(username)=>{
        
        if(username.length === 0 ){
            io.to('admin').emit('notify');
        }else{
            arr1 = [];
            username.forEach((user) => {
                    if(arr1.includes(user) === false) {
                        arr1.push(user);
                        return io.to(user).emit('notify')
                    }
                   
            }
            );
        } 
    })

    socket.on('disconnect',()=>{
        // console.log("User disconnected");
    })
})



//for enquiry details by customers
app.post('/branches',async (req,res)=>{


    try {
    const pincode = req.body.pincode;
    const phone = req.body.phone;
    const address = req.body.address;
    
    const branches = await Branch.find({pincodes :{ $in : [ pincode ] }});
    if(!Object.keys(branches).length) {
        const noti = new Notification({
            Branch_Name :"admin",
            customer_address:address,
            customer_phone:phone,
            pincode : pincode,
            read :false
        })

        await noti.save();
    }else{
        branches.forEach(async(br)=>{
            const noti = new Notification({
                Branch_Name : br.Branch_Name,
                customer_address:address,
                customer_phone:phone,
                pincode : pincode,
                read :false
            })
            await noti.save();

        })
     
    }

    res.json(branches);
    } catch (error) {
        console.log(error);
        res.json({msg : "Internal Server Error"});
    }
    
})

//getting notifications for a logged in user
const user = require('./routes/user');
const admin = require("./routes/admin"); 
app.use('/user',user);
app.use('/admin',admin);

app.get('*',(req,res)=>{
    res.status(404).json({msg : "Invalid" })
})

if(process.env.NODE_ENV == "production"){
    app.use(express.static("client/build"));
}

server.listen(port,()=>{
    console.log('Server up and running on ' + port)
})


