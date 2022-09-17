import React from "react";
import MailTwoToneIcon from '@mui/icons-material/MailTwoTone';
import ReactTooltip from "react-tooltip";

function InterviewExperienceCard(props){
    return <>
<div className="container-fluid mt-3 pt-5">
  <div class="card border-success mb-3 col-10 offset-1 " >
    <div class="card-header bg-transparent border-success d-flex justify-content-between ">
      <div style={{width:"30%",height:"80px"}}>
        <img src="{props.img}" alt={props.company_name}   style={{objectFit:"fill",width:"100%",height:"100%"}}/>
      </div>
          <h3 className="align-item-center">{props.desc}</h3>

     </div>
  </div>
  <div class="card-footer bg-transparent border-success pb-4">
  <strong>STATUS : </strong>
   <span class="card-text" data-tip data-for="registerTip" style={{color:"blue"}} >{window.location.pathname==="/"? "Verified" : props.status }</span>
   <ReactTooltip id="registerTip" place="top" effect="solid" >
   {window.location.pathname==="/"? "The post is verified by administrator." :( "your post is "+ props.status) }
      </ReactTooltip>
  </div>
</div>
S
    </>
}
export default InterviewExperienceCard;