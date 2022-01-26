/*
 * Specific TestEntry
 * 2022/01/23
 */

import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';


const Tests = () => {
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
            <h2>Tests:</h2>
            <table className="table table-striped">
            <thead>
            <tr>
                <th>Name</th><th>Date</th><th>Score (%)</th><th>Average score (%)</th><th># questions</th><th>Time (min)</th>
            </tr>
            </thead>
            <tbody>
            {tests.map((val, key) => {
                return (
                    <tr key={key}>
                        <td><Link to={'/tests/'+val.tid} key={val.tid}>{val.testName}</Link></td>
                        <td>{val.testDate}</td>
                        <td>{val.testScore}</td>
                        <td>{val.testAvgScore}</td>
                        <td>{val.testNumQs}</td>
                        <td>{val.testTime}</td>
                    </tr>
                )
            })}
            </tbody>
        </table>
        </Container>
    )
}

export default Tests
