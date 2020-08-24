const mongoose = require('mongoose');
const bookTypeSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('book_type', bookTypeSchema);