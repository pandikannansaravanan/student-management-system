import React, { useState } from "react";
import "./styles.css";
import { Adduser } from "./axiosAction";
import { useNavigate } from "react-router-dom";
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
//import { useForm } from 'react-hook-form';

export default function Newuser() {
  let history = useNavigate()
  //const [error,setError] = useState(false)

  const [users, setUsers] = useState({ firstname: "", lastname: "", location: "", email: "", dob: "", education: "", about: "", iseditmode: "false" })
  
  const { firstname, lastname, location, email, dob, education, about } = users

  const onInputChange = (e) => {
    setUsers({...users,[e.target.name]:e.target.value})
  }

  const onSumbit = (e, err) => {
    if (err) { console.log(err) }

    else if (firstname.length === 0 || lastname.length === 0 || location.length === 0 ||
      email.length === 0 || dob.length === 0 || education.length === 0 || about.length === 0) { alert("Empty text box can't be allow") }
    else {
      e.preventDefault()
      Adduser(users).then(alert("Record Added Successfully"))
    }
  }

  const back = () => {
    history("/")
  }

  // const onSubmit = (data) => {
  //   console.log(data)
  // }

  // const { register, handlesubmit, errors } = useForm();
  
  // console.log(errors);

  return (
    <>
      <IconButton aria-label="done" size="small" id="arrow"
        onClick={() => back()}><ArrowBackIcon /></IconButton><br />
      <div className="App1">
      <label className="lable">Firstname<span>:</span></label>
        <input type="text"
          name="firstname"
          value={firstname}
          onChange={(e) => { onInputChange(e) }}
          //ref={register}
          autoFocus required />
        
        <label className="lable" style={{marginLeft:"10%"}}>Lastname<span>:</span></label>
        <input type="text"
          name="lastname"
          value={lastname}
          onChange={(e) => { onInputChange(e) }}
          style={{ marginLeft: "5%" }}
          //ref={register}
          required/><br />
        
      <label className="lable">Location<span>:</span></label>
        <input type="text"
          name="location"
          value={location}
          onChange={(e) => { onInputChange(e) }}
          //ref={register}
          required /><br />
        
          {/* {error && firstname.length <= 0 ? <small class="small"><li/>Firstname Can't be empty</small> : ""}
          {error && location.length <= 0 ? <small class="small"><li/>Location Can't be empty</small> : ""}
          {error && lastname.length <= 0 ? <small class="small">Lastname Can't be empty</small> : ""}
          {error && email.length <= 0 ? <small class="small">Email Can't be empty</small> : ""}
          {error && dob.length <= 0 ? <small class="small">DOB Can't be empty</small> : ""}
          {error && education.length <= 0 ? <small class="small">Education Can't be empty</small> : ""}
          {error && about.length <= 0 ? <small class="small">About Can't be empty</small> : ""}</ul> */}
        


      <label className="lable">Email<span>:</span></label>
        <input type="text"
          name="email"
          value={email}
          onChange={(e) => { onInputChange(e) }}
          //ref={register}
          required /><br />
        
      <label className="lable">DOB<span>:</span></label>
        <input type="date"
          name="dob"
          value={dob}
          onChange={(e) => { onInputChange(e) }}
          //ref={register}
          required /><br />
        
      <label className="lable">Education<span>:</span></label>
        <input type="text"
          name="education"
          value={education}
          onChange={(e) => { onInputChange(e) }}
          //ref={register}
          required /><br />
        
      <label className="lable">About<span>:</span></label>
        <textarea name="about"
          value={about}
          onChange={(e) => { onInputChange(e) }}
          //ref={register}
          required /><br />
        <button className="button2" onClick={(e) => { onSumbit(e) }}>Sumbit</button>
      </div>
  
</>
  );
}
