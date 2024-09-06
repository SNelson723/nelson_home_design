import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import placeHolder from './images/designPlaceHolder.jpg';

const Designs = ({ designs }) => {
  const handleContextMenu = (e) => e.preventDefault();
  // console.log(designs);

  return (
    <div id="designs" style={{overflow: 'hidden'}}>
      <div className='text-center mt-3' style={{color: '#111111'}}>
        <h2>Checkout our designs</h2>
        <p>For additional information, click on the card</p>
      </div>

      <Container className='mb-3'>
        <Row xs={1} md={2} lg={3} className="g-4">
          {designs.map((design) => (
            <Col key={design.bluePrintID}>
              <Card className="card" onClick={() => console.log(design)}>
                {/* going to need the image? */}
                <div className="image-container">
                  <Image
                    src={placeHolder}
                    alt={design.name}
                    fluid
                    onContextMenu={handleContextMenu}
                    className="design-image"
                  />
                </div>
                <Card.Body style={{color: '#111111'}}>
                <div className="d-flex justify-content-center mb-2">
                  <Card.Title className='me-1'>{design.name}</Card.Title>
                  <Card.Text className="text-end ms-1"><strong>Price: ${design.price}</strong></Card.Text>
                </div>
                  <Card.Body className='d-flex justify-content-center'>
                    <Card.Text className='me-4'>Bedrooms: {design.bedrooms}</Card.Text>
                    <Card.Text className='me-4'>Bath: {design.bathrooms}</Card.Text>
                    <Card.Text className='me-4'>Sqft: {design.area}</Card.Text>
                  </Card.Body>
                  <Card.Footer className='w-75 mx-auto card-footer'>
                    <div className='text-center'>
                      Maybe click here for more info?
                    </div>
                  </Card.Footer>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Designs;