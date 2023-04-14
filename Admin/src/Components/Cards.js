import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import logo from '../profilePic.png';

export default function Cards(props) {
  console.log(props)
  console.log(props.Name);
  console.log(props.Bio);
  return (
    <Container className="vh-80 d-flex justify-content-center align-items-center">
      <Card className="w-50">
        <Card.Img variant="top" src={logo} />
        <Card.Body className="text-center">
          <Card.Title>{props.Name}</Card.Title>
          <Card.Text>{props.Email}</Card.Text>
          <Card.Text>{props.Street}</Card.Text>
          <Card.Text>{props.State}</Card.Text>
          <Card.Text>{props.Pincode}</Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </Container>
  );
}