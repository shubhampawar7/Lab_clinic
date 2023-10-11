import React, { useState } from 'react'
// import ApiService from '../middleware/ApiService';
// import Dashboard from './Dashboard';
import { useHistory,Link } from 'react-router-dom';
import "./Login.css"

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
            localStorage.setItem('email', mail.value);
            history.push('/dashboard');
        } else {
            // Incorrect credentials, display error message
            setVerifyMail("Incorrect email or password");
            setValidMail(""); // Clear previous email validation message
            setValidPass(""); // Clear previous password validation message
        }
    }
    


    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     const { mail, pass } = document.forms[0];
    //     const payload = {
    //         email: mail.value,
    //         password: pass.value
    //     }
    //     ApiService.post("/login", payload, null, (res, err) => {
    //         if (res !== null) {
    //             setVerifyMail(res.msg)
    //             setValidMail(res.emailmsg)
    //             setValidPass(res.passwordmsg)
    //             // setCurrentUser(res.user.email)
    //             localStorage.setItem('email', res.user.email);

    //             if (res.user) {
    //                 history.push("/admin")
    //             }
    //         }
    //         else {
    //             console.log("handleSubmit", err.message, "error while login");
    //         }
    //     })
    // }
    return (
        <>

            {getemail && getemail ? ( history.push('/dashboard')) : (
                <div className='container-fluid bg-dark'>

                    <section class="vh-100 bg-image"
                    style={{ backgroundImage: "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp');" }}
                    >
                        <div class="mask d-flex align-items-center justify-content-center h-100 gradient-custom-3">
                            <div class="container h-100">
                                <div class="row d-flex justify-content-center align-items-center h-100">
                                    <div class="col-12 col-md-9 col-lg-7 col-xl-6">
                                        <div class="card"
                                        >
                                            <div class="card-body p-5">
                                                <h2 class="text-uppercase text-center mb-5">Login</h2>

                                                <form onSubmit={handleSubmit}>


                                                    <div class="form-outline mb-4">
                                                        <label class="form-label" for="form3Example3cg">Your Email</label>

                                                        <input type="email" name='mail' id="form3Example3cg" class="form-control form-control-lg" />
                                                        <p className='text-center text-danger'>{validMail}</p>
                                                    </div>

                                                    <div class="form-outline mb-4">
                                                        <label class="form-label" for="form3Example4cg">Password</label>

                                                        <input type="password" name='pass' id="form3Example4cg" class="form-control form-control-lg" />
                                                        <p className='text-center text-danger'>{validPass}</p>

                                                    </div>




                                                    <div class="d-flex justify-content-center">
                                                        <button type="submit"
                                                            class="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Login</button>
                                                    </div>
                                                    <p className='text-center text-danger'>{verifyMail}</p>
                                                    <div className='mainPageUrl'>
                                                    <Link to="/" > Go to Main Page</Link>

                                                    </div>


{/* 
                                                    <p class="text-center text-muted mt-5 mb-0">Have already an account? <a href="signup" class="fw-bold text-body">Register</a></p>
                                                    <p class="text-center"><a href="forgotpass" class="fw-bold text-body">Fogot Password?</a></p> */}

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