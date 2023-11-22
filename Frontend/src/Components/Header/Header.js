import React, { useState } from 'react';
import "./Header.css"
import { Nav, Button, Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SunriseIcon from '../../images/SunriseIcon.png';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import { Button } from '@material-ui/core';

const Header = () => {
    const [showNav, setShowNav] = useState(false);

    const handleNavToggle = () => {
        setShowNav(!showNav);
    };
    const images = [
        'https://plus.unsplash.com/premium_photo-1661284886645-1e21653e252a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://plus.unsplash.com/premium_photo-1661284886645-1e21653e252a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',


        
        // Add other image URLs here
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <>
            <div className="doctorHeading">
                <div className="Navbar">
                    <div className="navbarIcon">
                        <img className="SunriseIcon" src={SunriseIcon} alt="Logo" />
                    </div>
                    <div className="doctorNav">
                        <Navbar expand="lg">
                            <Container>
                                <Navbar.Toggle aria-controls="responsive-navbar" onClick={handleNavToggle} />
                                <Navbar.Collapse id="responsive-navbar" className={showNav ? '' : ''}>
                                    <Nav className="justify-content-end">
                                        <Nav.Item>
                                            <Nav.Link as={Link} to="/" className="navLink">
                                                Home
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link href="#services" className="navLink">
                                                Services
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link href="#about" className="navLink">
                                                About
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link href="#reviews" className="navLink">
                                                Reviews
                                            </Nav.Link>
                                        </Nav.Item>

                                        <Nav.Item>
                                            <Nav.Link href="#contactUs" className="navLink">
                                                Contact Us
                                            </Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </Navbar.Collapse>
                            </Container>
                        </Navbar>

                    </div>
                </div>
                <div className="row mainBody">
                    <div className='row mainBody'>
                        <div className="col-md-5">
                            <div className="doctorText">
                                <h1>	Your Health,
                                    <br />
                                    Our Priority</h1>
                                <p>The pathologist is that physician or clinical scientist who specializes in the art and science of medical risk estimation and disease diagnosis, using observations at the clinical, gross, body fluid, light microscopic, immunophenotypic, ultrastructural, cytogenetic, and molecular levels.</p>
                                {/* <Link style={{ textDecoration: "none" }} to="/appointment"> */}
                                <a href='/#getAppointment'>
                                    <Button className="button">GET APPOINTMENT</Button>
                                </a>
                                {/* </Link> */}
                            </div>
                        </div>
                        <div className="col-6">
                            <Slider {...settings}>
                                {images.map((image, index) => (
                                    <div key={index} className="doctorImg">
                                        <img src={image} alt={`Slide ${index + 1}`} />
                                    </div>
                                ))}
                            </Slider>
                            {/* <div className="doctorImg">
                                <img src="https://plus.unsplash.com/premium_photo-1661284886645-1e21653e252a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" width="3rem" height="4rem" alt="" />
                            </div> */}
                        </div>
                    </div>        </div>
            </div>
        </>
    );
};

export default Header;



