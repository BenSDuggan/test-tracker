/*
 * Main client side app
 * 2022/01/25
 */

import React from 'react';
import { Routes, Route, useParams } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';

import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Tests from './components/Tests';
import Test from './components/Test';



const App = () => {
    

    return (
        <div className="App">
            <Header />
            
            <Container>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/tests" element={<Tests />} />
                    <Route path="/tests/:tid" element={<Test />} />
                </Routes>
            </Container>
        </div>
    )
}

const Home = () => {
    return <h2>Home page</h2>;
}

export default App;
