import React from 'react';
import "./styles.css";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CancelIcon from '@mui/icons-material/Cancel';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from "react";
import { Deleteuser, getData, updateStudent} from './axiosAction';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
//import { borderBottom } from '@mui/system';
//import { ClassNames } from '@emotion/react';
//import { format } from 'date-fns';


export default function Process() {
  const [studDetails, setStud] = useState([])
  const [previous, setprevious] = useState({})
  const [search, setsearch] = useState("")
  // const [status, setstatus] = useState([{ iseditmode: 'false' }])
  
  let history = useNavigate()
  

  useEffect(() => {
    fetchdata();
  },[])
  
  const fetchdata = async () => {
    const res = await getData();
    console.log(res.data);
    setStud(res.data)
    //return 0
  }

  const deleteStudent = async (id) => {
      const res = await Deleteuser(id);
      setStud(
        studDetails.filter((data) =>
          data.id !== id
        )
      )
      console.log(res.data)
  }

  const editStudent = (id) => {
    const newstudentlist = studDetails.map(data => {
      if (data.id === id) {
        return { ...data, iseditmode: !data.iseditmode };
      }
      return data;
    })
    setStud(newstudentlist);
  }
  
  const onDone = async (id) => {
    setStud(() => {
      return studDetails.map(data => {
        if (data.id === id) {
          console.log(data)
          updateStudent(data)
          return { ...data, iseditmode: !data.iseditmode };
        }
        return data;
      })
    })
  }

  const onCancel = (id) => {
    const newstudentlist = studDetails.map(data => {
      if (data.id === id) {
        return previous[id] ? { ...previous[id], iseditmode: !data.iseditmode } :
          { ...data, iseditmode: !data.iseditmode };
      }
      return data
    })
    setStud(newstudentlist);
    setprevious(state => {
      delete state[id];
      return state
    })
    //editStudent(id)
  }

  const CustomTableCell = ({ data, name, onChange }) => {
    return (
      <TableCell>
        {data.iseditmode ? (
          <input
            key={`input-filed${data[name] + data.id}`}
            value={data[name]}
            name={name}
            onChange={e => onChange(e, data)}
            style={{ borderTop: "none", borderLeft: "none", borderRight: "none" }}
          />
        ) : (
          data[name]
        )}
      </TableCell>
    )
  }

  const onChange = (e, data) => {
    if (!previous[data.id]) {
      setprevious(state => ({ ...state, [data.id]: data }));
    }

    const value = e.target.value;
    const name = e.target.name;
    const { id } = data;
    const newstudentlist = studDetails.map(data => {
      if (data.id === id) {
        return { ...data, [name]: value };
      }
      return data;
    })
    setStud(newstudentlist);
  }

  // const search = (data) => {
  //   return data.filter((item) => item.firstname.include(query))
  // }

  const keys = ["firstname", "lastname", "location", "email", "dob", "education"]
  

  return (
    <>
    <div className="App">
      <b>Student management system</b>
      <div className="box">
        <input type="text" name="" placeholder="Search.." onKeyUp={(e)=>setsearch(e.target.value)}/>
        <span className="search">
          <SearchIcon />
        </span>
      </div>
        <button className='button' onClick={() => history("/add")}>Add</button> 
        <TableContainer component={Paper} id="table">
          <Table sx={{ minWidTableCell: 500 }}
            aria-label="simple table">
            <caption>Student Details</caption>
          <TableHead>
            <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Firstname</TableCell>
            <TableCell>Lastname</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>DOB</TableCell>
            <TableCell>Education</TableCell>
            <TableCell>Action</TableCell>
            <TableCell>Delete</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
        {studDetails.length > 0 ? (
        <>
                  {studDetails.filter((item) => {
                    return (keys.some((key)=>item[key].includes(search)))
                  }).map((data, index) => (
                <TableRow key={data.id}>
                        {/* <TableCell>{data.id}</TableCell>
                        <TableCell>{data.firstname}</TableCell>
                        <TableCell>{data.lastname}</TableCell>
                        <TableCell>{data.location}</TableCell>
                        <TableCell>{data.email}</TableCell>
                        <TableCell>{format(new Date( data.dob ), 'dd / mm / yyyy')}</TableCell>
                        <TableCell>{data.education}</TableCell> */}
                    <CustomTableCell {...{data, name: "id", onChange}} />
                    <CustomTableCell {...{data, name: "firstname", onChange}} />
                    <CustomTableCell {...{data, name: "lastname", onChange}}/>
                    <CustomTableCell {...{data, name: "location", onChange}}/>
                    <CustomTableCell {...{data, name: "email", onChange}}/>
                    <CustomTableCell {...{data, name: "dob", onChange}}/>
                    <CustomTableCell {...{data, name: "education", onChange }} />
                    {data.iseditmode ? (
                    <>
                        <TableCell><IconButton aria-label="done" size="small"
                        onClick={() => onDone(data.id)}><DoneAllIcon fontSize="inherit" /></IconButton>
                        <IconButton aria-label="revert" size="small"
                        onClick={() => onCancel(data.id)}><CancelIcon fontSize="inherit" /></IconButton></TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell><Button variant="black" onClick={() => editStudent(data.id)}
                        startIcon={<EditIcon />}>Edit</Button></TableCell>
                        </>
                        )}
                      <TableCell><Button variant="black" onClick={() => {
                        const confirmBox= window.confirm(
                          "Are you sure you want to Delete..?"
                        )
                        if (confirmBox === true) {
                          deleteStudent(data.id)
                        }
                      }}
                    startIcon={<DeleteIcon />}>Delete</Button></TableCell>
              </TableRow>
        ))}
              </>) : (<p>No Data</p>)}
            </TableBody>
          </Table>
          </TableContainer>
      </div>
    </>
  );
}
