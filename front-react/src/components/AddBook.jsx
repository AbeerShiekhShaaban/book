import React, {useState} from 'react';
import axios from 'axios';

function AddBook() {
    const [book , setBook] = useState({bookTitle:'' , bookAuthors:'' , sub1:'' , sub2:'' , sub3:'' , bookYear:'' , publisherName:''});
    const [img , setImg] = useState();
    const [pdf , setPDF] = useState();

    const onChange = e => {
        const bookk = {...book};
        bookk[e.currentTarget.name] = e.currentTarget.value;
        setBook(bookk);
    }

    const onImgChange = e => {
        console.log(e.target.files[0]);
        setImg(e.target.files[0]);
    }

    const onPdfChange = e => {
        console.log(e.target.files[0]);
        setPDF(e.target.files[0]);
    }

    const onChangeFirstSubject = e => {
        const bookObj1 = {...book};
        if(e.currentTarget.checked) {
            bookObj1.sub1 = e.currentTarget.value
            setBook(bookObj1)
        }
        else {
            bookObj1.sub1 = ''
            setBook(bookObj1)
        }
    }

    const onChangeSecondSubject = e => {
        const bookObj2 = {...book};
        if(e.currentTarget.checked) {
            bookObj2.sub2 = e.currentTarget.value
            setBook(bookObj2)
        }
        else {
            bookObj2.sub2 = ''
            setBook(bookObj2)
        }
    }

    const onChangeThirdSubject = e => {
        const bookObj3 = {...book};
        if(e.currentTarget.checked) {
            bookObj3.sub3 = e.currentTarget.value
            setBook(bookObj3)
        }
        else {
            bookObj3.sub3 = ''
            setBook(bookObj3)
        }
    }

    const addButton = () => {
        let data = new FormData();
        data.append('f1' , img);
        data.append('f2' , pdf);

        for(let key in book){
            data.append(key , book[key]);
        }
        //console.log(Array.from(data));
        axios.post('http://localhost:4000/add' , data)
                    .then(function(res) {
                        console.log(res);
                        console.log("yes");
                        //alert("why");
                        window.location.href = 'http://localhost:3000/';
                    })
                    .catch(function(err) {
                        console.log(err);
                        console.log("no");
                        alert("fail");
                    });
    }

    return (
        <div className='formContainer'>     
            <label htmlFor="title"> Title </label>
            <input type="text" id="title" name="bookTitle" onChange={onChange} maxLength="30" dir="rtl" className='m'/>          
                    
            <label htmlFor="authors"> Author </label>
            <input type="text" id="authors" name="bookAuthors" onChange={onChange} dir="rtl" className='m'/> 

            <br/><br/>
            <input type="checkbox" id="s1" name="sub1" value="الموضوع الأول" onChange={onChangeFirstSubject}/>
            <label htmlFor="s1"> First Subject </label><br/>
            <input type="checkbox" id="s2" name="sub2" value="الموضوع الثاني" onChange={onChangeSecondSubject}/>
            <label htmlFor="s2"> Second Subject </label><br/>
            <input type="checkbox" id="s3" name="sub3" value="الموضوع الثالث" onChange={onChangeThirdSubject}/>
            <label htmlFor="s3"> Third Subject </label>
            <br/><br/><br/>                     

            <label htmlFor="year"> Year of Publication  </label>
            <input type="text" id="year" name="bookYear" onChange={onChange} dir="rtl" className='m'/> 

            <label htmlFor="publisher"> Publisher Name  </label>
            <input type="text" id="publisher" name="publisherName" onChange={onChange} dir="rtl" className='m'/> 

            <label htmlFor="imgFilee">Select an image:</label>
            <input type="file" id="imgFilee" name='pic' onChange={onImgChange} accept="image/*" ></input> 

            <label htmlFor="pdfFilee">Select a pdf:</label>
            <input type="file" id="pdfFilee" name='pdf' onChange={onPdfChange} accept="application/pdf"></input> <br/><br/>
                                      
            <button onClick={addButton}> Add </button>      
        </div>
    )
}

export default AddBook;