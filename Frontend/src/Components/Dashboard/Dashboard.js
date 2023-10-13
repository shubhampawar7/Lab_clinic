import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './Dashboard.css';
import PatientIcon from "../../images/PatientIcon.png";
import Feedback from "../../images/Feedback.png";
import AppoinmentIcon from "../../images/AppoinementIcon.png"
import Information from "../../images/Information.png"
import { useHistory } from 'react-router-dom';

import ApiService from '../../middleware/ApiService';

const Dashboard = () => {

  const InitialcardData = [
    { id: 1, title: 'Patients', count: 0, image: PatientIcon },
    { id: 2, title: 'Feedback', count: 0, image: Feedback, pageUrl: "/admin/feedback" },
    { id: 3, title: 'Appoinments', count: 0, image: AppoinmentIcon , pageUrl: "/admin/appointment"},
    { id: 4, title: 'Profile', count: "-", image: Information, pageUrl: "/admin/profile" },


  ];

  const [cardData, setCardData] = useState(InitialcardData);
  const [searchQuery, setSearchQuery] = useState('');
  const filterData = cardData.filter((card) =>
    card.title.toLowerCase().includes(searchQuery.toLowerCase())

  );
  console.log(filterData, 'fff');
  const history = useHistory();

  const handleNavigate = (pageUrl) => {
    history.push(pageUrl);
  }


  const fetchFeedback = async () => {
    try {
      ApiService.get('/feedback', null, null, (res, err) => {
        if (res !== null) {
          setCardData(prevCardData => prevCardData.map(item =>
            item.id === 2 ? { ...item, count: res.length } : item
          ))


        }
        else {
          console.log("fetchFeedback", err.message, "error while feedback");
        }
      })
    } catch (error) {
      console.error('Error fetching feedback:', error);
    }
  };

  const getAppointment = async () => {
    try {
      ApiService.get('/appointment', null, null, (res, err) => {
        if (res !== null) {
          setCardData(prevCardData => prevCardData.map(item =>
            item.id === 3 ? { ...item, count: res.length } : item
          ))
        } else {
          console.log("getAppointment()", err.message, "error while getAppointment");
        }
      });
    } catch (error) {
      console.error('Error fetching getAppointment():', error);
    }
  };


  useEffect(() => {
    fetchFeedback();
    getAppointment();
  }, [])


  return (
    <>
      <div className="mainDashboard ">
        <div className="sidebarContent">
          <Sidebar />
        </div>
        <div className="adminDashboard">
          <div class="dashboard-header">
            <h1>Admin Dashboard</h1>
          </div>
          {/* Search input field */}
          <div className="searchBar">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="row col-md-12 main-card-content">
            {filterData.map((card, index) => (
              <section className="col-3 card-section" key={index} onClick={() => handleNavigate(card.pageUrl)}>
                <div className="card admin-panel-card mt-2 mb-3">
                  <div className="card-circle mx-auto white">
                    <div className=" dashboardIconOuterWhite">
                      <div className="dashboardIconOuter">
                        <svg xmlns="http://www.w3.org/2000/svg" width="113" height="113" viewBox="0 0 113 113" fill="none">
                          <circle cx="56.5" cy="56.5" r="56.5" fill="white" />
                        </svg>
                        <img className="card-icon" src={card.image} alt="icon"></img>
                      </div>
                    </div>
                  </div>
                  <div className="card-body text-center">
                    <h4>{card.count}</h4>
                    <h4 className="card-title">{card.title}</h4>

                    <div className="horizontalBar">
                      <span>
                        {' '}
                        <hr className="horizontalBarContent"></hr>
                      </span>
                    </div>

                    <h6 className="card-button-name">
                      {/* <CustomButton className="admin-panel-button" parentWarpper={'w-100'} title={card.buttonName} onClick={() => handleCardButton(card.pageUrl)} /> */}
                    </h6>
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
