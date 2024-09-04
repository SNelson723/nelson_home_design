import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div id='navBar'>
      <Navbar bg="dark" data-bs-theme="dark" className='h-100'>
        <Container>
          <Navbar.Brand as="span" to="/home">Nelson Design</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" id="homeLink">Home</Nav.Link>
            <Nav.Link as={Link} to="/designs" id="desingsLink">Designs</Nav.Link>
            <Nav.Link as={Link} to="/about" id="aboutLink">About</Nav.Link>
            <Nav.Link as={Link} to="/contact" id="contactLink">Contact</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;