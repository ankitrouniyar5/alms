const mongoose = require('mongoose');

mongoose.connect(process.env.MDB_CONNECT,{useNewUrlParser: true, useUnifiedTopology: true ,useFindAndModify: false })
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connection to db established")
});
