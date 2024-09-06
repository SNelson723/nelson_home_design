import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Image, Button } from 'react-bootstrap';
import placeHolder from './images/designPlaceHolder.jpg';

const Designs = ({ designs }) => {
  const handleContextMenu = (e) => e.preventDefault();
  const [beds, setBeds] = useState(0);
  const [baths, setBaths] = useState(0);
  // console.log(designs);

  console.log(beds, baths)

  return (
    <div id="designs" style={{overflow: 'hidden'}}>
      <div className='text-center mt-3' style={{color: '#111111'}}>
        <h2>Checkout our designs</h2>
        <p>For additional information, click on the card</p>
      </div>

      <div className="filter-container d-flex align-items-center justify-content-center">
        <div className="me-4 d-flex">
          <label className='d-block form-label' htmlFor="bedrooms">Bedrooms:</label>
          <select id="bedrooms" className="form-select" onChange={() => setBeds(e.target.value)}>
            <option value="">Any</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
        <div className="me-4">
          <label className='d-block' htmlFor="bathrooms">Bathrooms:</label>
          <select id="bathrooms" className="form-select" onChange={setBaths(e.target.value)}>
            <option value="">Any</option>
            <option value="1">1+</option>
            <option value="1.5">1.5+</option>
            <option value="2">2+</option>
            <option value="2.5">2.5+</option>
          </select>
        </div>
        <Button className="btn btn-primary">Apply Filters</Button>
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
                  <Card.Footer className='w-75 mx-auto rounded-3 card-footer'>
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