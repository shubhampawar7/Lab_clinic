import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebookF, faGooglePlusG } from '@fortawesome/free-brands-svg-icons';
import { Nav } from 'react-bootstrap';


const Footer = ({ profileInformation }) => {
    const matches = profileInformation[0]?.address.match(/(Branch \d+:[^]+?)(?=Branch \d+:|$)/g);
    const Address = [matches];
    console.log(profileInformation[0]?.shopTiming, "pooo");
    return (
        <div className="footer">
            <div className='mainFooter'>
                {/* officeTimings Start */}
                <div className='officeTimings mainSection'>
                    <div className='footerHeading'>
                        <p>Office Timings</p>
                    </div>
                    <div >
                        <ul>
                            {
                                profileInformation[0]?.shopTiming.map((timing) => (
                                    <li>
                                        {timing.day}	-  [ {timing.openingTime} Am –  {timing.closingTime} Pm ]
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
                {/* officeTimings End */}

                {/* Address Start */}
                <div className='mainSection'>
                    <div className='footerHeading'>
                        <p>Our Address</p>
                    </div>
                    <div>
                        {
                            Address[0]?.map((address) => (
                                <ul>
                                    <li>{address}</li>
                                </ul>
                            ))
                        }
                    </div>
                </div>
                {/* Address End */}

                {/* Social Media and Contact Start */}
                <div className='mainSection'>
                    <div className='footerHeading'>
                        <p>Social Media</p>
                    </div>
                    <div>
                        {/* <small>Bsrisal, Bangladesh</small> */}
                        <div className="brandIcon">
                            <FontAwesomeIcon icon={faFacebookF} />
                            <FontAwesomeIcon icon={faGooglePlusG} />
                            <FontAwesomeIcon icon={faTwitter} />
                        </div>
                        <small>Call Now</small>
                        <p className="callNow">{profileInformation[0]?.phone}</p>
                        <Nav.Item>
                            <Nav.Link className="navLink" href="/admin"><h5>Admin</h5></Nav.Link>
                        </Nav.Item>
                    </div>
                </div>
                {/* Social Media and Contact End */}

            </div>
            <div style={{ textAlign: "center", marginTop: "30px" }}>
                <small>Copyright 2023 All Right Reserved</small>
            </div>
        </div>
    );
};

export default Footer;