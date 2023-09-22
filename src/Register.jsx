import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { auth } from './firebase-config';

function Register() {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password).then(() => {
      navigate("/");
    })
      .catch((err) => {
        setError(err?.code);
      });
  }
  return (
    <>
      <div>Register</div>
      <Form Form onSubmit={(e) => onSubmit(e)}>
        < InputField type='text' placeholder='Enter email' required onChange={(e) => setEmail(e.target.value)} />
        < InputField type='password' placeholder='Enter password' required onChange={(e) => setPassword(e.target.value)} />
        <Button>Submit</Button>
        <br />
        {error && <span className='error'>{error}</span>}
      </Form>
    </>
  )
}

export default Register;

const Form = styled.form`
width: 30%;
margin: 0 auto;
border: 2px solid #f9f9f9;
padding: 20px;

:last-child{
  margin-bottom: 0;
}
`;

const InputField = styled.input`
hight: 40px;
width: 100%;
border: 1px solid #f2f2f2;
outline: none;
borfer-radius: 4px;
margin-bottom: 10px;
padding: 0;
font-size: 20px;
`;

const Button = styled.button`
background-color: orange;
border: 1px solid #f9f9f9;
outline: none;
border-radius: 0 !important;
padding: 10px 20px;
color: white;
font-size: 20px;
`;