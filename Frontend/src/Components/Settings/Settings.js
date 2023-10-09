import React ,{useState,useEffect} from 'react';
import './Settings.css';
import Sidebar from '../Sidebar/Sidebar';
import FullHeight from "react-full-height";
import axios from 'axios';
import ApiService from '../../middleware/ApiService';

const Settings = () => {
    const [information, setInformation] = useState([]);
    console.log(information,"info ");
    const [formData, setFormData] = useState({
        phone: '',
        address: '',
        // Add other fields as needed
    });

    const fetchInformation = () => {
        
        ApiService.get('/info',null,null,(req,res)=>{
            try {
                setInformation(res.data);
            

            } catch (error) {
                console.error('Error fetching information:', error);
                

            }
        }) // Replace with the actual GET API endpoint
            
    };

    const handleDelete = (id) => {
        
        ApiService.delete(`/info/${id}`,null,null,(req,res)=>{
            try {
                console.log(res.data,"delete");
                fetchInformation(); // Refresh the information list

            } catch (error) {
                console.error('Error deleting information:', error);

            }
        }) // Replace with the actual DELETE API endpoint
      
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post('/api/information', formData) // Replace with the actual POST API endpoint
            .then((response) => {
                // Handle successful submission, e.g., clear the form
                setFormData({
                    phone: '',
                    address: '',
                    // Reset other fields as needed
                });
                fetchInformation(); // Refresh the information list
            })
            .catch((error) => {
                console.error('Error submitting information:', error);
            });
    };

    useEffect(() => {
        // Fetch information when the component mounts
        fetchInformation();
    }, []);

    return (
        <div className="settings">
            <Sidebar></Sidebar>
            <FullHeight>
                <h1>Developer is busy now...!</h1>
              

            </FullHeight>
        </div>
    );
};

export default Settings;