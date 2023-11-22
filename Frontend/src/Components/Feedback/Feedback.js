import React, { useState, useEffect } from 'react';
import { Modal, Form, Card } from 'react-bootstrap';
import ApiService from "../../middleware/ApiService";
import { toast } from 'react-toastify';
import FeedbackIcon from '../../images/FeedbackIcon.png';
import Loader from '../Global/Loader/Loader';
import { Button } from '@material-ui/core';
import "./Feedback.css"

const Feedback = ({ setLoader, loader }) => {
    const [showModal, setShowModal] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [mainfeedback, setMainFeedback] = useState([]);
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [validationError, setValidationError] = useState('');

    const handleModalShow = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        // Clear form and validation error on modal close
        setFeedback('');
        setName('');
        setCity('');
        setValidationError('');
    };


    const fetchFeedback = async () => {
        try {
            ApiService.get('/feedback', null, null, (res, err) => {
                if (res !== null) {
                    setMainFeedback(res);
                    console.log(res, "33333");
                }
                else {
                    console.log("fetchFeedback", err.message, "error while feedback");
                }
            })
        } catch (error) {
            console.error('Error fetching feedback:', error);
        }
    };


    const handleFeedback = async (event) => {
        event.preventDefault();
        // const { feedback, name, city } = document.forms[0];
        // console.log(document.forms[0], "docuemnt");
        if (
            feedback === "" ||
            name === "" ||
            city === ""
        ) return setValidationError('All fields are required *');
        // Create a payload with the feedback data
        else {
            setLoader(true);
            const payload = {
                feedback: feedback,
                name: name,
                city: city,
            };
            try {
                await ApiService.post("/feedback", payload, null, (res, err) => {
                    if (res !== null) {
                        console.log("Feedback submitted successfully", res);
                        setMainFeedback([...mainfeedback, res]);
                        // Clear the input fields
                        toast.success("Feedback added successfully");
                        setLoader(false);
                    }
                    else {
                        console.log("handleFeedback", err.message, "error while login");
                    }
                });
            } catch (error) {
                console.error("handleFeedback", error.message, "error while submitting feedback");
            }
            setFeedback("")
            setName("");
            setCity("");
            setShowModal(false);

        }

    };

    useEffect(() => {
        fetchFeedback();
    }, [])



    return (
        <>
            <div className="testimonial " id="reviews">
                <div className='main'>
                    <div className='testimonial-header'>
                        <div className='centered-content container'>
                            <h1 className='text-center'>Reviews</h1>
                            <h4 className='text-center'>What's Our Customer Says</h4>
                            <p className='testimonial-text'>
                                We highly value your feedback as it helps us improve our services continuously. If you have any suggestions, comments,
                                or feedback regarding your experience with Sunrise Diagnostics & Speciality Lab, please feel free to reach out to us.
                                Your input is invaluable in our quest to provide exceptional healthcare services.
                                At Sunrise Diagnostics & Speciality Lab, your health is our priority, and we are dedicated to delivering accurate, reliable, and compassionate diagnostic services.
                                We look forward to serving you and contributing to your overall well-being.
                            </p>
                            <div className='feedbackBtn'>
                                <Button className="custom-button" onClick={handleModalShow}>
                                    Add Feedback
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="testimonialDetails" >
                        {
                            mainfeedback.map((item, index) => (
                                <Card key={index} className='feedbackCard'>
                                    <Card.Body style={{ textAlign: "center" }}>
                                        <Card.Text>
                                            {item.feedback}
                                        </Card.Text>
                                    </Card.Body>
                                    <Card.Header style={{ border: "none", display: "flex" }}>
                                        <img src={FeedbackIcon} alt="" style={{ borderRadius: "2rem" }} />
                                        <div className="patientinfo">
                                            <p>{item.name}</p>
                                            <p>{item.city}</p>
                                        </div>
                                    </Card.Header>
                                </Card>
                            ))
                        }
                    </div>
                </div>
            </div>
            {/* Feedback Modal Start */}
            <Modal show={showModal} onHide={handleModalClose} className="custom-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Add Feedback</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="feedback">
                            <Form.Label>Feedback *</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter feedback"
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="name">
                            <Form.Label>Name *</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="city">
                            <Form.Label>City *</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter city"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Form>
                    {validationError && <div className="text-danger">{validationError}</div>}
                </Modal.Body>
                <Modal.Footer>
                    <Button className="custom-button custom-button-close" onClick={handleModalClose}>
                        Close
                    </Button>
                    <Button className="custom-button custom-button-submit" onClick={handleFeedback}>
                        Submit
                        {loader === true &&
                            <Loader visible={loader} />
                        }
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* Feedback Modal End */}
        </>
    )
}
export default Feedback;
