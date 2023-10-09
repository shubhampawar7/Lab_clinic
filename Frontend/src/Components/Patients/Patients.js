import React from 'react';
import './Patients.css';
import Sidebar from '../Sidebar/Sidebar';
import { TableContainer, Paper, Table, makeStyles, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import { useEffect } from 'react';
import { useState } from 'react';
import FullHeight from "react-full-height";

const useStyle = makeStyles({
    table: {
        maxWidth: 1100,
    }
});

const Patients = () => {
    const classes = useStyle();
    const [appointment, setAppointment] = useState([]);

  

    return (
        <>
            <div className="patients">
                <Sidebar></Sidebar>

                <div>ddd</div>


            </div>
        </>
    );
};

export default Patients;