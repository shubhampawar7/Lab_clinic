import React, { useEffect } from 'react';
import './DoctorsZone.css';
import Calendar from 'react-calendar';
import { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import { TableContainer, Paper, Table, makeStyles, TableHead, TableRow, TableCell, TableBody, Select, MenuItem } from '@material-ui/core'
import Sidebar from '../Sidebar/Sidebar';
import FullHeight from "react-full-height";

const useStyles = makeStyles({
    table: {
        minWidth: 500,
    },
});

const DoctorsZone = () => {
    const [initialDate, setInitialDate] = useState(new Date());
    const [appointment, setAppointment] = useState([]);
    const [key, setKey] = useState(null);
    const [action, setAction] = useState(null);
    const classes = useStyles();
    const day = initialDate.getDate();
    const month = initialDate.getMonth();
    const year = initialDate.getFullYear();
    const fullDate = month + 1 + "/" + day + "/" + year;

    const handleChange = (event) => {
        let action = event.target.value;
        const actions = { action: action, key };
        fetch("https://guarded-anchorage-08361.herokuapp.com/modifyActionByKey", {
            method: "post",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(actions)
        })
            .then(response => response.json())
            .then(data => {
                setAction(data);
                console.log(data);
            })
    }

    const [feedbackData, setFeedbackData] = useState([
        {
            id: 1,
            feedback: 'Lorem ipsum dolor sit amet...',
            city: 'New York',
            name: 'John Doe',
        },
        {
            id: 2,
            feedback: 'Suspendisse potenti. Nulla facilisi...',
            city: 'Los Angeles',
            name: 'Jane Smith',
        },
        // Add more feedback objects as needed
    ]);

    const handleDeleteFeedback = (id) => {
        // Implement logic to delete feedback by its ID
        // Update feedbackData state accordingly
        const updatedFeedbackData = feedbackData.filter((feedback) => feedback.id !== id);
        setFeedbackData(updatedFeedbackData);
    };

    // useEffect(() => {
    //     fetch("https://guarded-anchorage-08361.herokuapp.com/appointment")
    //         .then(res => res.json())
    //         .then(data => {
    //             const fetchedData = data.reverse();
    //             setAppointment(fetchedData);
    //         })
    // }, [action]);

    const selectedDateAppointment = appointment.filter(appointment => appointment.details.date === fullDate);

    return (
        <div className="doctorsZone row">

            <div className='col-2'>
                <Sidebar></Sidebar>
            </div>

            <div className="zoneAppointment col-10" style={{ border: "2px solid black" }}>
                <div>
                    <h4>Appointment</h4>
                    <Calendar
                        className="calender"
                        selected={initialDate}
                        onChange={date => setInitialDate(date)}
                    >
                    </Calendar>
                </div>
            </div>

        </div>
    );
};

export default DoctorsZone;