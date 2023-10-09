import React, { useState } from 'react'
import ApiService from '../../middleware/ApiService';
import { toast } from 'react-toastify';
import { Button } from 'react-bootstrap';

const ContactUs = ({ setLoader }) => {

    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const handleContact = async (e) => {
        e.preventDefault();
        setLoader(true);
        const formData = { email, subject, message };

        try {
            ApiService.post('/send-email', formData, null, (res, err) => {
                if (res !== null) {
                    console.log("success");
                    toast.success("Email sent successfully");
                    setEmail("");
                    setSubject("");
                    setMessage("");
                    setLoader(false);

                }
                else {
                    console.error('Error sending email');
                    toast.error("Error sending email");

                }
            });
        } catch (error) {
            console.error('Error sending email', error);
            toast.error("Error sending email");
        }

    };

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    {/* <div className="col-md-6">
                            <div >
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30259.78133212936!2d73.92537312830879!3d18.552717382983626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c3c3288ba495%3A0x38e833613a63004a!2sKharadi%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1695035846948!5m2!1sen!2sin"
                                    width="100%"
                                    height="auto"
                                    frameborder="0"
                                    allowfullscreen
                                ></iframe>

                            </div>


                        </div> */}
                    <div className="col-md-12">
                        <div className="contactUs" id="contactUs">

                            <div>
                                <h4>Contact Us</h4>
                                <h1>Always contact with us</h1>
                                <p className='contactUs-text'>
                                    Our dedicated customer support team is available during office hours to address your inquiries,
                                    provide information about our services, assist with report inquiries, and guide you through the testing process.
                                    We are committed to ensuring a seamless and satisfactory experience for every patient.
                                </p>

                                <div className="contactUsDetails">
                                    <form onSubmit={handleContact}>
                                        <input
                                            placeholder="Email Address*"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                        <br />
                                        <input
                                            placeholder="Subject*"
                                            type="text"
                                            value={subject}
                                            onChange={(e) => setSubject(e.target.value)}
                                            required
                                        />
                                        <br />
                                        <input
                                            placeholder="Your Message*"
                                            type="text"
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            required
                                        ></input>
                                        <br />
                                        <Button className="submitBtn" type="submit" >
                                            Submit
                                        </Button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}
export default ContactUs;


