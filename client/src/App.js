import 'bootstrap/dist/css/bootstrap.min.css';
import { v4 as uuidv4 } from 'uuid';
import React, { useState, useEffect }  from 'react';
const ENDPOINT = "http://127.0.0.1:3001";


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
            <TestEntry />
        )
    }
}

function SendTest() {
    
    useEffect(() => {
        fetch("localhost:3001/api/v1/test")
          .then(res => res.json())
          .then(
            (result) => {
              console.log(result)
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              console.error(error)
            }
          )
      }, [])
}

class TestEntry extends React.Component {
    constructor(props) {
        super(props);

        fetch("api/v1/version")
        .then((response) => response.text())
        .then((responseText) => console.log(responseText))
        .catch((error) => console.error(error));


        fetch('/api/v1/test', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({"text":"Hello from client"})})
        .then((response) => response.text())
        .then((responseText) => console.log(responseText))
        .catch((error) => console.error(error));

        this.state = {
            submittedDate: null,
            uid: -1,
            testName: null,
            testDate: new Date(new Date().getTime() - (new Date().getTimezoneOffset()*60*1000)).toISOString().split('T')[0],
            testNumQs: 10,
            testScore: 0,
            testAvgScore: 0,
            testTime: 0,
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /*
    componentDidMount() {
        fetch("http://localhost:3080/api/users")
        .then(res => res.json())
        .then(
            (result) => {
            console.log(result);
            },
            (error) => {
            console.error(error);
            }
        )
    }*/

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({submittedDate:new Date().toISOString()}, 
            () => {
                console.log(this.state)
            });
        
    }

    render() {
        return (
        <div class="test-entry">
            <h2>New Test</h2>
            <form onSubmit={this.handleSubmit}>
                <div class="form-element">
                    <label>Test name: </label>
                    <input type="text" name="testName" value={this.state.testName} onChange={this.handleInputChange}/>
                </div>
                <div class="form-element">
                    <label>*Date: </label>
                    <input type="date" name="testDate" value={this.state.testDate} onChange={this.handleInputChange} require />
                </div>
                <div class="form-element">
                    <label>*Number of questions: </label>
                    <input type="number" name="testNumQs" value={this.state.testNumQs} onChange={this.handleInputChange} require />
                </div>
                <div class="form-element">
                    <label>*Your score (%): </label>
                    <input type="number" placeholder="Percent correct" name="testScore" value={this.state.testScore} onChange={this.handleInputChange} required />
                </div>
                <div class="form-element">
                    <label>*Average score (%): </label>
                    <input type="number" placeholder="Percent correct" name="testAvgScore" value={this.state.testAvgScore} onChange={this.handleInputChange} required />
                </div>
                <div class="form-element">
                    <label>Your time (minutes): </label>
                    <input type="number" name="testTime" value={this.state.testTime} onChange={this.handleInputChange} />
                </div>

                <input type="submit" value="Submit" />

                <br />
                <hr />
                <div class="form-element">
                    <label>Service: </label>
                    <input type="text"></input>
                </div>
                <div class="form-element">
                    <label>Average time (minutes): </label>
                    <input type="number"></input>
                </div>
                <div class="form-element">
                    <label>Subject: </label>
                    <input type="text"></input>
                </div>
                <div class="form-element">
                    <label>System: </label>
                    <input type="text"></input>
                </div>
                
                
            </form>
        </div>
        )}
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


export default App;
