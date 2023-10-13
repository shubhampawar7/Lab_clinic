const express=require("express");
const bcrypt=require("bcrypt")
const mongoose = require('mongoose');
const nodemailer=require("nodemailer")
const jwt =require("jsonwebtoken")
const Information = require("../models/Information")
const Feedback = require('../models/Feedback')
require('dotenv').config();
const Appointment =require("../models/Appointment")
const config=require( "../config/config");
const path = require('path');
const download = require('download');
const { fileURLToPath } = require("url");

// app.use(session({
//     secret: config.sessionSecret,
//     resave: false,
//     saveUninitialized: true
//   }));



//Fetch user data
const Getdata=async(req,res)=>{
    try {
        const data= await User.find();
        console.log(data)
        res.status(200).json({data})
     
        
    } catch (error) {
        console.log(error)
        
    }
}



//Add new user post
const Adduser=async (req,res)=>{
    
    try {
        const email=req.body.email;
        const emailExist=await User.find({email:email})
        if(emailExist.length==1){
            return res.status(200).json({msg:"email is already exists"});

        }
        const securepass=await securePassword(req.body.password)
        const newuser=new User({
            name:req.body.name,
            email:req.body.email,
            password:securepass,
            is_admin:false
        });
        const user= await newuser.save()
        console.log(user,"new user");
        if(user){
            sendverifyMail(req.body.name,req.body.email,user._id) //id use for particular user
           return res.status(200).json({user});

            
        }
        else{
            res.json({message:"error"})
        }
        
    } catch (error) {
        console.log(error)
        
    }
}

//For send mail verify user
const sendverifyMail=async(name,email,user_id)=>{
    try {
        const myObjectIdString = user_id.toString();
        // console.log(myObjectIdString)
        // console.log(user_id)

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            },
        });
        const mailOptions={
            from:process.env.EMAIL,
            to:email,
            subject:"For verification mail ",
            // html: `<h1>Hi ,`+name+`</h1><p>please click here to verify <a href="http://127.0.0.1:7000/verify?id=`+user_id+`" >your mail</a></p>`
            html: `<h1>Hi ,`+name+`</h1><p>please click here to verify <a href="http://127.0.0.1:7000/verify?id=`+myObjectIdString+`" >your mail</a></p>`
        }
        console.log(mailOptions.html)

        transporter.sendMail(mailOptions,(error,info)=>{
            if(error){
                console.log("error",error);
            }
            else{
                console.log("email sent"+info.response);
                res.status(201).json({status:201,info});            }
            })



    } catch (error) {
        console.log(error)
        
    }
}

//convert pass in hash code someone send pass it will send in hash code  salt value means our own pass
const securePassword=async(password)=>{
    try {
        const passwordHash =await bcrypt.hash(password,10)
        return passwordHash
    } catch (error) {
        console.log(error)
        
    }

}

// verify mail and set is_verified to true
const verifyMail=async(req,res)=>{
    try {
        console.log(req.query.id,"query id")
     const updateInfo  =await User.findByIdAndUpdate(req.query.id,{is_verified:true},{new:true});
     res.json(updateInfo)
    } catch (error) {
        console.log(error)
    }
}





//find user byid
const FindUser=async(req,res)=>{
    try {
        const SingleUser=await User.findById(req.params.id)
        res.json(SingleUser)
    } catch (error) {
        console.log(error)
    }
}


//update user byid
const UpdateUser=async(req,res)=>{
    try {
        const UpdateUser=await User.findById(req.params.id)
        UpdateUser.name=req.body.name
        UpdateUser.email=req.body.email
        UpdateUser.password=req.body.password

        const newdata=await UpdateUser.save()
        res.json(newdata)
       
    } catch (error) {
        console.log(error)
    }
}

const DeleteUser=async(req,res)=>{
      try {
        const deleteUser=await User.findById(req.params.id)
        const deletedData=await User.findByIdAndRemove(deleteUser);
        res.json(deletedData)
    } catch (error) {
        console.log(error.message)
        console.log("error")
    }
}


//login user methods start
// const loginLoad=async(req,res)=>{
//     try {
//         res.send("heelo")
//     } catch (error) {
//         console.log(error)
        
//     }
// }

