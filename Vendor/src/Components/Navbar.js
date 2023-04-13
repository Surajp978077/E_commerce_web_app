import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';


export default function Menu() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>


            <Navbar id="navbar" variant="light" sticky="top" >
                <Container fluid>
                    <Button id='menu-collapse-button' variant="outline-dark" onClick={handleShow}>
                        <i class="bi bi-list"></i>
                    </Button>
                    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#features">Features</Nav.Link>


                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                    <Button className='ms-3' variant="danger">Log-out</Button>
                </Container>
            </Navbar>


            <Offcanvas style={{ background: 'linear-gradient(#2e005f, #4e0353)', opacity: 2 }} show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    Ecommerce
                </Offcanvas.Header>
                <Offcanvas.Body>
                    Some text as placeholder. In real life you can have the elements you
                    have chosen. Like, text, images, lists, etc.
                </Offcanvas.Body>
            </Offcanvas >
        </>
    );
}

