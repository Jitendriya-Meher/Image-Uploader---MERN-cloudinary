import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { NavLink } from 'react-router-dom';

const Home = () => {

    const [data, setData] = useState([]);

    const getUsers = async () => {
        const usersData = await axios.get("http://localhost:4000/users");

        // console.log(usersData);
        setData(usersData.data.users);
    }

    const handleDelete = async(id) => {
        // console.log("id: ",id);
        const res = await axios.post("http://localhost:4000/delete",{
            id
        });
        // console.log("delete",res);

        if( res.data.status === true){
            getUsers();
        }
        else{
            alert("error");
        }

    }

    useEffect(()=>{
        getUsers();
    },[]);

  return (
    <>
        <div className="container mt-3">
            <h1>
                MERN Image Uploader 
            </h1>
            <div className="text-end">
                <NavLink to={"/register"}>
                    <Button variant="primary" >
                        Add User 
                    </Button>
                </NavLink>
            </div>

            <div className="d-flex row justify-content-between align-items-center mt-5">

            {
                data.map((user) => (
                    <Card style={{ width: '22rem' }} className='mb-3'>
                        <Card.Img variant="top" src={user.imgPath} style={{width:"100%",textAlign:"center",margin:"auto"}} className='mt-2' />
                        <Card.Body>
                            <Card.Title>
                                {user.name}
                            </Card.Title>
                            <Card.Text>
                                Date Added : {moment(user.date).format("L")}
                            </Card.Text>
                            <Button variant="danger" className='col-lg-6 text-center'
                            onClick={() => {
                                handleDelete(user._id);
                            }}
                            >
                                Delete 
                            </Button>
                        </Card.Body>
                    </Card>
                ))
            }

            </div>
        </div>
    </>
  )
}

export default Home