import axios from "axios";
import img1 from '../pictures/p1.png'
import img2 from '../pictures/p2.png'

const FileDownload = require('js-file-download');

function Book(props) {

    const bookClick = (id) => {
        window.location.href = 'http://localhost:3000/' + id
    }

    const adminDownload = () => {
        axios({
          url: `http://localhost:4000/download/${props.bookObj._id}`,
          method: 'GET',
          headers: {
            "x-trusted": "yes"
          }
        })
        .then(function(res){
          FileDownload(res.data , `${props.bookObj.pdf}`)
        })
        .catch(function(err){
          console.log(err)
        })
    }

    return (
        <div className="Book">
            <div className="imgDiv">
                <img src={`http://localhost:4000/static/${props.bookObj.coverImg}`}
                     onClick={() => {bookClick(props.bookObj._id);}} 
                />
                <div> <a href={`http://localhost:4000/static/${props.bookObj.pdf}#toolbar=0`}> اقرأ الوثيقة </a> </div>
            </div>

            <div className="infoDiv">
                <div className="tit" onClick={() => {bookClick(props.bookObj._id);}}> {props.bookObj.title} </div>

                <div className="container">
                    <div className="col1">
                        <div className="a"> <span>{props.bookObj.authors}</span>  تأليف </div>
                        <div className="b"> <span>{props.bookObj.publisherName}</span> الناشر </div>
                        <div className="c"> المواضيع الرئيسية {props.bookObj.subjects.map( sub => <span>{sub+'-'}</span>
                                                                                     )} 
                        </div>
                    </div>

                    <div className="col2">
                    <span>{props.bookObj.publicationYear}</span> تاريخ النشر
                    </div>
                </div>
            </div>

            <div className="icons">
                <div className="ketab"> كتاب </div>
                <div onClick={adminDownload}> <img src={img1}/> </div>
                <a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse"> <img src={img2}/> </a>
            </div>
        </div>
    )
}

export default Book;