//login
const verifyLogin=async(req,res)=>{
    try {
        //check email or pass wrong, email exists ,isverified
        const email=req.body.email;
        const password=req.body.password;
        console.log(password);
        console.log(email);


        const userData=await User.findOne({email:email});
        console.log(userData,"user data ");

        if(userData){

          const passwordMatch= await  bcrypt.compare(password,userData.password);

          if(passwordMatch){

            if(userData.is_verified===true){
                // req.session.user_id=userData._id;

                //generate token 
                const token=await jwt.sign({email,password},"iamfromindiamynameisshubham",{expiresIn:"15 minutes"});
                // const req.jwt.user_id=token
               return res.status(200).json({
                    user:{email:email,
                        password:password,
                        token:token}
                    
                })
                console.log(token)
                console.log("pass is correct")
            }
            else{
                // res.json({msg:`verify your mail : ${email}  ,   before login `})
                res.json({msg:`verify your mail before login `})

                console.log("verify your mail before login")
            }

         
            // res.json({msg:"logged in (pass is correct)"})

           
            // req.session.user_id=userData._id
           

          }
          else{
            res.json({passwordmsg:"invalid pass"})
          }

            
        }else{
            res.json({emailmsg:"invalid email"})

        }

    } catch (error) {
        console.log(error)

        
    }
}

const userlogout=async(req,res)=>{
    try {
        
        res.status(200).json({msg:"successfully logout (\login)"})
    } catch (error) {
        console.log(error.message)
        
    }
}


const forgotpass=async(req,res)=>{
    try {
        email=req.body.email;
        console.log(email)

        const userData=await User.findOne({email:email});
        // console.log(userData)
        if(userData){       

            if(userData.is_verified===true){
                 //generate token 
                 const token=await jwt.sign({email},"iamfromindiamynameisshubham",{expiresIn:"15 minutes"});
                //  console.log("forgot pass token :",token)
                 const updatedData=await User.updateOne({email:email},{$set:{token:token}});
                //  console.log(updatedData)
                 forgotPasswordMail(userData.name,userData.email,token)
                 res.json({msg:"check your mail to reset your password"})
             
            }
            else{
                res.json({msg:`first verify your mail ${email}`})
            }

        }
        else{
            res.json({msg:"your email is invalid"})
            console.log(error.message)

        }

        
    } catch (error) {
        console.log(error.message);        
    }
}


//For forgot password mail
const forgotPasswordMail=async(name,email,token)=>{
    try {
        console.log(email)
        console.log(token)
        // const myObjectIdString = token.toString();
        // console.log(myObjectIdString)

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            },
        });
        const mailOptions={
            from:process.env.EMAIL,
            to: "pshubham7000@gmail.com",
            subject:"For reset password ",
            // html: `<h1>Hi ,`+name+`</h1><p>please click here to verify <a href="http://127.0.0.1:7000/verify?id=`+user_id+`" >your mail</a></p>`
            html: `<h1>Hi ,`+name+`</h1><p>please click here to  <a href="http://127.0.0.1:7000/forgotpasswordLoad?token=`+token+`" >reset password</a></p>`
        }
        console.log(mailOptions.html)

        transporter.sendMail(mailOptions,(error,info)=>{
            if(error){
                console.log("error",error);
            }
            else{
                console.log("email sent"+info.response);
                res.status(201).json({status:201,info});            }
            })



    } catch (error) {
        console.log(error)
        
    }
}

const forgotpasswordLoad=async(req,res)=>{
    try {
        const token=req.query.token;
        console.log(token)
        // const strtoken=token.toString();
        // console.log(strtoken)
        const tokendata =await User.findOne({token:token})
        console.log(tokendata)
        if(tokendata){

   

            res.json({token:token,msg:"set your new password"})
            // res.send(`Now you can set your new password <a href="http://127.0.0.1:7000/resetpass">click here</a>`)

        }
        else{
            res.json({msg:"token not found"})
        }
    } catch (error) {
        console.log(error.message)
    }
}

const resetpass=async(req,res)=>{
    try {
        const securepass=await securePassword(req.body.password);
        const password=securepass;
        const id=req.body._id;             

          
            // const updatePass= await User.findByIdAndUpdate({token:token},{$set:{password:securepass,token:""}})
            const updateInfo  =await User.findByIdAndUpdate({_id:id},{$set:{password:securepass,token:""}},{new:true});
            // res.status(200).json(updateInfo,{msg:`changed password for  account now you can login with new password`})
            res.json({msg:"success"})
    } catch (error) {
        console.log(error.message)
    }
}

