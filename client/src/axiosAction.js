import axios from 'axios';

export const getData = async() => {
    var data = await axios.get("http://localhost:8080/")
    console.log(data)
    return data
}

export const Adduser = async (data) => {
    var res = await axios.post("http://localhost:8080/Adduser", data)
    console.log(res)
    
}

export const Deleteuser = async (id) => {
    var data = await axios.delete(`http://localhost:8080/Deleteuser/${id}`)
    console.log(data)
    return data
}

export const updateStudent = async({id,firstname,lastname,location,email,dob,education}) => {
    var res = await axios.put(`http://localhost:8080/updateStudent`, {
        id: id,
        firstname: firstname,
        lastname: lastname,
        location: location,
        email: email,
        dob: dob,
        education:education
    })
    console.log(res)
}
