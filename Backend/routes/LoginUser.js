const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback")
const session = require("express-session")
const auth = require("../middlewares/auth")
const multer = require("multer");
const fs = require("fs");
const nodemailer = require("nodemailer")
require('dotenv').config();








//contact us 
// POST route to send email
// router.post('/send-email', (req, res) => {
//     const { email, subject, message } = req.body;
//     console.log(email, "email");


//     // Create a Nodemailer transporter
//     const transporter = nodemailer.createTransport({
//         host: "smtp.gmail.com",
//         port: 587,
//         secure: false,
//         auth: {
//             user: process.env.EMAIL,
//             pass: process.env.PASSWORD
//         },
//     });
//     const mailOptions = {
//         from: process.env.EMAIL,
//         to: email,
//         subject: subject,
//         html: message +"Thank you for considering Sunrise Diagnostics & Speciality Lab for your diagnostic needs. We value your interest and are here to assist you in any way we can. If you have any questions, require assistance, or would like to book an appointment, please don't hesitate to get in touch with us.Contact Information: Phone: +91 95524 47349  Email:sunrised2017@gmail.com",
//         // html: `<h1>Hi ,` + message + `</h1><p>please click here to verify <a href="http://127.0.0.1:7000/verify?id=``" >your mail</a></p>`

//     };
//     console.log(mailOptions.html)


//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             console.error('Error sending email', error);
//             res.status(500).send('Error sending email');
//         } else {
//             console.log('Email sent: ' + info.response);
//             res.sendStatus(200); // Email sent successfully
//         }
//     });
// });



// router.use(session({secretconfig.sessionSecret}))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        return cb(null, "uploadfiles/")
    },
    filename: (req, file, cb) => {
        return cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage });





// Routers
const UserController = require("../controllers/UserController")




//----------------------------

//Get request 
// router.get("/data",auth.verifyJwt,UserController.Getdata)
router.get("/data", UserController.Getdata)


router.post("/upload", upload.single("file"), UserController.Upload)
// router.post("/upload",upload.single("file"),(req,res,next)=>{
//     console.log(req.file,"upp");
//     console.log(req.body,"body");
//     res.json(req.file)
// })


router.get("/allfiles", UserController.FilesAllData)
router.get("/allfiles/:id", UserController.FileSingleData)
router.get("/download/:filename", (req, res) => {
    const file = `uploadfiles/${req.params.filename}`;
    res.download(file);
});

router.delete("/delete/:filename", UserController.DeleteFile)


//feedback routes feedback 
router.get('/feedback',UserController.getFeedback);
router.post('/feedback',UserController.addFeedback);
router.delete('/feedback/:id',UserController.deleteFeedback);


//Appointment Start 
router.get('/appointment',UserController.getAppointment);
router.post('/appointment',UserController.postAppointment);
router.delete('/appointment/:id',UserController.deleteAppointment);




//Appointment End 


//Mail routes
router.post('/send-email',UserController.sendContactEmail);
router.post('/mailappointment',UserController.sendMailForAppointment);






// router.get('/feedback', async (req, res) => {
//     try {
//         const feedbackList = await Feedback.find();
//         res.json(feedbackList);
//     } catch (error) {
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });
// router.post('/feedback', async (req, res) => {
//     try {
//         const { feedback, name, city } = req.body;
//         const newFeedback = new Feedback({ feedback, name, city });
//         await newFeedback.save();
//         res.json(newFeedback);
//     } catch (error) {
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });



//Information Schema
router.get("/info",UserController.getInformation)
router.post("/info/edit",UserController.addEditInformation)
router.delete("/info/:id",UserController.deleteInformation)
// router.put("/info/:id",UserController.editInformation)
router.patch("/info/:id",UserController.editInformation)







// router.get("/",UserController.Getdata)

//singup User 
// router.post("/newuser",auth.isLogin,UserController.Adduser)
router.post("/signup", UserController.Adduser)

//email verify after signup route
router.get("/verify", UserController.verifyMail)

//verify login
router.post("/login", UserController.verifyLogin)



//forgot pass
router.post("/forgotpass", UserController.forgotpass)

//verify password mail
router.get("/forgotpasswordLoad", UserController.forgotpasswordLoad)

//set new password
router.post("/resetpass", UserController.resetpass)



//user logout
router.get("/logout", auth.destroyJwt, UserController.userlogout)

//find byid
router.get("/users/:id", UserController.FindUser)

//Update user info
router.put('/update/:id', UserController.UpdateUser)

//Delete user data
router.delete('/delete/:id', UserController.DeleteUser)




//----------------------------



module.exports = router