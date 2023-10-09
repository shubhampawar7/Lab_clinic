import React, { useState, useEffect } from 'react';
import './Profile.css';
import Sidebar from '../Sidebar/Sidebar';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import ApiService from '../../middleware/ApiService';
import { easing } from '@material-ui/core';

const Profile = () => {
  const [profileInformation, setProfileInformation] = useState([]);
  const [formData, setFormData] = useState(profileInformation); // Store form data in an object
  console.log(formData,"fordmad");

  const getInformation = () => {
    try {
      ApiService.get("/info", null, null, (res, err) => {
        if (res !== null) {
          console.log(res, "getinfo");
          setProfileInformation(res);
        } else {
          console.log(err.message, "getInformation() calling");
        }
      });
    } catch (error) {
      console.log(error.message, "getInformation() calling");
    }
  }

  const editInformation = (id) => {
    console.log(id, formData, "idddd");
    // e.preventdefault;
    try {
      ApiService.patch(`/info/${id}`, formData, null, (res, err) => {
        if (res !== null) {
          console.log(res, "editInformation");
          // Optionally, you can clear the form fields after successful edit
          //   setFormData({});
        } else {
          console.log(err.message, "editInformation() calling");
        }
      })
    } catch (error) {
      console.log(error.message, "editInformation() calling");
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setFormData((prevData) => ({
      ...prevData,
      ...(name === "shopTiming"
        ? {
            shopTiming: {
              ...prevData.shopTiming,
              [name]: value,
            },
          }
        : {
            [name]: value,
          }),
    }));
  };
  

  useEffect(() => {
    getInformation();
  }, [])

  return (
    <div className="profileSection">
      <Sidebar></Sidebar>
      <div className='profileMainContent'>
        <h2 style={{ textAlign: "center" }}>Edit Information</h2>
        {
          profileInformation.map((profile, index) => (
            <Form key={index} >
              <Row>
                <Col md={12} className='profileForm'>
                  <Form.Group controlId="phone">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="phone"
                      placeholder="Enter phone number"
                      value={formData.phone || profile.phone}
                      onChange={(e) => handleChange(e)}
                    />
                  </Form.Group>

                  <Form.Group controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      placeholder="Enter address"
                      value={formData.address || profile.address}
                      onChange={(e) => handleChange(e)}
                    />
                  </Form.Group>
                  <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter email"
                      value={formData.email || profile.email}
                      onChange={(e) => handleChange(e)}
                    />
                  </Form.Group>

                  {/* <Form.Group controlId="shopTiming">
                    <Form.Label>Office Timings</Form.Label>
                    <Form.Control
                      type="text"
                      name="shopTiming"
                      placeholder="Enter office timings"
                      value={formData.shopTiming || profile.shopTiming}
                      onChange={(e) => handleChange(e)}
                    />
                  </Form.Group> */}
                  <div className='form-group'>

                    <table style={{ width: "100%" }}>
                      <thead>
                        <tr>
                          <th>Day</th>
                          <th>Opening Time</th>
                          <th>Closing Time</th>
                        </tr>
                      </thead>  
                      {
                        profile.shopTiming.map((timing, index) => (
                          console.log(timing, "timing"),
                          <tbody key={index}>
                            <tr className='officeTimingsRow'>
                              <td>{timing.day}</td>
                              <td><input type="text" name="openingTime" value={timing.openingTime } onChange={(e)=>handleChange(e)} /></td>
                              <td><input type="text" name="closingTime" value={timing.closingTime}  /></td>
                            </tr>

                          </tbody>
                        ))
                      }
                    </table>

                  </div>
                  {/* <button type="submit">Save</button> */}

                  <Button variant="primary" onClick={(e) => editInformation(profile._id)}>
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
