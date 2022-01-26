/*
 * Main client side app
 * 2022/01/25
 */

import { Routes, Route, Link } from "react-router-dom";
import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Tests from './components/Tests';
import Test from './components/Test';
import { useParams } from "react-router-dom";


const App = () => {
    

    return (
        <div className="App">
            <Header />
            
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="tests" element={<Tests />} />
                <Route path="tests/:tid" element={<Test />} />
            </Routes>
        </div>
    )
}

const Home = () => {
    let params = useParams();
    return <h2>Invoice: {params.tid}</h2>;
}

export default App;
