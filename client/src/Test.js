/*
 * Specific TestEntry
 * 2022/01/23
 */

import 'bootstrap/dist/css/bootstrap.min.css';
import { v4 as uuidv4 } from 'uuid';
import React, {useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
const ENDPOINT = "http://127.0.0.1:3001";


const Test = () => {
    const defaultTest = {
        id:uuidv4(),
        tid: Date.now(),
        submittedDate: null,
        uid: -1,
        testName: "",
        testDate: new Date(new Date().getTime() - (new Date().getTimezoneOffset()*60*1000)).toISOString().split('T')[0],
        testNumQs: 10,
        testScore: 0,
        testAvgScore: 0,
        testTime: 0,
    }

    const [state, setState] = useState({test:defaultTest});
    let params = useParams();

    //let params = {tid:1642692001829};

    fetch("/api/v1/version")
    .then((response) => response.text())
    .then((responseText) => console.log(responseText))
    .catch((error) => console.error(error));
    

    /*
    if(params.tid) {
        fetch("/api/v1/tests/"+params.tid)
        .then((response) => response.json())
        .then((responseJSON) => setState(responseJSON))
        .catch((error) => console.error(error));
    }
    */

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setState({test:{[name]:value}})
        
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        /*
        setState({submittedDate:new Date().toISOString()}, 
            () => {
                console.log(state);

                fetch('/api/v1/tests/'+state.tid, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                      },
                    body: JSON.stringify(state)})
                .then((response) => response.text())
                .then((responseText) => console.log(responseText))
                .catch((error) => console.error(error));
            });
            */
    }
    
    setState({handleInputChange:handleInputChange})
    
    return (
        <div className="test-entry">
            <h2>New Test</h2>
            <TestForm test={state.test} />
        </div>
    )
}

const TestForm = (props) => {
    props = props.test;
    

    return (
        <div>hi</div>
    )
}

class QuestionEntry extends React.Component {
    
    render() {
        return (
        <div class="form-element text-entry-question">
            <hr />
            <h3>{"Q"+this.props.qid}</h3>

            <div class="form-element">
                <label>Correct? </label>
                <input type="checkbox"></input>
            </div>
            <div class="form-element">
                <label>% correct: </label>
                <input type="number"></input>
            </div>
            <div class="form-element">
                <label>Time spent (seconds): </label>
                <input type="number"></input>
            </div>
            <div class="form-element">
                <label>ID: </label>
                <input type="text"></input>
            </div>
            <div class="form-element">
                <label>Subject: </label>
                <input type="text"></input>
            </div>
            <div class="form-element">
                <label>Systems: </label>
                <input type="text"></input>
            </div>
            <div class="form-element">
                <label>Categories: </label>
                <input type="text"></input>
            </div>
            <div class="form-element">
                <label>Topics: </label>
                <input type="text"></input>
            </div>
        </div>
        )
    }
}

export default Test;
