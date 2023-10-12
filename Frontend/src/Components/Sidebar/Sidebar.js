import React from 'react';
import './Sidebar.css';
import FullHeight from "react-full-height";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTh, faCalendarDay, faUserFriends, faFileAlt, faCog, faSignOutAlt,faBackward } from '@fortawesome/free-solid-svg-icons';


const Sidebar = () => {
    const handleLogout = () => {
        localStorage.removeItem('email');
    }
    return (
        <>
            <FullHeight className="section-sty  les sidebar">
                <Link to="/" style={{ textDecoration: "none" }} className="sideBarLink">
                    <FontAwesomeIcon className="icon" icon={faBackward} />
                    <p>Back</p>
                </Link>
                <Link to="/admin" style={{ textDecoration: "none" }} className="sideBarLink">
                    <FontAwesomeIcon className="icon" icon={faTh} />
                    <p>Dashboard</p>
                </Link>
                <Link to="/admin/appointment" style={{ textDecoration: "none" }} className="sideBarLink">
                    <FontAwesomeIcon className="icon" icon={faCalendarDay} />
                    <p>Appointment</p>
                </Link>
                <Link to="/admin/feedback" style={{ textDecoration: "none" }} className="sideBarLink">
                    <FontAwesomeIcon className="icon" icon={faUserFriends} />
                    <p>Feedback</p>
                </Link>
                <Link to="/admin/profile" style={{ textDecoration: "none" }} className="sideBarLink">
                    <FontAwesomeIcon className="icon" icon={faFileAlt} />
                    <p>Profile</p>
                </Link>
                <Link to="/admin/settings" style={{ textDecoration: "none" }} className="sideBarLink">
                    <FontAwesomeIcon className="icon" icon={faCog} />
                    <p>Settings</p>
                </Link>
                <Link to="" style={{ textDecoration: "none" }} className="sideBarLink">
                    <FontAwesomeIcon className="icon" icon={faSignOutAlt} />
                    <p onClick={handleLogout}>Log Out</p>
                </Link>
            </FullHeight>
        </>
    );
};

export default Sidebar;