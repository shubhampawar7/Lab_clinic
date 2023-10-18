import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faMapMarkerAlt, faPhoneAlt, faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import Lab1 from "../../images/Lab1.png";
import Lab2 from "../../images/Lab2.png";
import Lab3 from "../../images/Lab3.png";
import "./Services.css"




const Services = ({ profileInformation }) => {

    return (
        <>
            <div className="publicServices">
                <div>
                    <FontAwesomeIcon className="icon" icon={faClock} />
                    <div>
                        <p>Opening Hours</p>
                        <small>
                            MON - SAT [ {profileInformation[0]?.shopTiming[0]?.openingTime} Am –  {profileInformation[0]?.shopTiming[0]?.closingTime} Pm ]
                            <br />
                            SUN [ Closed ]
                        </small>
                    </div>
                </div>
                <div style={{ cursor: "pointer" }} >
                    <FontAwesomeIcon className="icon" icon={faMapMarkerAlt} />
                    <div>
                        <a href="https://maps.app.goo.gl/c4sL2xau9PYCUzd67" className='locationLink' target="_blank" rel="noopener noreferrer">
                            <p>Visit our location</p>
                            <small>pune</small>
                        </a>
                    </div>
                </div>
                <div>
                    <FontAwesomeIcon className="icon" icon={faPhoneAlt} />
                    <div>
                        <p>Contact us now</p>
                        <small>+91 {profileInformation[0]?.phone}</small><br></br>
                        <small>
                            <a
                                className="servicesEmail"
                                href={`mailto:${profileInformation[0]?.email}`}
                            >
                                {profileInformation[0]?.email}
                            </a>
                        </small>
                    </div>

                </div>
            </div>
            <div className="ourServices">
                <div>
                    <p>OUR SERVICES</p>
                    <h2>Services We Provide</h2>
                    <div className="servicesDetails">
                        <div className='testCards'>
                            <img src={Lab1} alt="" />
                            <p>Blood Test</p>
                            <p>Cupidatat laborum qui excepteur anim magna occaecat veniam et consequat ad eiusmod et incididunt. Occaecat nisi amet eiusmod elit. Est culpa culpa nisi excepteur duis ad duis mollit.</p>
                        </div>
                        <div className='testCards'>
                            <img src={Lab2} alt="" />
                            <p>Bone</p>
                            <p>Cupidatat laborum qui excepteur anim magna occaecat veniam et consequat ad eiusmod et incididunt. Occaecat nisi amet eiusmod elit. Est culpa culpa nisi excepteur duis ad duis mollit.</p>
                        </div>
                        <div className='testCards'>
                            <img src={Lab3} alt="" />
                            <p>Kidney</p>
                            <p>Cupidatat laborum qui excepteur anim magna occaecat veniam et consequat ad eiusmod et incididunt. Occaecat nisi amet eiusmod elit. Est culpa culpa nisi excepteur duis ad duis mollit.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Services;
