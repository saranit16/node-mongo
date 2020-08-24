const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const port = 9000;
const mongoose = require('mongoose');
app.use(bodyparser.json());
const booksRouter = require('./router/books');
// NAME CAN BE ANY THING BOOK OR BOOKS OR PEN ANY THING U CAN GIVE IT 
app.use('/books',booksRouter);
const url = 'mongodb://127.0.0.1:27017/author';
mongoose.connect(url, { useNewUrlParser: true , useUnifiedTopology: true })
const con = mongoose.connection;
con.on('open',()=>{
    console.log('mongo db connected...');
})

app.listen(port,function(){  console.log('server running at', port)  });    
