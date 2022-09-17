
import React,{useState} from 'react'
import "./Login.css"

import ImageCard from "./ImageCard";
import login from "./Images/login.jpg";
import validator from 'validator'
import Swal from 'sweetalert2';

import { useNavigate } from "react-router-dom";
import { ThreeCircles } from  'react-loader-spinner'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function Login() {
  const navigate = useNavigate();
  const [data,setdata]=useState([]);
  const [spinner, setSpinner] = useState(false);
  const [user_type, setUser_type] = useState("user");
  const [router, setrouter] = useState("http://localhost:8080/registration");
  
 function handle(e){
     e.preventDefault();
   const name = e.target.name;
    const value = e.target.value;
    setdata({...data,[name]:value,user_type});
      // setdata({...data,user_type});
    console.log(data);
 }



function handleuser(e){
  setUser_type(e.target.value);
}

async function validation(e){
    
    e.preventDefault();
    const email=data.email;
    const pass1=data.password;
    const pass2=data.confirmPassword;
    if(email===undefined||pass1===undefined||pass2===undefined){
      Swal.fire({
       
        title:"Email or Password field are empty",
        text:'email and password fields are mandatory',
        icon:'info',
        confirmButtonText:'Cancel'

       })
    }
   else
    if (validator.isEmail(email)) {

      if (validator.isStrongPassword(pass1, {
        minLength: 8, minLowercase: 1,
        minUppercase: 1, minNumbers: 1, minSymbols: 1
      })){
        if(pass2===pass1){
          setSpinner(true);
          console.log (data);
          if(user_type==="club_admin"){
            setrouter("http://localhost:8080/clubRegistration");
          }
          console.log(router);
          const res = await fetch(router,{
        method:"POST",
        headers :{
          "Content-Type" : "application/json"
        },
        body:JSON.stringify(data)
          })
      const resData=res.json();
     console.log(res);
      if(res.status === 400|| !resData||res.status === 404){
      setSpinner(false);
      
      Swal.fire({
       
       title:"Email is already registered",
       text:'Try with new email',
       icon:'info',
       confirmButtonText:'Cancel'

      })
    } if(res.status===201){
      setSpinner(false);
      
       navigate('/Login');
       Swal.fire({
       
        title:"Verification link sent to your mail, please check it",
        text:'Click to that link for email verification',
        icon:'success',
        confirmButtonText:'Cool'

       })
      
      }}
    else{
      setSpinner(false);
      Swal.fire({
       
        title:"New Password and Confirm Password does not match ",
        text:'Check your password',
        icon:'error',
        confirmButtonText:'Close'

       })
    }
    }
      else{
        setSpinner(false);
        Swal.fire({
       
          title:"Weak password",
          text:'Your password need to include both lower and upper case characters, at least one number, at least one symbol and be at least 8 characters long.',
          icon:'info',
          confirmButtonText:'Cancel'
  
         })
      }
      } else {
        setSpinner(false);
        Swal.fire({
       
          title:"Invalid Email",
          text:'Please enter correct email',
          icon:'error',
          confirmButtonText:'Close'
  
         })
      }
    
    
}


    return <>
     {spinner? (
    <div style={{marginTop:"50vw",display:"flex",justifyContent:"center"}}>
    <ThreeCircles
  color="blue"
  height={110}
  width={110}
  ariaLabel="three-circles-rotating"
/>
    </div>
      ) : (<>
        <ImageCard img={login} title="" size="70" align="left" ml="4%"/>
    <div className='container div1'>
      <h1 >Signup</h1>
        <form  className="formdiv">
        <div className='container-fluid' style={{display:"flex",justifyContent:"center"}}>
        <ToggleButtonGroup
  color="primary"
  value={user_type}
  
  exclusive
  onChange={handleuser}
>
  <ToggleButton value="user" style={{fontWeight:"900"}}>User</ToggleButton>
  <ToggleButton value="club_admin" style={{fontWeight:"900"}}>admin</ToggleButton>
  
</ToggleButtonGroup>
</div>
{ user_type==="club_admin" ? (
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Club Name</label>
          <input type="text" class="form-control" name="club_name" onChange={handle} id="exampleInputEmail1" aria-describedby="emailHelp"/>
          
        </div>):<div></div>}
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Full Name</label>
          <input type="text" class="form-control" name="name" onChange={handle} id="inputName"/>
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Email Id</label>
          <input type="email" class="form-control" name="email" onChange={handle} id="exampleIputEmail1" aria-describedby="emailHelp"/>
          
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Mobile No.</label>
          <input type="tel" class="form-control" name="mobile_no" onChange={handle} id="examleInputEmail1" aria-describedby="emailHelp"/>
          
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Registration No.</label>
          <input type="text" class="form-control" name="reg_no" onChange={handle} id="exampleInputEail1" aria-describedby="emailHelp"/>
          
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Roll No.</label>
          <input type="text" class="form-control" name="roll_no" onChange={handle} id="exmpleInputEmail1" aria-describedby="emailHelp"/>
          
        </div>
        
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Branch</label>
          <input type="text" class="form-control" name="branch" onChange={handle} id="exampleInptEmail1" aria-describedby="emailHelp"/>
          
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Course</label>
          <input type="text" class="form-control" name="course" onChange={handle} id="exampleInputmail1" aria-describedby="emailHelp"/>
          
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Year Of Study</label>
          <input type="text" class="form-control" name="year_of_study" onChange={handle} id="inptInstitute"/>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">New Password</label>
          <input type="password" class="form-control" name="password" onChange={handle} id="exampleInputPassord1"/>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Confirm Password</label>
          <input type="password" class="form-control" name="confirmPassword" onChange={handle} id="exampleInputPassword2"/>
        </div>
        <div className='butt'>
        <button type="submit" onClick={validation} class="btn button">SignUp</button></div>
        
      </form>

      </div></>
      )}
    
      </>
    
}
