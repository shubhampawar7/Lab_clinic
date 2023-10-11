import React, { useState, useEffect } from 'react';
import './Profile.css';
import Sidebar from '../Sidebar/Sidebar';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import ApiService from '../../middleware/ApiService';
import Loader from '../Global/Loader/Loader';
import swal from 'sweetalert';


const Profile = () => {

  const [loader, setLoader] = useState(false);
  const [profileInformation, setProfileInformation] = useState([]);
  const [formData, setFormData] = useState({}); // Store form data in an object
  console.log(formData, "formdata");
  const [profile, setProfile] = useState({
    shopTiming: [],
  });

  const [selectedDay, setSelectedDay] = useState(''); // State to store the selected day
  const [openingTime, setOpeningTime] = useState('');
  const [closingTime, setClosingTime] = useState('');



  const getInformation = () => {
    try {
      ApiService.get("/info", null, null, (res, err) => {
        if (res !== null) {
          setProfileInformation(res);
          if (res.length > 0 && res[0].shopTiming) {
            setProfile({
              ...profile,
              shopTiming: res[0].shopTiming,
            });
          }
        } else {
          console.log(err.message, "getInformation() calling");
        }
      });
    } catch (error) {
      console.log(error.message, "getInformation() calling");
    }
  }

  const editInformation = (id,e) => {
    e.preventDefault();
    setLoader(true);
    try {
      ApiService.patch(`/info/${id}`, formData, null, (res, err) => {
        if (res !== null) {
          console.log(res, "editInformation");
          // Optionally, you can clear the form fields after successful edit
          setFormData({});
          setLoader(false);
          getInformation();
          swal({
            title: 'Information Updated Successfully',
            text: '',
            icon: 'success',           
          })



        } else {
          console.log(err.message, "editInformation() calling");
        }
      })
    } catch (error) {
      console.log(error.message, "editInformation() calling");
    }
  }

  const handleChange = (e, field) => {
    // Update the formData object with the new values
    setFormData({
      ...formData,
      [field]: e.target.value,
    });
  }

  useEffect(() => {
    getInformation();
  }, [])

  //shop timing start
  useEffect(() => {
    // When the selected day changes, update the time input fields
    if (selectedDay) {
      const selectedTiming = profile.shopTiming.find((timing) => timing.day === selectedDay);
      if (selectedTiming) {
        setOpeningTime(selectedTiming.openingTime);
        setClosingTime(selectedTiming.closingTime);
      }
    }
  }, [selectedDay, profile.shopTiming]);



  const handleChangeDay = (e) => {
    setSelectedDay(e.target.value); // Update the selected day
  };

  const handleChangeTime = (e) => {
    const { name, value } = e.target;
    if (name === "openingTime") setOpeningTime(value);
    else
      setClosingTime(value);

    // Update the profile state with the new time for the selected day
    const updatedProfile = { ...profile };
    const selectedTiming = updatedProfile.shopTiming.find((timing) => timing.day === selectedDay);

    if (selectedTiming) {
      selectedTiming[name] = value;
      setProfile(updatedProfile);
    }
    setFormData(updatedProfile)
  };



  return (
    <div className="profileSection">
      {loader === true && <Loader visible={loader} />}

      <Sidebar></Sidebar>
      <div className='profileMainContent'>
        <h2 style={{ textAlign: "center" }}>Edit Information</h2>
        {
          profileInformation.map((profile, index) => (
            <Form key={index} onSubmit={(e) => editInformation(profile._id,e)}>
              <Row>
                <Col md={12} className='profileForm'>
                  <Form.Group className='profileInputForm' controlId="phone">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="phone"
                      placeholder="Enter phone number"
                      value={formData.phone || profile.phone}
                      onChange={(e) => handleChange(e, "phone")}
                    />
                  </Form.Group>

                  <Form.Group className='profileInputForm' controlId="address">
                    <Form.Label>Address</Form.Label>
                    <textarea
                      type="text"
                      className='textareaAddress'
                      name="address"
                      placeholder="Enter address"
                      value={formData.address || profile.address}
                      onChange={(e) => handleChange(e, "address")}
                    />
                    <p>Note : Write address Branch 1:(address) in this format</p>
                  </Form.Group>
                  <Form.Group className='profileInputForm' controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter email"
                      value={formData.email || profile.email}
                      onChange={(e) => handleChange(e, "email")}
                    />
                  </Form.Group>

                  {/* Shop timing dropdown start */}

                  <Form.Group className='profileInputForm' controlId="shopTimings">
                    <Form.Label>Select Day:</Form.Label>
                    <div className='shopTimingsMain'>
                      <select value={selectedDay} onChange={handleChangeDay}>
                        <option value="">Select Day</option>
                        {profile.shopTiming.map((timing) => (
                          <option key={timing.day} value={timing.day}>
                            {timing.day}
                          </option>
                        ))}
                      </select>

                      <br />

                      <label>Opening Time:</label>
                      <input type="time" name="openingTime" value={openingTime} onChange={handleChangeTime} />

                      <label>Closing Time:</label>
                      <input type="time" name="closingTime" value={closingTime} onChange={handleChangeTime} />
                    </div>
                  </Form.Group>
                  {/* Shop timing dropdown End */}




                  <Button variant="primary" type="submit">
                    Save
                  </Button>
                </Col>
              </Row>
            </Form>
          ))
        }
      </div>
    </div>
  );
};

export default Profile;
