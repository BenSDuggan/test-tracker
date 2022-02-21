/*
 * Specific TestEntry
 * 2022/01/23
 */

import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';


const Dashboard = () => {
    const [tests, setTests] = useState([]);

    fetch("/api/v1/version")
    .then((response) => response.text())
    .then((responseText) => console.log(responseText))
    .catch((error) => console.error(error));

    useEffect(() => {
        fetch("/api/v1/tests")
        .then((response) => response.json())
        .then((responseJSON) => {
            console.log(responseJSON)
            let data = [];
            for(let t in responseJSON) {
                data.push(responseJSON[t]);
            }

            setTests(data);
        })
        .catch((error) => console.error(error));
    }, []);

    return (
        <Container>
            <h2>Dashboard:</h2>
            
        </Container>
    )
}


const LineGraph = (data, x, y) => {

    return (
        <div>
            
        </div>
    )
}


export default Dashboard
