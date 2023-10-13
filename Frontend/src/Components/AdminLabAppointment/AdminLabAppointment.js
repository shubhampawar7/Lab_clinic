import React, { useState, useEffect } from 'react';
import './AdminLabAppointment.css';
import Sidebar from '../Sidebar/Sidebar';
import AdminEditAppointment from "../AdminLabAppointment/AdminEditAppointment";
import ApiService from '../../middleware/ApiService';
import { Link } from "react-router-dom";
// import EditIcon from "../../images/EditIcon.png";
import DeleteIcon from "../../images/DeleteIcon.png";
import swal from 'sweetalert';
import { toast } from 'react-toastify';



const AdminLabAppointment = () => {
    const [AppointmentData, setAppointmentData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredAppointments = AppointmentData.filter((appointment) => {
        const query = searchQuery.toLowerCase();
        return (
            appointment.name.toLowerCase().includes(query) ||
            appointment.date.toLowerCase().includes(query) ||
            appointment.time.toLowerCase().includes(query) ||
            appointment.phone.toLowerCase().includes(query) ||
            appointment.email.toLowerCase().includes(query) ||
            appointment.category.toLowerCase().includes(query) ||
            appointment.subcategory.toLowerCase().includes(query)
        );
    });

    const getAppointment = async () => {
        try {
            ApiService.get('/appointment', null, null, (res, err) => {
                if (res !== null) {
                    setAppointmentData(res);
                } else {
                    console.log("getAppointment()", err.message, "error while getAppointment");
                }
            });
        } catch (error) {
            console.error('Error fetching getAppointment():', error);
        }
    };


    const handleDeleteAppointment = async (id) => {

        try {
            swal({
                title: 'Are you sure?',
                text: 'You want to delete Appointment!',
                icon: 'warning',
                buttons: true,
                dangerMode: true,
            }).then((willDelete) => {
                if (willDelete) {
                    ApiService.delete(`/appointment/${id}`, null, null, (res, err) => {
                        if (res !== null) {
                            toast.error('Appointment deleted successfully');
                            getAppointment();
                        } else {
                            console.log('handleDeleteAppointment', err.message, 'error while deleting Appointment');
                        }
                    });
                } else {
                    console.log('Appointment canceled');
                }
            });
        } catch (error) {
            console.log(error.message, 'handleDeleteAppointment() while deleting');
        }
    }

    useEffect(() => {
        getAppointment();
    }, []);

    return (
        <div className="mainAppointment">
            <div className="sidebarContent">
                <Sidebar />
            </div>
            <div className='appointmentSection'>
                <div className='appointmentMainContent'>
                    <div class="appointment-header">
                        <h1>Appointments - {AppointmentData.length}</h1>
                    </div>
                    <div className="AppointmentsearchBar">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className='appointmentContent'>
                        <div class="table-responsive">
                            <table class="table table-striped table-hover">
                                <thead class="table-dark">
                                    <tr>
                                        <th scope="col">No</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Appointment Date</th>
                                        <th scope="col">Time</th>
                                        <th scope="col">Phone</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Home Test</th>
                                        <th scope="col">Address</th>
                                        <th scope="col">Category</th>
                                        <th scope="col">SubCategory</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredAppointments.map((appointment, index) => (
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{appointment.name}</td>
                                            <td>{appointment.date.split('T')[0]}</td>
                                            <td>{appointment.time}</td>
                                            <td>{appointment.phone}</td>
                                            <td>{appointment.email}</td>
                                            <td>{appointment.active}</td>
                                            <td>{appointment.address}</td>
                                            <td>{appointment.category}</td>
                                            <td>{appointment.subcategory}</td>
                                            <td style={{cursor:"pointer"}}>
                                                <div >
                                                    {/* <img className='EditDeleteIcon' src={EditIcon}></img> */}
                                                    <img className='EditDeleteIcon' src={DeleteIcon} onClick={() => handleDeleteAppointment(appointment._id)}></img>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {
                                filteredAppointments.length === 0 &&
                            <h3 className='text-center'>Data Not Found !</h3>
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLabAppointment;
