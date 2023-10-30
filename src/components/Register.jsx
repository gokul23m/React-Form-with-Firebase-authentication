import { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../Firebase";
import {  createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
function Register() {
    const navigate =useNavigate();


    //state for form controls
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[confirm,setConfirm]=useState("");

    //state for errors
    const[errors,setErrors]=useState({});

    //form submission
    const handleSubmit = (e) =>{
          e.preventDefault();

       
          // form validation
          const validationErrors = {}
        
      
          if(!email.trim()) {
              validationErrors.email = "email is required"
          } else if( /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)){
              validationErrors.email = "email is not valid"
          }
      
          if(!password.trim()) {
              validationErrors.password = "password is required"
          } else if(password.length < 6){
              validationErrors.password = "password should be at least 6 char"
          }
      
          if(confirm !== password) {
              validationErrors.confirmPassword = "password not matched"
          }
      
          setErrors(validationErrors);

          //firebase signup
          if (!Object.keys(validationErrors).length ) {
           createUserWithEmailAndPassword(auth,email,password)
           .then((result) => {
            alert("Account created successfully");
            console.log(result);
            // after succesfull signup navigating to dashboard page
            navigate("/Dashboard");
           })
           .catch((err) => {
            // error if already existing user tries to signup
             if(err == "auth/email-already-in-use"){
                 alert("User already exist");
             }
          });

        }


       
      
        
    }

    return ( 
        <form className="form bg-seconday p-4" onSubmit={handleSubmit}>
               <h1>Register</h1>
            
            <div className="mb-3">
                <label htmlFor="" class="form-label" >User Email :</label>
                <input type="email" class="form-control" placeholder="Enter Email" onChange={(e)=>{setEmail(e.target.value)}}/>
                {errors.email && <span>{errors.email}</span>}  
            </div>
            <div className="mb-3">
                <label htmlFor="" class="form-label">Password:</label>
                <input type="password" class="form-control" placeholder="Enter Password" onChange={(e)=>{setPassword(e.target.value)}} />
                {errors.password && <span>{errors.password}</span>}  
            </div>
            
            <div className="mb-4">
                <label htmlFor="" class="form-label">Confirm Password:</label>
                <input type="password" class="form-control" placeholder="ReEnter Password" onChange={(e) =>{setConfirm(e.target.value)}} />
                {errors.confirmPassword && <span>{errors.confirmPassword}</span>}  
            </div>
         <div className=" d-flex align-items-center justify-content-center ">
            <button type="submit" class="btn btn-primary mb-3 w-40 " >Sign up</button>
            </div>
            <div>
                Already have an account?<Link to="/">Login</Link>
            </div>
          </form>
     );
}

export default Register;