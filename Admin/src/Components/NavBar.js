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

  const clientID = "ff84a00f-99ab-4f81-9f52-26df485a9dcf";

  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);

  function logout() {
    localStorage.removeItem('token');
    window.location.href = 'https://localhost:7085/?ClientId=' + clientID;
  }

  return (
    <>
      <Navbar id="navbar" variant="light" sticky="top">
        <Container fluid>
          <Button id='menu-collapse-button' variant="outline-dark" onClick={handleShow}>
            <i className="bi bi-list"></i>
          </Button>
          <Link to={'/'}>
            <Navbar.Brand>Navbar</Navbar.Brand>
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
          <Button id="logout" variant="danger" className="ms-2" onClick={logout}>Log-out</Button>
        </Container>
      </Navbar>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Ecommerce</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Link to={'/'} onClick={handleClose}>Home</Link><br />
          <Link to={'/profile'} onClick={handleClose}>Profile</Link>
        </Offcanvas.Body>
      </Offcanvas >
    </>
  );
}