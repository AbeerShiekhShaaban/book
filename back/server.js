const exp = require('express');
const mongose = require('mongoose');
const bookModel = require('./model-DB');
const parseBody = require('body-parser');
const cors = require('cors');
const multer = require('multer');

mongose.set("strictQuery", false);
mongose.connect('mongodb://127.0.0.1/boDB'); //https://www.mongodb.com/community/forums/t/mongooseserverselectionerror-connect-econnrefused-127-0-0-1-27017/123421
mongose.Promise = global.Promise;
mongose.connection.once('open' , function(){console.log("DB is connected")})
       .on('error' , function(err){console.log("error:" , err)});

const app = exp();

app.use(parseBody.urlencoded({extended: false}));
app.use(parseBody.json());
app.use(cors({origin:'http://localhost:3000'}));
app.use('/static', exp.static('public'))

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if(file.fieldname == 'f1'){
        cb(null, './public/images')
      } 
      else{
        cb(null, './public/pdf')
      }
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
  const upload = multer({ storage: storage });

app.post('/add' , upload.fields([{name: 'f1'} , {name: 'f2'}]) ,                         
function(req , res){
    //console.log(req)
    //console.log(req.body);
    //console.log(req.body.bookAuthors);
    //console.log(req.files);
    let subjectsArr = [];
    if(req.body.sub1) {subjectsArr.push(req.body.sub1)}
    if(req.body.sub2) {subjectsArr.push(req.body.sub2)}
    if(req.body.sub3) {subjectsArr.push(req.body.sub3)}

    const dbBook = {title: req.body.bookTitle ,
        authors: req.body.bookAuthors ,
        subjects: subjectsArr ,
        publicationYear: req.body.bookYear  ,
        publisherName: req.body.publisherName ,
        coverImg: 'images/' + req.files.f1[0].originalname ,
        pdf: 'pdf/' + req.files.f2[0].originalname
    };
    //console.log(dbBook)
    bookModel.create(dbBook).then(function(result){ console.log(result) });

    res.end();
});

// get books
app.get('/' , function(req , res){
  if(req.query.title) {
    bookModel.find({ $text: { $search: req.query.title } } , function(err , docs){
      console.log('search');
      console.log(err);
      res.json(docs)
    })
  }
  else {
    bookModel.find({} , function(err , docs){
      console.log('all');
      console.log(err);
      res.json(docs)
    })
  }
})

app.get('/filter' , function(req , res) {
  let subjectsArr = [];
  if(req.query.sub1) {subjectsArr.push(req.query.sub1)}
  if(req.query.sub2) {subjectsArr.push(req.query.sub2)}
  if(req.query.sub3) {subjectsArr.push(req.query.sub3)}
  bookModel.find({subjects: {$all: subjectsArr}} , function(err , books){
    res.json(books)
  })
})

app.get('/:id' , function(req , res){
  bookModel.findOne({_id: req.params.id} , function(err , book){
        console.log('ww')
        console.log(err);
        console.log(book)
    res.json(book)
  })
})

const validate = function(req , res , next) {
  if(req.headers["x-trusted"] == "yes") {
    next();
  }
  else{
    console.log('headers')
    res.json({error: "You can not download just admin"})
  }
}

app.get('/download/:idDoc' , validate , function(req , res) {
  bookModel.findOne({_id: req.params.idDoc} , function(err , book){
    console.log('err' , err)
    console.log(req.headers["x-trusted"])
    res.download(`./public/${book.pdf}` , function(error) {
      console.log('oooooo')
      if(error) {
        console.log(error);
      }
    });
  })
})

app.listen(process.env.port || 4000 , function(){
    console.log("express app is ready");
});