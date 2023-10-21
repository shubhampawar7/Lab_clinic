import React, { useState, useEffect } from 'react';
import { Nav, Card } from 'react-bootstrap';
import './MainPage.css';
import { Link } from 'react-router-dom';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faMapMarkerAlt, faPhoneAlt, faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@material-ui/core';
import Footer from '../Footer/Footer';
// import ApiService from "../../middleware/ApiService";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../Global/Loader/Loader';

// ** Images Start **
import drImage from '../../images/dr-image.png';
//** Images End **

// ** Components Start **
import Header from '../Header/Header';
import Services from '../Services/Services';
import AboutUs from '../AboutUs/AboutUs';
import Feedback from '../Feedback/Feedback';
import Blog from '../Blog/Blog';
import ContactUs from '../ContactUs/ContactUs';
import appointmentData from '../../json/AppointmentData'
import AppointmentType from '../AppointmentType/AppointmentType';
import ApiService from '../../middleware/ApiService';
// ** Components End **




const MainPage = () => {

    const [loader, setLoader] = useState(false);
    const [profileInformation, setProfileInformation] = useState([]);

    const getInformation = () => {
        try {
            ApiService.get("/info", null, null, (res, err) => {

                if (res !== null) {
                    console.log(res, "getinfo");
                    setProfileInformation(res)

                }
                else {
                    console.log(err.message, "getInformation() calling");
                }
            })

        } catch (error) {
            console.log(error.message, "getInformation() calling");

        }

    }
    useEffect(() => {
        getInformation();
    }, [])

    return (
        <>
            {loader === true && <Loader visible={loader} />}

            <div className="doctorPortal">
                <Header />

                <Services profileInformation={profileInformation} />


                <AboutUs />

                {/* Appointment Section Start */}
                {/* <div className="makeAppointment" id='getAppointment'>
                    <div>
                        <img src={bgRemoveDoctor} alt="" />
                    </div>
                    <div>
                        <h4>APPOINTMENT</h4>
                        <h1>Make an Appointment <br />Today</h1>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui doloremque dolore ipsa dolorem exercitationem culpa in inventore asperiores nostrum tenetur.</p>
                        <Button className="button">LEARN MORE</Button>
                        <div className="appoinmentContent container-fluid" >


                            <div className="row"> */}


                                <AppointmentType

                                    profileInformation={profileInformation}

                                ></AppointmentType>

                            {/* </div>
                        </div>
                    </div>
                </div> */}
                {/* Appointment Section End */}


                <Feedback setLoader={setLoader} loader={loader} />


                {/* Blogs Start */}
                {/* <Blog /> */}

                {/* Doctor Section Start */}
                {/* <div className="ourDoctors">
                    <div>
                        <h4>Our Doctors</h4>
                        <div className="ourDoctorsDetails">
                            <Card style={{ width: '21rem', border: "none" }}>
                                <img style={{ height: "300px" }} src={drImage} alt="" />
                                <div className="doctorsInfo">
                                    <p>Dr. Robiul Islam</p>
                                    <p><FontAwesomeIcon icon={faPhoneAlt} /> +8809638164898</p>
                                </div>
                            </Card>
                            <Card style={{ width: '21rem', border: "none" }}>
                                <img style={{ height: "300px" }} src={drImage} alt="" />
                                <div className="doctorsInfo">
                                    <p>Dr. Robiul Islam</p>
                                    <p><FontAwesomeIcon icon={faPhoneAlt} /> +8809638164898</p>
                                </div>
                            </Card>
                            <Card style={{ width: '21rem', border: "none" }}>
                                <img style={{ height: "300px" }} src={drImage} alt="" />
                                <p>Dr. Robiul Islam</p>
                                <p><FontAwesomeIcon icon={faPhoneAlt} /> +8809638164898</p>
                            </Card>
                        </div>
                    </div>
                </div> */}
                {/* Doctor Section End */}

                <ContactUs setLoader={setLoader} />

                <Footer profileInformation={profileInformation}></Footer>

                <ToastContainer />

            </div >
        </>

    );
};

export default MainPage;