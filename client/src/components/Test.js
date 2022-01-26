/*
 * Specific TestEntry
 * 2022/01/23
 */

import React, {useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import { v4 as uuidv4 } from 'uuid';
import Container from 'react-bootstrap/Container';


const Test = () => {
    fetch("/api/v1/version")
    .then((response) => response.text())
    .then((responseText) => console.log(responseText))
    .catch((error) => console.error(error));

    let test = {
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

    const [state, setState] = useState({hi:"fail", test:test});

    let params = useParams();

    useEffect(() => {
        if(params.tid === "new") {

        }
        else {
            fetch("/api/v1/tests/"+params.tid)
            .then((response) => response.json())
            .then((responseJSON) => setState({test:responseJSON}))
            .catch((error) => console.error(error));
        }
    }, [])

    return (
    <Container className="test-entry">
        <h2>New Test</h2>
        <Container><TestForm data={state.test}/></Container>
    </Container>
    )
}

const TestForm = (test) => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const formElements = {"testName":null, "testDate":null, "testNumQs":null, "testScore":null, "testAvgScore":null, "testTime":null}

    if(test && test.data) {
        for(let k in formElements) {
            setValue(k, test.data[k]);
        }
    }

    const sendTest = (data) => {
        fetch('/api/v1/tests/'+test.tid, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(test)})
        .then((response) => response.text())
        .then((responseText) => console.log(responseText))
        .catch((error) => console.error(error));
    };

    return (
    <form onSubmit={handleSubmit(sendTest)}>
        <div className="form-row">
            <div className="form-group col-md-4">
                <label>Test name: </label>
                <div><input type="text" {...register("testName")} /></div>
            </div>
            <div className="form-group col-md-4">
                <label>*Date: </label>
                <div><input type="date" {...register("testDate", {required:true})} /></div>
            </div>
            <div className="form-group col-md-4">
                <label>Your time (minutes): </label>
                <div><input type="number" {...register("testTime")} /></div>
            </div>
        </div>

        <div className="form-row">
            <div className="form-group col-md-4">
                <label>*Number of questions: </label>
                <div><input type="number" {...register("testNumQs", {required:true})} /></div>
            </div>
            <div className="form-group col-md-4">
                <label>*Your score (%): </label>
                <div><input type="number" placeholder="Percent correct" {...register("testScore", {required:true})} /></div>
            </div>
            <div className="form-group col-md-4">
                <label>*Average score (%): </label>
                <div><input type="number" placeholder="Percent correct" {...register("testAvgScore", {required:true})} /></div>
            </div>
        </div>
        <div className="form-row">
            <div className="form-group col-md-4">
                <input type="submit" value="Submit" />
            </div>
        </div>        
        
    </form>
    )
}



const FormExample = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  setValue("exampleRequired", "fuck")

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <input defaultValue="test" {...register("example")} />
      
      {/* include validation with required or other standard HTML validation rules */}
      <input {...register("exampleRequired", { required: true })} />
      {/* errors will return when field validation fails  */}
      {errors.exampleRequired && <span>This field is required</span>}
      
      <input type="submit" />
    </form>
  );
}

export default Test
