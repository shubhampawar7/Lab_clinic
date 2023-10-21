import React, { useState, useEffect } from 'react';
import './AdminFeedback.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import Sidebar from '../../Sidebar/Sidebar';
import DeleteIcon from "../../../images/DeleteIcon.png";
import ApiService from '../../../middleware/ApiService';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';


const AdminFeedback = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [FeedbackDeleted, setFeedbackDeleted] = useState(false)
  const [message, setMessage] = useState("")
  const history = useHistory();

  const fetchFeedback = async () => {
    console.log("calling");
    try {
      ApiService.get('/feedback', null, null, (res, err) => {
        if (res !== null) {
          setFeedbackData(res);
        }
        else {
          console.log("fetchFeedback", err.message, "error while feedback");
        }
      })
    } catch (error) {
      console.error('Error fetching feedback:', error);
    }
  };

  const handleDeleteFeedback = (id) => {
    try {
      swal({
        title: 'Are you sure?',
        text: 'You want to delete feedback!',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          ApiService.delete(`/feedback/${id}`, null, null, (res, err) => {
            if (res !== null) {
              toast.error('Feedback deleted successfully');
              setFeedbackDeleted(true)
              // fetchFeedback(); 
            } else {
              console.log('handleDeleteFeedback', err.message, 'error while deleting feedback');
            }
          });
        } else {
          console.log('Deletion canceled');
        }
      });
    } catch (error) {
      console.log(error.message, 'handleDeleteFeedback() while deleting');
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, [FeedbackDeleted])



  return (
    <div className="mainDashboard ">
      <div className="sidebarContent">
        <Sidebar />
      </div>
      <div className="feedback-section">
        <div className="feedback-card">
          <h2>Feedback Count</h2>
          <p>Total Feedbacks: {feedbackData.length}</p>
        </div>

        <div className="feedback-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Feedback</th>
                <th>City</th>
                <th>Name</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {feedbackData?.map((feedback, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{feedback.feedback}</td>
                  <td>{feedback.city}</td>
                  <td>{feedback.name}</td>

                  <td style={{ cursor: "pointer" }}>
                    <img className='DeleteIcon' src={DeleteIcon} onClick={() => handleDeleteFeedback(feedback._id.toString())} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer />

    </div>
  );
};

export default AdminFeedback;
