import React,{useState} from "react";
import "./FormCard.css"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AddIcon from '@mui/icons-material/Add';
import RemoveSharpIcon from '@mui/icons-material/RemoveSharp';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Form(){
  let navigate=useNavigate();

  const [data, setData]=useState();
let name,value;
  function handleInputs(e){
    name = e.target.name;
    value = e.target.value;
    setData({...data,[name]:value});
  }
 
  
  
  
  async function fun(){
   
    console.log(data);

    
      const res = await fetch('/account',{
        method: "POST",
        headers: {
          Accept:"application/json",
          "Content-Type":"application/json"
        },
        credentials: "include",
        body:JSON.stringify(data)
      });
      const resData=res.json();
  if(res.status === 401|| !resData){
   // navigate("/login");
   alert(res.status);
    Swal.fire({
     
       title:"Invalid Credentials",
       text:'Error',
       icon:'error',
       confirmButtonText:'Cancel'

      })
  }
  else{
  navigate("/club_admin");
    Swal.fire({
       
       title:"post Successful",
       position:"top",
       icon:'success',
       showConfirmButton:false,
       timer:2000

      })
    }




    
    
  }
  

    return <>
    <form>
    <div class="mb-4">
  <label for="exampleFormControlInput1" class="form-label">Upload Event Image</label>
  <input type="file" name="img" onChange={handleInputs} class="form-control" id="exampleFormControlInput1" placeholder="fUpload Event Image"/>
</div>

 <div class="mb-4">
  <label for="exampleFormControlInput1" class="form-label">Enter Event Discription</label>
  <input type="text" name="disc" onChange={handleInputs} class="form-control" id="exampleFormControlInput1" placeholder="Discription"/>
</div>

<div class="mb-4">
<label for="exampleFormControlInput1" class="form-label">Put Google Form Link</label>
  <input type="uel" name="url" onChange={handleInputs} class="form-control" id="exampleFormControlInput1" placeholder="URL"/>
</div>


s
</form>
      <div className="modal-footer position-relative">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" onClick={fun} className="btn btn-primary">Post</button>
      </div>
    </>
};
export default Form;