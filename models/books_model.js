const mongoose = require('mongoose');
const booksSchema = new mongoose.Schema({
    
    name: {
        type:String,
        required:true,

    },
    book_type_id:{
        type:Number,
        //required:true,

    }
   

})
module.exports = mongoose.model('books',booksSchema);

