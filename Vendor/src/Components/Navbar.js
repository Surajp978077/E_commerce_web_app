import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { LOGINPAGE } from "../config/config";

export default function NavBar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  var token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);

  function logout() {
    localStorage.removeItem("token");
    window.location.href = LOGINPAGE;
  }

  return (
    <>
      <Navbar id="navbar" variant="light" sticky="top">
        <Container fluid>
          <Button
            id="menu-collapse-button"
            variant="outline-dark"
            onClick={handleShow}
          >
            <i className="bi bi-list"></i>
          </Button>
          <Link to={"/"} style={{ textDecoration: "none" }}>
            <Navbar.Brand
              onMouseOver={(e) => (e.target.style.color = "blue")}
              onMouseOut={(e) => (e.target.style.color = "black")}
            >
              {" "}
              E-commerce{" "}
            </Navbar.Brand>
          </Link>
          <Nav className="me-auto">
            {/* <Nav.Link href="#features">Features</Nav.Link> */}
          </Nav>
          <Link to={"/Profile"}>
            <Button variant="outline-success me-2">
              Welcome, {decodedToken.UserName}
            </Button>
          </Link>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          <Button className="ms-3" variant="danger" onClick={logout}>
            Log-out
          </Button>
        </Container>
      </Navbar>

      <Offcanvas
        style={{ background: "linear-gradient(#2e005f, #4e0353)" }}
        show={show}
        onHide={handleClose}
      >
        <Offcanvas.Header closeButton>Ecommerce</Offcanvas.Header>
        <Offcanvas.Body>
          <Link to={"/"} onClick={handleClose}>
            <Button variant="light">Home</Button>
          </Link>
          <br />
          <Link to={"/Profile"} onClick={handleClose}>
            <Button variant="light" className="mt-3">
              Profile
            </Button>
          </Link>
          <br />
          <Link to={"/Listings"} onClick={handleClose}>
            <Button variant="light" className="mt-3">
              Listings
            </Button>
          </Link>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
