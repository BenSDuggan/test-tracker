/*
 * Header and Nav bar
 * 2022/01/25
 */


import { Routes, Route, Link } from "react-router-dom";
import React from 'react';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const Header = () => {


    return (
        <Navbar bg="primary" variant="dark">
            <Container>
                <Link to="/"><Navbar.Brand>Test Tracker</Navbar.Brand></Link>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/dashboard" >Dashboard</Nav.Link>
                    <Nav.Link as={Link} to="/tests" >Tests</Nav.Link>
                    <Nav.Link as={Link} to="/tests/new" >+ Test</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header