const Upload=async(req,res)=>{  


    console.log(req.body,"body");
    

   
  
    
   
    
      try {
        if(req.body.name){
        
            const file = new File({
                name: req.body.name,
                // file: {data:fs.readFileSync('./uploads'+req.filename)},
                uploadedBy: req.body.uploadedBy,
                sharedWith: req.body.sharedWith,
                path:req.file.path,
                current_time:req.body.current_time        
              });
              const newFile = await file.save();
              res.status(201).json(newFile);
              console.log("file saved successfully");
        
            
        }
        else{
            const file = new File({
                message:req.body.message,
                uploadedBy: req.body.uploadedBy,
                sharedWith: req.body.sharedWith,
                current_time:req.body.current_time        
              });
              const newFile = await file.save();
              res.status(201).json(newFile);
              console.log("file saved successfully");
    
        }
     
      } catch (err) {
        res.status(400).json({ message: err.message });
      }

}


const FilesAllData=async(req,res)=>{
    try {
        const filedata=await File.find();
        // console.log(filedata,"filedata api data");
        res.status(200).json(filedata);
    } catch (error) {
        console.log(error.message);
    }
}

const FileSingleData=async(req,res)=>{
    try {
        const id=req.params.id
        const uploadedBy=req.query.uploadedBy;
        console.log(uploadedBy  ,"cuurr");
        // const filedata=await File.find({$and:[{uploadedBy:uploadedBy},{sharedWith:id}],$or[{uploadedBy:id},{sharedWith:uploadedBy}]});
        // const filedata=await File.find({sharedWith:id});

        const filedata=await File.find({$or:[
                                                {$and:[{uploadedBy:uploadedBy},{sharedWith:id}]},
                                                {$and:[{uploadedBy:id},{sharedWith:uploadedBy}]},

                                            ]});


        // console.log(filedata,"filedata api data");
        res.status(200).json(filedata);
    } catch (error) {
        console.log(error.message);
    }
}

const DownloadFile=(req,res)=>{
    try {
        const filepath=path.join("/home/shubhamp/data/Mycode/File_Sharing/backend/uploadfiles",req.params.filename);
        const file = fs.readFileSync(filepath);

        const fileType = req.params.filename.split('.').pop();

        res.setHeader('Content-Type', `application/${fileType}`);
        // res.download(filepath,(err)=>{
        //     if(err){
        //     console.log(err.message);
        //     }
        //     console.log("success");
        //     res.json(file)
        // })
                res.download(filepath)

           res.json(filepath)
        //    console.log(filepath);
    } catch (error) {
        console.log(error.message);
    }
}

const DeleteFile=async(req,res)=>{
    
    const file=`uploadfiles/${req.params.filename}`;
    const DelFile = await File.findById(req.query.fileId);
    const DelFileData=await File.findByIdAndRemove(DelFile);
    console.log(DelFileData,"file delete data");

    console.log(req.query.fileId,"del");
    fs.unlink(file,(err)=>{
        if(err){
            console.log("error while deleting file");
            res.status(500).send("error while deleting file")
        }
        else{
            res.send("File deleted successfully")
        }
    })
}

