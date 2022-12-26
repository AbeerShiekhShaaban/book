import React, {useState , useEffect} from 'react';
import axios from 'axios'
import { Link } from "react-router-dom";
import Book from "./Book";
import img3 from '../pictures/main.png'

function AllBooks() {
    const [allBooks , setAllBooks] = useState([]);
    const [titSearch , setTitSearch] = useState('');

    const [subject1 , setSubject1] = useState('');
    const [subject2 , setSubject2] = useState('');
    const [subject3 , setSubject3] = useState('');

    useEffect(() => {
        axios({
          url: 'http://localhost:4000/',
          method: 'GET',
        })
        .then(function(res){
          //console.log(res)
          const all = [...res.data].reverse()
          setAllBooks(all)
        })
        .catch(function(err){
          console.log(err)
        })
    } , [])

    const onChangeTitleSearch = e => {
        setTitSearch(e.currentTarget.value);
        console.log(titSearch)
    }

    const search = () => {
        let searchURL = `?title=`
        if(titSearch) {
            searchURL = `?title=${titSearch}`
        }
        
        axios
        .get(`http://localhost:4000/${searchURL}`)
        .then(function(res){
            //console.log(res)
            const s = [...res.data]
            setAllBooks(s)
        })
        .catch(function(err){
            console.log(err)
        }) 
    }
/***************************************************** */
    const onChangeSubject1 = e => {
        if(e.currentTarget.checked) {
            setSubject1(e.currentTarget.value)
        }
        else {
            setSubject1('')
        }
    }

    const onChangeSubject2 = e => {
        if(e.currentTarget.checked) {
            setSubject2(e.currentTarget.value)
        }
        else {
            setSubject2('')
        }
    }

    const onChangeSubject3 = e => {
        if(e.currentTarget.checked) {
            setSubject3(e.currentTarget.value)
        }
        else {
            setSubject3('')
        }
    }

    const filterButton = () => {
        let filterURL = `?sub1=${subject1}&sub2=${subject2}&sub3=${subject3}`;
        axios
        .get(`http://localhost:4000/filter/${filterURL}`)
        .then(function(res){
        console.log(res)
        const s = [...res.data]
        setAllBooks(s)
        })
        .catch(function(err){
        console.log(err)
        })
    }

    return (
        <div className="main">
            <div className="header">
                <img src={img3}/>
                
            </div>
            <Link to="/AddBook"> <button className='addButton'>  Add Book </button> </Link>

            <div className='searchByTitle'>
                <div>   
                    <div onClick={search} className="button"><i className="fa fa-search"></i></div>
                    <input type="text" placeholder=" بـحـث ..." dir="rtl" onChange={onChangeTitleSearch} className="input"/>
                    <p className="span"> بحث حسب العنوان  </p>
                </div>
            </div>

            <div className="mainChild">
                <div className="side">
                    <label htmlFor="t1"> الموضوع الأول </label>
                    <input type="checkbox" id="t1" name="first" value="الموضوع الأول" onChange={onChangeSubject1}/>
                    <br/><br/>
                    <label htmlFor="t2"> الموضوع الثاني </label>
                    <input type="checkbox" id="t2" name="second" value="الموضوع الثاني" onChange={onChangeSubject2}/>
                    <br/><br/>
                    <label htmlFor="t3"> الموضوع الثالث </label>
                    <input type="checkbox" id="t3" name="third" value="الموضوع الثالث" onChange={onChangeSubject3}/>
                    <br/><br/><br/><br/>
                    <button onClick={filterButton}> تصفية وفق الموضوع </button>
                </div>
                <div className="booksContainer">{allBooks.map( book => <Book 
                                                                            key={book._id} 
                                                                            bookObj={book} 
                                                                                />)}
                </div>                
            </div>
        </div>
    )
}

export default AllBooks;