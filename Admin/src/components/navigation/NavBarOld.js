import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { UserInfoContext } from '../userInfo/UserInfoContext';
import { LOGINPAGE } from '../../config/config';

const NavBar = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { userInfo } = useContext(UserInfoContext);

  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = LOGINPAGE;
  }

  return (
    <>
      <Navbar style={{ backgroundColor: '#b0b0b5' }} variant='light' sticky='top'>
        <Container fluid>
          <Button variant='outline-dark' onClick={handleShow} className='me-2'>
            <i className='bi bi-list'></i>
          </Button>
          <Link to='/' style={{ textDecoration: 'none' }}>
            <Navbar.Brand>Dashboard</Navbar.Brand>
          </Link>
          <Nav className='me-auto'>
            {/* <Nav.Link href='#features'>Features</Nav.Link> */}
          </Nav>
          <NavLink to='/profile' className='me-2'>
            <Button variant='outline-success'>{userInfo.UserName}</Button>
          </NavLink>
          <Form className='d-flex'>
            <Form.Control type='search' placeholder='Search' className='me-2' aria-label='Search' />
            <Button variant='outline-success'>Search</Button>
          </Form>
          <Button variant='danger' className='ms-2' onClick={logout}>Log-out</Button>
        </Container>
      </Navbar>
      <Offcanvas style={{ background: 'linear-gradient(#2e005f, #4e0353)' }} show={show} onHide={handleClose}>
        <Offcanvas.Header style={{ color: '#ffffff', backgroundColor: '#0f0f3d', height: '3.5rem' }} closeButton>
          <Offcanvas.Title>Ecommerce</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Link to='/' onClick={handleClose}><Button variant='light' >Dashboard</Button></Link><br />
          <NavLink to='/profile' onClick={handleClose}><Button variant='light' className='mt-3'>Profile</Button></NavLink>
        </Offcanvas.Body>
      </Offcanvas >
    </>
  );
}

export default NavBar;