/*
 * Main client side app
 * 2022/01/23
 */

import { Routes, Route, Link } from "react-router-dom";
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import 'bootstrap/dist/css/bootstrap.min.css';
import Tests from './Tests';
import Test from './Test';
import { useParams } from "react-router-dom";


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {test: this.newTestEntry()}
        this.page = "main"
    }

    newTestEntry() {
        let test = {
            submittedDate: null,
            uid: uuidv4(),
            testName: null,
            testDate: new Date(new Date().getTime() - (new Date().getTimezoneOffset()*60*1000)).toISOString().split('T')[0],
            testNumQs: 10,
            testScore: 0,
            testAvgScore: 0,
            testTime: 0,
        }

        return test
    }

    render() {

        return (
            <div className="App">
                <h1>Welcome to React Router!</h1>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="tests" element={<Tests />} />
                    <Route path="tests/:tid" element={<Test />} />
                </Routes>
            </div>
        )
    }
}

const Home = () => {
    let params = useParams();
    return <h2>Invoice: {params.tid}</h2>;
}

export default App;
