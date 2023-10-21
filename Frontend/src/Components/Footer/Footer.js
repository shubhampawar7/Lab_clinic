import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebookF, faGooglePlusG } from '@fortawesome/free-brands-svg-icons';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const Footer = ({ profileInformation }) => {
    const matches = profileInformation[0]?.address.match(/(Branch \d+:[^]+?)(?=Branch \d+:|$)/g);
    const Address = [matches];

    return (
        <div className="footer">
            <div className='mainFooter'>
                {/* officeTimings Start */}
                <div className='officeTimings mainSection'>
                    <div className='footerHeading'>
                        <p>Office Timings</p>
                    </div>
                    <div className='timingList'>
                        <ul>
                            {
                                profileInformation[0]?.shopTiming.map((timing, index) => (
                                    <li key={index}>
                                        {timing.day}-  [{timing.openingTime} Am – {timing.closingTime} Pm]
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
                            Address[0]?.map((address, index) => (
                                <ul key={index}>
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
                        <p className="callNow">
                            <a href={`tel:+91${profileInformation[0]?.phone}`} style={{ color: "inherit" }}>
                                {profileInformation[0]?.phone}
                            </a>
                        </p>
                        <Nav.Item>
                            <Link className="navLinkAdmin" to="/admin"><h5>Admin</h5></Link>
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