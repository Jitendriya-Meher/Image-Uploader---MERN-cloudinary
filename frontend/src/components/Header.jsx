import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <Navbar expand="lg" bg="dark" variant='dark' style={{height:"60px"}}>
      <Container>
        <NavLink to={"/"} className="text-decoration-none text-light">
            Home
        </NavLink>
        <NavLink to={"/register"} className="text-decoration-none text-light">
            Register
        </NavLink>
      </Container>
    </Navbar>
  )
}

export default Header