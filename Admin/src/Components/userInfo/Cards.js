import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import logo from '../../images/profilePic.png';

export default function Cards(props) {
  console.log(props)
  console.log(props.Name);
  console.log(props.Bio);
  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Card className="w-25 my-2">
        <Card.Img variant="top" src={logo} />
        <Card.Body className="text-center">
          <Card.Title>{props.Name}</Card.Title>
          <Card.Text>Email: {props.Email}</Card.Text>
          <Card.Text>Street: {props.Street}</Card.Text>
          <Card.Text>State: {props.State}</Card.Text>
          <Card.Text>Pincode: {props.Pincode}</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}