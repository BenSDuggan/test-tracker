/*
 * Header and Nav bar
 * 2022/01/25
 */


import { Routes, Route, Link } from "react-router-dom";
import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {


    return (
        <div>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/tests">Tests</Link>
            </li>
            <li>
                <Link to="/tests/new">+ test</Link>
            </li>
        </div>
    )
}

export default Header

