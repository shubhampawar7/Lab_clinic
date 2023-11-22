import React, { useState, useEffect } from 'react';
import './AdminLabAppointment.css';
import Sidebar from '../Sidebar/Sidebar';
import ApiService from '../../middleware/ApiService';
import DeleteIcon from "../../images/DeleteIcon.png";
import swal from 'sweetalert';
import { toast } from 'react-toastify';
import SortIcon from "../../images/SortIcon.png";
import AscIcon from "../../images/AscIcon.png";
import DesIcon from "../../images/DesIcon.png";
import ExcelIcon from "../../images/ExcelIcon.png";
import {Button } from 'react-bootstrap';
import * as XLSX from 'xlsx';


const AdminLabAppointment = () => {
    const [AppointmentData, setAppointmentData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortField, setSortField] = useState('date'); // Default sorting field
    const [sortOrder, setSortOrder] = useState('asc'); // Default sorting order
    const [FetchAppointment, setFetchAppointment] = useState(false)

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

    const handleSort = (field) => {
        if (sortField === field) {
            // Toggle sorting order if the same field is clicked
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            // Default to ascending order when changing the sorting field
            setSortField(field);
            setSortOrder('asc');
        }
    };

    const sortedAppointments = [...filteredAppointments].sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];
        if (sortOrder === 'asc') {
            return aValue.localeCompare(bValue);
        } else {
            return bValue.localeCompare(aValue);
        }
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

    const handleDeleteAppointment = async (data) => {
        try {
            swal({
                title: 'Are you sure?',
                text: 'You want to delete Appointment!',
                icon: 'warning',
                buttons: true,
                dangerMode: true,
            }).then((willDelete) => {
                if (willDelete) {
                    ApiService.delete(`/appointment/${data._id}`, null, null, async (res, err) => {
                        await ApiService.post('/deletemailappointment', data, null, (DelemailRes, DelemailErr) => {

                            if (res !== null) {
                                toast.error('Appointment deleted successfully');
                                setFetchAppointment(true);
                                // getAppointment();
                            } else {
                                console.log('handleDeleteAppointment', DelemailErr.message, 'error while deleting Appointment');
                            }

                        })

                    });
                } else {
                    console.log('Appointment canceled');
                }
            });
        } catch (error) {
            console.log(error.message, 'handleDeleteAppointment() while deleting');
        }
    };

    useEffect(() => {
        getAppointment();
    }, [FetchAppointment]);

    const getSortIcon = (field) => {
        if (field === sortField) {
            return sortOrder === 'asc' ? <img style={{ width: "2rem", height: "2rem" }} src={AscIcon}></img> : <img style={{ width: "2rem", height: "2rem" }} src={DesIcon}></img>;
        }
        return '';
    };

    const handleOnExport=()=>{
        var wb=XLSX.utils.book_new(),
        ws=XLSX.utils.json_to_sheet(AppointmentData) ;  //wb-workBook , ws-workSheet

        XLSX.utils.book_append_sheet(wb,ws,"Mysheet");
        XLSX.writeFile(wb,"AppointmentData.xlsx")

    }

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
                        <div>
                            <img className="exportBtn" onClick={handleOnExport} src={ExcelIcon} alt='ExcelIcon'></img>
                        </div>

                        <div>
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='appointmentContent'>
                        <div class="table-responsive">
                            <table class="table table-striped ">
                                <thead class="table-dark">
                                    <tr style={{ cursor: "pointer" }}>
                                        <th scope="col" onClick={() => handleSort('_id')}>
                                            No {getSortIcon('_id')}
                                        </th>
                                        <th scope="col" onClick={() => handleSort('date')}>
                                            Appointment Date {getSortIcon('date')}
                                        </th>
                                        <th scope="col" onClick={() => handleSort('time')}>
                                            Time {getSortIcon('time')}
                                        </th>
                                        <th scope="col" onClick={() => handleSort('name')}>
                                            Name {getSortIcon('name')}
                                        </th>
                                        <th scope="col" onClick={() => handleSort('phone')}>
                                            Phone {getSortIcon('phone')}
                                        </th>
                                        <th scope="col" onClick={() => handleSort('email')}>
                                            Email {getSortIcon('email')}
                                        </th>
                                        <th scope="col" onClick={() => handleSort('active')}>
                                            Home Test {getSortIcon('active')}
                                        </th>
                                        <th scope="col" onClick={() => handleSort('contactOnWhatsapp')}>
                                            Contact on Whatsapp {getSortIcon('contactOnWhatsapp')}
                                        </th>
                                        <th scope="col" onClick={() => handleSort('address')}>
                                            Address {getSortIcon('address')}
                                        </th>
                                        <th scope="col" onClick={() => handleSort('category')}>
                                            Category {getSortIcon('category')}
                                        </th>
                                        <th scope="col" onClick={() => handleSort('subcategory')}>
                                            SubCategory {getSortIcon('subcategory')}
                                        </th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sortedAppointments?.map((appointment, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{appointment.date.split('T')[0]}</td>
                                            <td>{appointment.time}</td>
                                            <td>{appointment.name}</td>
                                            <td>{appointment.phone}</td>
                                            <td>{appointment.email}</td>
                                            <td>{appointment.active}</td>
                                            <td>{appointment.contactOnWhatsapp}</td>
                                            <td>{appointment.address}</td>
                                            <td>{appointment.category}</td>
                                            <td>{appointment.subcategory}</td>
                                            <td style={{ cursor: "pointer" }}>
                                                <img className='EditDeleteIcon' src={DeleteIcon} onClick={() => handleDeleteAppointment(appointment)}></img>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {filteredAppointments.length === 0 &&
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
