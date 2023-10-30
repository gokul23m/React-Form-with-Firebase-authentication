import { useState } from "react";
import { Link } from "react-router-dom";
import {auth} from "../Firebase";
import {signInWithEmailAndPassword} from 'firebase/auth';
import { useNavigate } from "react-router-dom";


function Login() {
    
    const navigate =useNavigate();

    //useState for form controls
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");

    //error state
    const[errors,setErrors]=useState({});

    // form submission
    const handleSubmit=(e)=>{
            e.preventDefault();

             // form validation 
             const validationErrors = {};
        
             //email validation
             if(!email.trim()) {
                 validationErrors.email = "email is required"
             } else if(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)){
                 validationErrors.email = "email is not valid"
             }
         
             //password validation
             if(!password.trim()) {
                 validationErrors.password = "password is required"
             } else if(password.length < 6){
                 validationErrors.password = "password should be at least 6 char"
             }
         
          
             setErrors(validationErrors);

               
                //firebase sign in
                if (!Object.keys(validationErrors).length ) {
                signInWithEmailAndPassword(auth,email,password)
                .then((result) =>{
                      console.log(result);
                      navigate("/Dashboard");
                      alert("Login Successful")
                })
                .catch((err) => {
                    // eslint-disable-next-line default-case
                    switch (err.code) {
                      case "auth/invalid-email":
                      case "auth/user-disabled":
                      case "auth/user-not-found":
                        alert("User Mail not found");
                        break;
                      case "auth/wrong-password":
                        alert("Wrong Password");
                        break;
                    }
                  });
                }            
           
    }
     
    return (
        <form className="form bg-seconday p-4 "  onSubmit={handleSubmit}>
               <h1 >LOGIN</h1>
            
            <div className="mb-3">
                <label htmlFor="" class="form-label" >User Email :</label>
                <input type="email" class="form-control" placeholder="Enter Email"  onChange={(e)=>{setEmail(e.target.value)}}/>
                {errors.email && <span>{errors.email}</span>}  

            </div>
            <div className="mb-4">
                <label htmlFor="" class="form-label">Password:</label>
                <input type="password" class="form-control" placeholder="Enter Password" onChange={(e) => {setPassword(e.target.value)}} />
                {errors.password && <span>{errors.password}</span>}

            </div>
         <div className=" d-flex align-items-center justify-content-center ">
            <button type="submit" class="btn btn-primary mb-3 w-40 " >Sign In</button>
            </div>
            <div>
                <p>Don't have an account?<Link to="/Register">Sign up</Link></p>
            </div>
          </form>
    );
}

export default Login;