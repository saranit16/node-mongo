const express = require('express');
const router = express.Router();
const books = require('../models/books_model');
const book_type = require('../models/bookType');
// POST DATA
router.post('/', async (req, res) => {

    var book = new books({ name: req.body.name })
    try {
        books.findOne({ name: req.body.name }, function (err, exist) {
            if (err) throw err;
            if (exist === null) {
                var finalSave = book.save();
                res.status(200).send({ status: '200', message: 'data saved successfully' });
            } else {
                res.status(200).send({ status: '400', message: `duplicate name ${req.body.name}` });
            }
        })
    } catch (err) {
        res.send(err.message);
    }
});
// GET ALL DATA
router.get('/', (req, res) => {
    try {
        var booksInfo = books.find().exec((err, data) => {
            if (err) throw err;
            res.send(data);
        })
    }
    catch (err) {
        res.send('err' + err.message);
    }

});
// GET PARTICULAR ROW DATA
router.get('/:id', async (req, res) => {
    var id = req.params.id;
    try {
        var getBooks = await books.findById(id);
        res.send({ status: 200, data: getBooks });
    } catch (e) {
        res.send({ status: 400, message: e.message });
    }
});
// UPDATE DATA
router.patch('/:id', async (req, res) => {
    var id = req.params.id;
    var bookname = req.body.name;
    try {
        const allBooks = await books.findById(id);
        allBooks.name = bookname;
        var updateStatus = await allBooks.save();
        res.send({ status: 200, data: updateStatus });

    } catch (err) {
        res.send({ status: 400, message: err.message });
    }

});

router.get("/:join/:test",(req,res)=>{

 books.aggregate([{

$lookup:{
    from:"book_type",
    localField:"book_type_id",
    foreignField:"id",
    as:"books",
    }
}]).exec((err,data) => {
if(err) throw err;
//console.log(data);
res.send(data);


})


});

module.exports = router;  