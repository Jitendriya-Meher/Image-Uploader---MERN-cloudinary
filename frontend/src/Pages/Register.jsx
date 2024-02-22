import axios from 'axios';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const [name, setName] = useState("");
    const [file, setFile] = useState("");
    const navigate = useNavigate();
    
    const addUser = async (e) => {
        e.preventDefault();
        try{
          const formData = new FormData();
          formData.append("photo",file);
          formData.append("name",name);
  
          const config = {
              headers:{
                  "Content-Type":"multipart/form-data"
              }
          }
  
          const res = await axios.post("http://localhost:4000/register",formData,config);

            if( res.data.status === true){
              navigate("/");
            }
            else{
              alert("error");
            }

        }
        catch(err){
            console.log(err.message);
        }
    }

  return (
    <>     
    <div className="container mt-3">
        <h1>
            Upload your Image Here
        </h1>
    <Form onSubmit={addUser}>

      <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
        <Form.Label>Your Name</Form.Label>
        <Form.Control type="text" placeholder="Enter your name"
        onChange={(e) => {
            setName(e.target.value);
        }} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Your Image</Form.Label>
        <Form.Control type="file"
            onChange={(e) => {
                setFile(e.target.files[0]);
            }}
        />
      </Form.Group>

      
      <Button variant="primary" type="submit" >
        Submit
      </Button>
    </Form>
    </div>
    </>
  )
}

export default Register