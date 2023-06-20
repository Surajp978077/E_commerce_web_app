import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import logo from '../../assets/images/profile.png';

export default function Cards(props) {
  return (
    <Container className='d-flex justify-content-center align-items-center'>
      <Card className='my-4' style={{ backgroundColor: '#f5f5f5' }}>
        <Card.Img style={{ width: '222px', height: 'auto', margin: '2% auto' }} src={logo} />
        <Card.Body className='text-center' style={{ backgroundColor: '#333', color: '#fff' }}>
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
