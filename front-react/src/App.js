import React, {useState , useEffect} from 'react';
import {Route , Routes} from "react-router-dom"; 
import axios from 'axios';
import AddBook from "./components/AddBook";
import AllBooks from "./components/AllBooks";
import DisplayBook from './components/DisplayBook';


function App() {             
  return (
    <div className="App">
      <Routes>
        <Route path={"/addBook"} element={<AddBook />} />
        <Route path={"/"} element={<AllBooks />} />
        <Route path={"/:bookId"} element={<DisplayBook />} />
      </Routes>
    </div>
  );
}

export default App;
