<<<<<<< HEAD
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import logo from '../images/profilePic.png';
=======
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import logo from '../profilePic.png';
>>>>>>> 11ce597e3b6138237ca770e45a6159baa8f6d6c0

export default function Cards(props) {
  console.log(props)
  console.log(props.Name);
  console.log(props.Bio);
  return (
<<<<<<< HEAD
    <Container className="d-flex justify-content-center align-items-center">
      <Card className="w-25 my-2">
=======
    <Container className="vh-80 d-flex justify-content-center align-items-center">
      <Card className="w-50">
>>>>>>> 11ce597e3b6138237ca770e45a6159baa8f6d6c0
        <Card.Img variant="top" src={logo} />
        <Card.Body className="text-center">
          <Card.Title>{props.Name}</Card.Title>
          <Card.Text>{props.Email}</Card.Text>
          <Card.Text>{props.Street}</Card.Text>
          <Card.Text>{props.State}</Card.Text>
          <Card.Text>{props.Pincode}</Card.Text>
<<<<<<< HEAD
=======
          <Button variant="primary">Go somewhere</Button>
>>>>>>> 11ce597e3b6138237ca770e45a6159baa8f6d6c0
        </Card.Body>
      </Card>
    </Container>
  );
}