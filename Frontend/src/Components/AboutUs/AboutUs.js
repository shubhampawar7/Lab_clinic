import React from 'react'
import { Button } from '@material-ui/core';


const AboutUs = () => {
    return (
        <>
            <div className="dentalCare" id='about'>
                <div>
                    <div>
                        <img src="https://www.shutterstock.com/shutterstock/photos/1950327883/display_1500/stock-photo-ho-chi-minh-city-district-june-blur-image-of-modern-laboratory-1950327883.jpg" alt="" />
                    </div>
                    <div>
                        <div>
                            <h1 className='aboutUsHeading'>About Us</h1>
                            <ul>
                                <li>
                                    <p>At Sunrise Diagnostics & Speciality Lab, we understand the importance of timely and accurate healthcare information in making informed decisions about your well-being. Our commitment to excellence extends beyond our world-class facilities and highly skilled team. We invest in cutting-edge technology and continually update our testing methodologies to ensure you receive the most reliable results.</p>
                                </li>
                                <li>
                                    <p>For your convenience, we offer an easy-to-navigate online booking system, allowing you to schedule your appointments at your preferred time and location. Whether you're seeking a basic blood test, seeking answers to specific health concerns, or looking for a comprehensive health assessment, we have a wide array of services to cater to your unique needs.</p>
                                </li>
                                <li>
                                    <p>We take pride in our dedication to patient-centric care. Our staff is trained to provide a comfortable and reassuring experience, whether you visit one of our labs or opt for our home collection service. We understand that healthcare can sometimes be intimidating, and we strive to create an environment where you feel at ease and confident in the care you receive.</p>
                                </li>
                                <li>
                                    <p>Moreover, at Sunrise Diagnostics & Speciality Lab, we believe in the power of information. We provide detailed reports that are not only accurate but also easy to understand, empowering you to take charge of your health. Our commitment to your well-being goes beyond just diagnostics; it extends to helping you make informed choices for a healthier life.</p>
                                </li>
                                <li>
                                    <p>In a fast-paced world where health is paramount, we are your trusted partner, dedicated to delivering the highest standards of diagnostic excellence, professionalism, and compassion. Your health journey matters to us, and we are here to support you every step of the way. Choose Sunrise Diagnostics & Speciality Lab for accurate, accessible, and compassionate healthcare services that prioritize your well-being.</p>
                                </li>
                            </ul>
                            <Button className="button">Learn More</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AboutUs;