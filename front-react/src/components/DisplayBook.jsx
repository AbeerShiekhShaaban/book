import { useState , useEffect } from "react";
import axios from "axios";
import { Link , useParams } from "react-router-dom";
import img4 from '../pictures/headerId.png'

const FileDownload = require('js-file-download');

function DisplayBook() {
    const {bookId} = useParams()
    const [bookInfo , setBookInfo] = useState({_id:'' , title: '' , authors:'' , subjects:[] , publicationYear:'' , publisherName:''})


    useEffect(() => {
        axios
        .get(`http://localhost:4000/${bookId}`)
        .then(function(res){
          //console.log(typeof(bookId))
          //console.log(res.data)
          const info = {...res.data}
          console.log(info)
          setBookInfo(info)
          console.log(bookInfo) //https://www.learnbestcoding.com/post/54/react-usestate-set-does-not-reflect-immediately
        })
        .catch(function(err){
          console.log(err)
        })
      } , [bookId])

    const admin = () => {
      axios({
        url: `http://localhost:4000/download/${bookInfo._id}`,
        method: 'GET',
        headers: {
          "x-trusted": "yes"
        }
      })
      .then(function(res){
        console.log('load')
        console.log(bookInfo._id)
        FileDownload(res.data , `${bookInfo.pdf}`)
      })
      .catch(function(err){
        console.log(err)
      })
    }

    return (
      <div className="bookDis">
        <div className="headerDisplayBook"><img src={img4}/></div>
        <div className="headerDisplayBook22"> تفاصيل الكتاب </div>
        <div className="home">
          <div className="homeChild"> <Link to="/" className="link"> الرئيسية </Link> </div> 
        </div>

        <div className="DisplayBook">
          <div className="imgDiv">
              <img src={`http://localhost:4000/static/${bookInfo.coverImg}`}/>
          </div>

          <div className="infoDiv">
              <div className="ketab">  <div className="e"> كتاب </div> </div>
              <div className="tit"> {bookInfo.title} </div>                
              <div className="a"> <span>{bookInfo.authors}</span>  تأليف </div>
              <div className="b"> <span>{bookInfo.publisherName}</span> الناشر </div>
              <div className="c">      المواضيع الرئيسية {bookInfo.subjects.map( sub => <span key={sub+Date.now()}>{sub+'-'}</span> )}   
              </div>
                  
              <div className="d">
                <span>{bookInfo.publicationYear}</span> تاريخ النشر
              </div>

              <div className="bu">
                <a href={`http://localhost:4000/static/${bookInfo.pdf}#toolbar=0`}>  اقرأ الوثيقة </a>  
                <a onClick={admin}>  تحميل  </a>   
                <a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse"> مشاركة </a> 
              </div>            
          </div>  
      </div>
      </div>
    )
}

export default DisplayBook;