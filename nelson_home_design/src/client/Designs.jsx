import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import placeHolder from './images/designPlaceHolder.jpg';
import bg from './images/designs_background.jpg';

const Designs = () => {
  const [designs, setDesigns] = useState([]);

  useEffect(() => {
    const getDesigns = async () => {
      try {
        const { data } = await axios.get('/blueprints');
        setDesigns(data)
      } catch (error) {
        console.error('Error fetching designs:', error);
      }
    };
    getDesigns();
  }, []);

  const handleContextMenu = (e) => e.preventDefault();

  return (
    <div id="designs" style={{overflow: 'hidden'}}>
      <div className='text-center mt-3' style={{color: '#111111'}}>
        <h2>Checkout our designs</h2>
        <p>For additional information, click on the card</p>
      </div>

      {/* Put the designs below */}
      <Container>
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
                  <Card.Title>{design.name}</Card.Title>
                  <Card.Text>{design.description}</Card.Text>
                  <Card.Text>Price: ${design.price}</Card.Text>
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