import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { auth, firestore } from './firebase-config';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';

function Login() {
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function onSubmit(e) {
        e.preventDefault();
        const q = query(collection(firestore, "users"), where("email", "==", email));
        const userList = await getDocs(q);
        if (userList.size === 0) {
            setError("Invalid credentials")
        } else {
            localStorage.setItem('profile', JSON.stringify(userList.docs[0].data()))
            navigate("/")
        }

        // signInWithEmailAndPassword(auth, email, password).then(() => {
        //     navigate("/");
        // })
        //     .catch((err) => {
        //         setError(err?.code);
        //     });
    }
    return (
        <>
            <div>Login</div>
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

export default Login;

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