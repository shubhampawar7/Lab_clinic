import React from 'react';
import { Nav } from 'react-bootstrap';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import SunriseIcon from '../../images/SunriseIcon.png';


const Header = () => {
    return (
        <>
            <div className="doctorHeading">
                <div className='Navbar'>
                    <div className='navbarIcon'>
                        <img className='SunriseIcon' src={SunriseIcon} alt='Logo'></img>
                    </div>
                    <div className="doctorNav">
                        <Nav className="justify-content-end">
                            <Nav.Item>
                                <Nav.Link className="navLink" to="/">Home</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link className="navLink" href="#about">About</Nav.Link>
                            </Nav.Item>

                            <Nav.Item>
                                <Nav.Link className="navLink" href="#reviews">Reviews</Nav.Link>
                            </Nav.Item>
                            {/* <Nav.Item>
                                <Nav.Link className="navLink" href="/admin">Doctors Zone</Nav.Link>
                            </Nav.Item> */}
                            <Nav.Item>
                                <Nav.Link className="navLink" href="#contactUs">Contact Us</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </div>
                </div>
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
                    <div className="col-md-7">
                        <div className="doctorImg">
                            <img src="https://plus.unsplash.com/premium_photo-1661284886645-1e21653e252a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" width="3rem" height="4rem" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Header;