//Feeback
const getFeedback= async (req, res) => {
    try {
        const feedbackList = await Feedback.find();
        res.json(feedbackList);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

const addFeedback=async (req, res) => {
    try {
        const { feedback, name, city } = req.body;
        const newFeedback = new Feedback({ feedback, name, city });
        await newFeedback.save();
        res.json(newFeedback);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

const deleteFeedback = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedFeedback = await Feedback.findByIdAndRemove(id);
  
      if (!deletedFeedback) {
        return res.status(404).json({ message: 'Information not found' });
      }

      res.json({ message: 'Information deleted', deletedFeedback });
    } catch (error) {
      console.error(error.message, "deleteFeedback() while deleting");
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  



//Information
const getInformation=async(req,res)=>{
    try {
        const filedata=await Information.find();
        res.status(200).json(filedata);
    } catch (error) {
        console.log(error.message);
    }
}

const addEditInformation= async (req, res) => {
    try {
        try {
            const { phone,address,shopTiming,email ,picture} = req.body;
            const newInfo = new Information({phone, address,shopTiming,email,picture});
            await newInfo.save();
            res.json(newInfo);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  const deleteInformation = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedInfo = await Information.findByIdAndRemove(id);
  
      if (!deletedInfo) {
        return res.status(404).json({ message: 'Information not found' });
      }
  
      res.json({ message: 'Information deleted', deletedInfo });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  const editInformation=async (req, res) => {
    const { id } = req.params;
    try {
      const existingInfo = await Information.findByIdAndUpdate(id, req.body, { new: true });
  
      if (!existingInfo) {
        return res.status(404).json({ message: 'Information not found' });
      }
  
      res.json(existingInfo);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  







// const DownloadFile=(req,res)=>{
//     try {
//         const filepath=path.join("/home/shubhamp/data/Mycode/File_Sharing/backend/uploadfiles",req.params.filename);
//         const file = fs.createReadStream(filepath);
//         // console.log(file);
//         const stat = fs.statSync(filepath);
//         const fileType = req.params.filename.split('.').pop();
//         res.setHeader('Content-Length', stat.size);
//         // res.setHeader('Content-Type', `application/${fileType}`);
//         res.setHeader('Content-Disposition', `attachment; filename=${req.params.filename}`);
//         file.pipe(res);  
//         // res.json(filepath)
//     } catch (error) {
//         console.log(error.message,'fd');
//         res.status(404).send('File not found');
//     }
// }


// Appointment Start
const getAppointment=async(req,res)=>{
    try {
        const appointment = await Appointment.find();
        res.json(appointment);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }

}

const postAppointment=async(req,res)=>{
    try {
        const { date,time,name,phone ,email,category,subcategory,address,active} = req.body;
        const newAppointment = new Appointment({date,time,name,phone,email,category,subcategory,address,active});
        await newAppointment.save();
        res.json(newAppointment);
        
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });

    }
}

const deleteAppointment = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedAppointment = await Appointment.findByIdAndRemove(id);
      console.log(deletedAppointment,"deleid");

      if (!deletedAppointment) {
        return res.status(404).json({ message: 'deletedAppointment not found' });
      }
      else{
        res.json({ message: 'deletedAppointment deleted', deletedAppointment });

      }
  
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
// Appointment End

const sendContactEmail=async(req, res) => {
    const { email, subject, message } = req.body;


    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: config.EMAIL,
            pass: config.PASSWORD
        },
    });
    const mailOptions = {
        from: email, 
        to: config.EMAIL,  
        subject: subject,
    
        // HTML content of the email
        html: `
            <p>You have received a message from a visitor through the contact form on your website.</p>
            <p>Contact Information:</p>
            <ul>
                <li><strong>Email:</strong> ${email}</li>
            </ul>
            
            <p>Message:</p>
            <p>${message}</p>
            
            <p>Please respond to this message promptly to assist the visitor with their inquiry.</p>
            
            <p>Best regards,<br>Your Website Contact Form</p>
        `,
    };
    
    console.log(mailOptions.html)

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email', error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.sendStatus(200); // Email sent successfully
        }
    });
}


//Mail for appointment
const sendMailForAppointment = async (req, res) => {
    const {date,time,name, email,category,subcategory } = req.body;

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: config.EMAIL,
            pass: config.PASSWORD,
        },
    });

    const mailOptions = {
        from: config.EMAIL, // Sender's email address
        to: email, // Recipient's email address
        subject: `Lab Testing Appointment `, // Email subject
    
        // HTML content of the email
        html: `
            <p>Dear ${name},</p>
            <p>Thank you for booking an appointment with Sunrise Diagnostics & Speciality Lab.</p>
            
            <p>Your appointment details:</p>
            <ul>
                <li><strong>Date:</strong> ${date}</li>
                <li><strong>Time:</strong> ${time}</li>
                <li><strong>Category:</strong> ${category}</li>
                <li><strong>Subcategory:</strong> ${subcategory}</li>
            </ul>
            
            <p>Should you have any questions or need further assistance, please do not hesitate to contact us. Our contact information is provided below:</p>
            
            <p><strong>Phone:</strong> +91 95524 47349</p>
            <p><strong>Email:</strong> sunrised2017@gmail.com</p>
            
            <p>We look forward to seeing you on ${date} at ${time} for your appointment. Thank you for choosing Sunrise Diagnostics & Speciality Lab for your diagnostic needs.</p>
            
            <p>Best regards,<br>Sunrise Diagnostics & Speciality Lab Team</p>
        `,
    };
    
    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email', error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.sendStatus(200); // Email sent successfully
        }
    });
    
};




module.exports={Getdata,
    Adduser,
    FindUser,
    UpdateUser,
    verifyMail,
    verifyLogin,
    userlogout,
    DeleteUser,
    forgotpass,
    forgotpasswordLoad,
    resetpass,
    Upload,
    FilesAllData,
    FileSingleData,
    DownloadFile,
    DeleteFile,
    getFeedback,
    addFeedback ,
    deleteFeedback,
    getInformation,
    addEditInformation,
    deleteInformation,
    editInformation,
    getAppointment,
    postAppointment,
    deleteAppointment,
    sendContactEmail,
    sendMailForAppointment
}








// router.delete("/delete/:id",async(req,res)=>{
//     const deleteData= await Crud.findById(req.params.id);
//     const data=await Crud.findByIdAndRemove(deleteData)
//         res.json(data)
//     console.log("deleted")


    
// })

