import { Button, Form, Row, Col, Container, Card, Modal } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';

const Contact = () => {
  // contact form state variables
  const [validated, setValidated] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');

  // modal state variable
  const [showModal, setShowModal] = useState(false);

  // state change handlers
  const handleInputChange = (e) => {
    if (e.target.id === 'firstName') {
      setFirstName(e.target.value);
    } else if (e.target.id === 'lastName') {
      setLastName(e.target.value);
    } else if (e.target.id === 'email') {
      setEmail(e.target.value);
    } else if (e.target.id === 'message') {
      setMessage(e.target.value);
    } else if (e.target.id === 'subject') {
      setSubject(e.target.value);
    }
  };

  // validates the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    setValidated(true);

    // any empty fields will cause an error in the database
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {

      // send the email
      try {
        const response = await axios.post('/sendEmail', {
          firstName,
          lastName,
          email,
          subject,
          message,
        });

        // set the response message
        if (response.status === 200) {
          setShowModal(true);
        }
      } catch (error) {
        console.error('Error sending email:', error)
      }
    }
  };

  const closeModal = () => {
    const form = document.getElementById('contactForm');
    form.reset();
    setValidated(false);
    setFirstName('');
    setLastName('');
    setEmail('');
    setMessage('');
    setSubject('');
    setShowModal(false);
  };

  return (
    <div id="contact" className='d-flex justify-content-center align-items-center' style={{width: '100%'}}>
      <Modal show={showModal} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Body>
        <h4>Email sent!</h4>
        <p>Thank you for contacting us. We will get back to you as soon as possible!</p>
        <Button onClick={closeModal}>Close</Button>
      </Modal.Body>
    </Modal>

      <Container className='mt-5'>
        <Row>
          <Col md={6}>
            <div>
              This will be some information/images regarding contact/responses
            </div>
          </Col>
          <Col md={6}>
            <Card className="p-4">
              <Card.Body>
                <p className="text-muted">**All fields are required</p>

                {/* Contact form */}
                <Form noValidate id="contactForm" validated={validated} onSubmit={handleSubmit}>

                  {/* First and Last name */}
                  <Row className="mb-3">
                    <Form.Group as={Col} md={6} controlId="firstName">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control required type="text" onChange={handleInputChange} value={firstName} placeholder="First"/>
                      <Form.Control.Feedback type="invalid">Please provide a first name.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md={6} controlId="lastName">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control required type="text" onChange={handleInputChange} value={lastName} placeholder="Last" />
                      <Form.Control.Feedback type="invalid">Please provide a last name.</Form.Control.Feedback>
                    </Form.Group>
                  </Row>

                  {/* Email */}
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control required type="email" onChange={handleInputChange} value={email} placeholder="Enter your email" />
                    <Form.Control.Feedback type='invalid'>Please enter a valid email</Form.Control.Feedback>
                  </Form.Group>

                  {/* Email subject */}
                  <Form.Group className="mb-3" controlId="subject">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control required type="text" onChange={handleInputChange} value={subject} placeholder="Subject" />
                    <Form.Control.Feedback type='invalid'>Please enter a subject </Form.Control.Feedback>
                  </Form.Group>

                  {/* Email message */}
                  <Form.Group className="mb-3" controlId="message">
                    <Form.Label>Message</Form.Label>
                    <Form.Control as="textarea" rows={5} required onChange={handleInputChange} value={message} placeholder='Your message here' />
                    <Form.Control.Feedback type="invalid">Message cannot be blank</Form.Control.Feedback>
                  </Form.Group>

                  {/* Submit form */}
                  <Button type="submit" className="w-100">Submit</Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Contact;