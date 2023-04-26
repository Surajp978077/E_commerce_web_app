import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

export default function NavBar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const clientID = "b6782e13-5669-4156-82a8-1850883214e4";

  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);

  function logout() {
    localStorage.removeItem('token');
    window.location.href = 'https://localhost:7085/?ClientId=' + clientID;
  }

  return (
    <>
      <Navbar style={{ backgroundColor: '#b0b0b5' }} variant="light" sticky="top">
        <Container fluid>
          <Button variant="outline-dark" onClick={handleShow} className='me-2'>
            <i className="bi bi-list"></i>
          </Button>
          <Link to={'/'} style={{ textDecoration: 'none' }}>
            <Navbar.Brand>Dashboard</Navbar.Brand>
          </Link>
          <Nav className="me-auto">
            {/* <Nav.Link href="#features">Features</Nav.Link> */}
          </Nav>
          <Link to={'/profile'}>
            <Button variant="outline-success" className="me-2">{decodedToken.UserName}</Button>
          </Link>
          <Form className="d-flex">
            <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" />
            <Button variant="outline-success">Search</Button>
          </Form>
          <Button variant="danger" className="ms-2" onClick={logout}>Log-out</Button>
        </Container>
      </Navbar>
      <Offcanvas style={{ background: 'linear-gradient(#2e005f, #4e0353)' }} show={show} onHide={handleClose}>
        <Offcanvas.Header style={{ color: '#ffffff', backgroundColor: '#0f0f3d', height: '3.5rem' }} closeButton>
          <Offcanvas.Title>Ecommerce</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Link to={'/'} onClick={handleClose}><Button variant="light" >Dashboard</Button></Link><br />
          <Link to={'/profile'} onClick={handleClose}><Button variant="light" className='mt-3'>Profile</Button></Link>
        </Offcanvas.Body>
      </Offcanvas >
    </>
  );
}