const mongose = require('mongoose');

const BookSchema = new mongose.Schema({
    title:  {type: String , required: true , trim: true , text: true},
    authors: {type: String , trim: true},
    subjects: [String],
    publicationYear: {type: String},
    publisherName: {type: String},
    coverImg: {type: String , required: true , trim: true},
    pdf: {type: String , required: true , trim: true}
});

const Book = mongose.model('book' , BookSchema);
module.exports = Book;

