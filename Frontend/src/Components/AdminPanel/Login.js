import React, { useState } from 'react'
// import ApiService from '../middleware/ApiService';
// import Dashboard from './Dashboard';
import { useHistory,Link,Redirect} from 'react-router-dom';
import "./Login.css"
import Dashboard from '../Dashboard/Dashboard';
import { Nav } from 'react-bootstrap';

 const Login = () => {

    const [verifyMail, setVerifyMail] = useState();
    const [validMail, setValidMail] = useState();
    const [validPass, setValidPass] = useState();
    // const navigate = useNavigate();
    const getemail = localStorage.getItem("email")
    // Inside your component:
    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();
        const { mail, pass } = event.target.elements;
    
        // Hardcoded admin credentials
        const adminUsername = "admin@gmail.com";
        const adminPassword = "admin@12";
    
        if (mail.value === adminUsername && pass.value === adminPassword) {
            // Correct credentials, set email in local storage and redirect to dashboard
            history.push('/admin/dashboard');
            localStorage.setItem('email', mail.value);
            

        } else {
            // Incorrect credentials, display error message
            setVerifyMail("Incorrect email or password");
            setValidMail(""); // Clear previous email validation message
            setValidPass(""); // Clear previous password validation message
        }
    }
    


 
    return (
        <>

            {getemail && getemail ? ( history.push('/admin/dashboard')) : (
                <div className='container-fluid bg-dark'>

                    <section className="vh-100 bg-image"
                    style={{backgroundColor:"grey" }}
                    >
                        <div className="mask d-flex align-items-center justify-content-center h-100 gradient-custom-3">
                            <div className="container h-100">
                                <div className="row d-flex justify-content-center align-items-center h-100">
                                    <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                                        <div className="card"
                                        >
                                            <div className="card-body p-5">
                                                <h2 className="text-uppercase text-center mb-5">Login</h2>

                                                <form onSubmit={handleSubmit}>


                                                    <div className="form-outline mb-4">
                                                        <label className="form-label" htmlFor="form3Example3cg">Your Email</label>

                                                        <input type="email" name='mail' id="form3Example3cg" className="form-control form-control-lg" />
                                                        <p className='text-center text-danger'>{validMail}</p>
                                                    </div>

                                                    <div className="form-outline mb-4">
                                                        <label className="form-label" htmlFor="form3Example4cg">Password</label>

                                                        <input type="password" name='pass' id="form3Example4cg" className="form-control form-control-lg" />
                                                        <p className='text-center text-danger'>{validPass}</p>

                                                    </div>




                                                    <div className="d-flex justify-content-center">
                                                        <button type="submit"
                                                            className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Login</button>
                                                    </div>
                                                    <p className='text-center text-danger'>{verifyMail}</p>
                                                    <div className='mainPageUrl'>
                                                    <Link to="/" > Go to Main Page</Link>

                                                    </div>


{/* 
                                                    <p className="text-center text-muted mt-5 mb-0">Have already an account? <a href="signup" className="fw-bold text-body">Register</a></p>
                                                    <p className="text-center"><a href="forgotpass" className="fw-bold text-body">Fogot Password?</a></p> */}

                                                </form>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>





                </div>
            )}

        </>
    )
}

export default Login;