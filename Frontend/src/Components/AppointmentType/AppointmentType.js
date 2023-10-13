import React, { useEffect } from 'react';
import './AppointmentType.css'
import { Card } from 'react-bootstrap';
import Popup from "reactjs-popup";
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import LabTestingData from "./AppointmentType.json";
import ApiService from '../../middleware/ApiService';
import Loader from '../Global/Loader/Loader';
import { toast } from 'react-toastify';
import { Button } from '@material-ui/core';
import bgRemoveDoctor from '../../images/5790-removebg.png';





const AppointmentType = (props) => {
    const [returnedData, setReturnedData] = useState(null)
    // const { title, time, shortDetails } = props.appointmentData;
    const { register, handleSubmit, errors, reset } = useForm();
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubcategory, setSelectedSubcategory] = useState('');
    const [loader, setLoader] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isHomeTest, setIsHomeTest] = useState(false);

    const [formData, setformData] = useState({
        date: '',
        time: '',
        name: '',
        phone: '',
        email: '',
        category: '',
        subcategory: '',
        address: '',
        active:"false"

    })
    console.log(formData, "formmm");

    const handlePopupClose = () => {
        setformData({
            date: '',
            time: '',
            name: '',
            phone: '',
            email: '',
            category: '',
            subcategory: '',
            address: '',
            active:false

        });
    };

    const handleFormChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setformData({
            ...formData,
            [name]: value
        })

    }


    // const postAppointment = async (e) => {
    //     e.preventDefault();

    //     setLoader(true);
    //     const payload = formData;
    //     try {
    //         await ApiService.post("/appointment", payload, null, (res, err) => {

    //             if (res !== null) {


    //                 console.log(res, "app res");
    //                 setLoader(false);
    //                 setIsPopupOpen(false);
    //                 setformData({
    //                     date: '',
    //                     time: '',
    //                     name: '',
    //                     phone: '',
    //                     email: '',
    //                     category: '',
    //                     subcategory: ''
    //                 });
    //                 toast.success("Feedback added successfully");


    //             }
    //             else {
    //                 console.log(err.message, "error post res");
    //             }
    //         })
    //     } catch (error) {
    //         console.log(error.message, "error postAppointment() while calling");
    //     }

    // }



    const onSubmit = async () => {
        setLoader(true);
        const payload = formData;

        try {
            // First, make the appointment booking API call
            await ApiService.post('/appointment', payload, null, async (res, err) => {
                if (res !== null) {
                    console.log(res, 'app res');
                    setLoader(false)
                    try {
                        return
                        await ApiService.post('/mailappointment', payload, null, (emailRes, emailErr) => {
                            if (emailRes !== null) {
                                console.log(emailRes, 'app res');
                                setLoader(false);
                                setIsPopupOpen(false);
                                setformData({
                                    date: '',
                                    time: '',
                                    name: '',
                                    phone: '',
                                    email: '',
                                    category: '',
                                    subcategory: '',
                                    address: '',
                                    active:'false'
                                });
                                toast.success('Appointment booked successfully');

                            } else {
                                console.log(emailErr.message, 'error sending email');
                            }
                        });
                    } catch (emailError) {
                        console.log(emailError.message, 'error sending email');
                    }
                } else {
                    console.log(err.message, 'error post res');
                }
            });
        } catch (error) {
            console.log(error.message, 'error postAppointment() while calling');
        }
    };





    return (
        <>
            <div className="makeAppointment" id='getAppointment'>
                {loader === true && <Loader className="loader-container" visible={loader} />}

                <div>
                    <img src={bgRemoveDoctor} alt="" />
                </div>
                <div>
                    <h4>APPOINTMENT</h4>
                    <h1>Make an Appointment <br />Today</h1>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui doloremque dolore ipsa dolorem exercitationem culpa in inventore asperiores nostrum tenetur.</p>
                    <div className="appoinmentContent container-fluid" >


                        <div className="col-md-12 appointmentType" >


                            <Popup trigger={<button>BOOK APPOINTMENT</button>} contentStyle={{ width: "600px", border: "none", background: "transparent" }} modal closeOnDocumentClick
                                open={isPopupOpen}
                                onClose={handlePopupClose}
                            >
                                <div className="popupDetails">
                                    {/* <h5>{title}</h5> */}
                                    {/* <form onSubmit={(e) => postAppointment(e)}> */}
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className='dateTimeField'>
                                            <div className='dateTimeFieldInner'>
                                                <input value={formData.date} type='date' name="date" className="takeInput " placeholder="Date *" min={new Date().toISOString().split('T')[0]} ref={register} onChange={(e) => handleFormChange(e)} />
                                                <br />
                                                <br />
                                                <input value={formData.time} type='time' name="time" className="timeInput" placeholder="Time *" ref={register} onChange={(e) => handleFormChange(e)} />
                                            </div>

                                        </div>
                                        <div style={{ marginBottom: "1.5rem" }}>
                                            <i style={{ color: "black" }}>
                                                Lab Timing : MON - SAT [ {props.profileInformation[0]?.shopTiming[0]?.openingTime} Am –  {props.profileInformation[0]?.shopTiming[0]?.closingTime} Pm ] --
                                                SUN [ Closed ]
                                            </i>
                                            -
                                            <i></i>
                                        </div>

                                        <input value={formData.name} name="name" className="takeInput" placeholder="Your Name *" ref={register({ required: true })} onChange={(e) => handleFormChange(e)} />
                                        <br />
                                        {errors.name && <span className='validationError'>Name is required *</span>}
                                        <br />
                                        <input value={formData.phone} name="phone" className="takeInput" placeholder="Phone Number *" ref={register({ pattern: /^\d{10}$/, required: true })} onChange={(e) => handleFormChange(e)} />
                                        <br />
                                        {errors.phone && <span className='validationError'>Please enter a valid number *</span>}
                                        <br />
                                        <input value={formData.email} name="email" className="takeInput" placeholder="Email *" ref={register({ pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, required: true })} onChange={(e) => handleFormChange(e)} />
                                        <br />
                                        {errors.email && <span className='validationError'>Please enter a valid email *</span>}
                                        <br />
                                        <div>
                                            {/* <label className='categoryLable'>Blood Category:</label> */}
                                            <select
                                                name='category'
                                                value={formData.category}
                                                onChange={(e) => {
                                                    setSelectedCategory(e.target.value);
                                                    handleFormChange(e);
                                                }}
                                                className='categoryDropdown'
                                                ref={register({ required: true })}

                                            >
                                                <option value="">Select Category *</option>
                                                {LabTestingData.map((category, index) => (
                                                    <option key={index} value={category.label}>
                                                        {category.label}
                                                    </option>
                                                ))}
                                            </select>
                                            <br></br>
                                            {errors.category && <span className='validationError'>Please enter a category *</span>}


                                            {selectedCategory && (
                                                <div style={{ marginTop: "1rem" }}>
                                                    {/* <label className='categoryLable'>Subcategory:</label> */}
                                                    <select
                                                        name='subcategory'
                                                        value={formData.subcategory}
                                                        onChange={(e) => {
                                                            setSelectedSubcategory(e.target.value);
                                                            handleFormChange(e);
                                                        }}
                                                        className='categoryDropdown'
                                                        ref={register({ required: true })}

                                                    >
                                                        <option value="">Select Subcategory *</option>
                                                        {LabTestingData
                                                            .find((category) => category.label === selectedCategory)
                                                            ?.subcategories.map((subcategory, index) => (
                                                                <option key={index} value={subcategory}>
                                                                    {subcategory}
                                                                </option>
                                                            ))}
                                                    </select>

                                                    <br></br>
                                                    {errors.subcategory && <span className='validationError'>Please enter a subcategory *</span>}

                                                </div>
                                            )}
                                        </div>
                                        <br />
                                        <div className='homeTestContent'>
                                            <h6 className='homeTestLable'>Home Test :</h6>

                                            <div>
                                                <input className='homeTestBtn' type='radio' name='isHomeTest' value='false' checked={!isHomeTest} onChange={(e) =>{ setIsHomeTest(false);setformData({...formData,['active']:e.target.value,['address']:""})} }/>
                                                <label className='homeTestLable' htmlFor='isHomeTestNo'>No</label>
                                                <input  className='homeTestBtn'type='radio' name='isHomeTest' value='true' checked={isHomeTest} onChange={(e) =>{ setIsHomeTest(true); setformData({...formData,['active']:e.target.value})} }/>
                                                <label className='homeTestLable' htmlFor='isHomeTestYes'>Yes</label>
                                            </div>
                                        </div>


                                        {isHomeTest && (
                                            <div>
                                                <input
                                                    type='text'
                                                    name='address'
                                                    value={formData.address}
                                                    placeholder='Enter your Address *'
                                                    className="takeInput"
                                                    onChange={(e) => handleFormChange(e)}
                                                    ref={register({ required: true })}
                                                />
                                                <br />
                                                {errors.address && <span className='validationError'>Address is required *</span>}
                                            </div>

                                        )}
                                        <p style={{ marginTop: "1rem" }}>If any test is not Available
                                            <br></br>
                                            Contact : {props.profileInformation[0]?.phone}
                                        </p>

                                        <div className="submitBtn">
                                            <input type="submit" value="Send" />
                                        </div>
                                        {
                                            returnedData &&
                                            <div>
                                                <p>Your Appointment Id: {returnedData._id}</p>
                                                <a href="/">Go to Home Page</a>
                                            </div>
                                        }


                                    </form>
                                </div>
                            </Popup>


                        </div >
                    </div>
                </div>
            </div>
        </>
    );
};

export default AppointmentType;