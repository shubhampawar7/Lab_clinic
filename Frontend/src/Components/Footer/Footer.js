import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebookF, faGooglePlusG } from '@fortawesome/free-brands-svg-icons';
import { Nav } from 'react-bootstrap';


const Footer = () => {
    return (
        <div className="footer">
            <div>
                <div>
                    <div>
                        <p>Office Timings</p>
                    </div>
                    <div>
                        {/* <small>Emergency Dental Care</small>
                        <br />
                        <small>Check Up</small>
                        <br />
                        <small>Treatment of Personal Diseases</small>
                        <br />
                        <small>Tooth Extraction</small>
                        <br />
                        <small>Check Up</small> */}
                        <div>
                            {/* <h6>Office Timings :</h6> */}
                            <ul>

                                <li>
                                    Monday	-  [ 08:00 Am –  09:30 Pm ]
                                </li>

                                <li>
                                    Tuesday	- [ 08:00 Am –  09:30 Pm ]

                                </li>

                                <li>
                                    Wednesday	- [ 08:00 Am –  09:30 Pm ]

                                </li>
                                <li>
                                    Thursday	- [ 08:00 Am –  09:30 Pm ]

                                </li>
                                <li>
                                    Friday		- [ 08:00 Am –  09:30 Pm ]

                                </li>
                                <li>
                                    Saturday	- [ 08:00 Am –  09:30 Pm ]

                                </li>

                                <li>
                                    Sunday	- [ 08:00 Am –  02:00 Pm ]

                                </li>
                            </ul>

                        </div>

                    </div>
                </div>
                <div>
                    <div>
                        <p>Our Address</p>
                    </div>
                    <div>
                        {/* <small>Emergency Dental Care</small>
                        <br />
                        <small>Check Up</small>
                        <br />
                        <small>Treatment of Personal Diseases</small>
                        <br />
                        <small>Tooth Extraction</small>
                        <br />
                        <small>Check Up</small> */}
                        <div>
                            {/* <h6>Address:</h6> */}
                            <ul>
                                <li>Branch 1 : <br/>Akash Heritage Shop No. 2 Near old Dhaneswar School Ground, Lane No. 15, Gokul Nagar, Dhanori, Pune, Maharashtra 411015.</li>
                                <li>Branch 2 : <br/> Pawan corner Building, Opp. Narayanrao Genba Moze School. Munjaba wasti Tingre Nagar, Road, Dhanori, Pune, Maharashtra 411015.</li>

                            </ul>
                        </div>


                    </div>
                </div>
                <div>
                    <div>
                        {/* <p>Our Address</p> */}
                    </div>
                    <div>
                        {/* <small>Bsrisal, Bangladesh</small> */}
                        <div className="brandIcon">
                            <FontAwesomeIcon icon={faFacebookF} />
                            <FontAwesomeIcon icon={faGooglePlusG} />
                            <FontAwesomeIcon icon={faTwitter} />
                        </div>
                        <small>Call Now</small>
                        <p className="callNow">+91 95524 47349</p>
                        <Nav.Item>
                            <Nav.Link className="navLink" href="/admin"><h5>Admin</h5></Nav.Link>
                        </Nav.Item>
                    </div>
                </div>
            </div>
            <div style={{ textAlign: "center", marginTop: "30px" }}>
                <small>Copyright 2023 All Right Reserved</small>
            </div>
        </div>
    );
};

export default Footer;