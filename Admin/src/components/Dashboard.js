import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <Container fluid className='mt-5 w-75'>
            <Row>
                <Col md={4} className='mb-4'>
                    <Link to={'/user'} style={{ textDecoration: 'none' }}>
                        <Card>
                            <Card.Header>User</Card.Header>
                            <Card.Body>
                                This is the content for User.
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
                <Col md={4} className='mb-4'>
                    <Link to={'/vendor'} style={{ textDecoration: 'none' }}>
                        <Card>
                            <Card.Header>Vendor</Card.Header>
                            <Card.Body>
                                This is the content for Vendor.
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
                <Col md={4} className='mb-4'>
                    <Link to={'/category'} style={{ textDecoration: 'none' }}>
                        <Card>
                            <Card.Header>Category</Card.Header>
                            <Card.Body>
                                This is the content for Category.
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col md={4} className='mb-4'>
                    <Link to={'/product'} style={{ textDecoration: 'none' }}>
                        <Card>
                            <Card.Header>Product</Card.Header>
                            <Card.Body>
                                This is the content for Product.
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
                <Col md={4} className='mb-4'>
                    <Link to={'/order'} style={{ textDecoration: 'none' }}>
                        <Card>
                            <Card.Header>Order</Card.Header>
                            <Card.Body>
                                This is the content for Order.
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
                <Col md={4} className='mb-4'>
                    <Link to={'/offer'} style={{ textDecoration: 'none' }}>
                        <Card>
                            <Card.Header>Offer</Card.Header>
                            <Card.Body>
                                This is the content for Offer.
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
            </Row>
        </Container>
    );
}

export default Dashboard;