import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { auth, firestore, storage } from './firebase-config';
import styled from 'styled-components';
import { Button, Modal } from 'react-bootstrap';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { collection, query, updateDoc, where } from 'firebase/firestore';

function Header() {
  const [imagePreview, setImagePreview] = useState("");
  const [file, setFile] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const profile = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setCurrentUser(currentUser?.email);
    })
  }, []);

  function onLogout() {
    signOut(auth);
    navigate("/login");
  }

  function onUploadProfile(file) {
    setImagePreview(URL.createObjectURL(file))
    setFile(file);
  }

  function onSubmit(e) {
    e.preventDefault();
    const q = query(collection(firestore, "users"), where("email", "==", profile?.email));
    const imageRef = ref(storage, `images/${file.name}${Date.now()}`);
    uploadBytes(imageRef, file).then(async (response) => {
      const url = await getDownloadURL(response.ref);
      await updateDoc(q, { profileImage: url });
    }).catch((err) => {
      console.log('err', err)
    });
  }

  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand><Link className='text-white text-decoration-none' to={"/"}>Navbar</Link></Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link><Link className='text-white text-decoration-none' to={"/"}>Home</Link></Nav.Link>
          <Nav.Link className='text-white text-decoration-none' href="/favorite">Favorite</Nav.Link>
          <Nav.Link className='text-white text-decoration-none' href="/portfolio">Portfolio</Nav.Link>
          <Nav.Link className='text-white text-decoration-none' href="/register">Register</Nav.Link>
          <Nav.Link className='text-white text-decoration-none' href="/login">Login</Nav.Link>
          <Nav.Link className='text-white text-decoration-none' href="/employee">Employee</Nav.Link>
        </Nav>
        {currentUser || profile && (
          <Navbar className='justify-content-end'>
            <Profile>
              {profile ? <img src={profile?.profileImage} /> : currentUser?.at(0)}
              <div className='profile-modal'>
                <div onClick={onLogout}>Logout</div>
                <div onClick={() => setShowModal(true)}>Profile</div>
              </div>
            </Profile>
          </Navbar>
        )}
      </Container>
      <Modal
        show={showModal}
        backdropClassName="overlayBack"
        onHide={() => setShowModal(false)}
      >
        <Modal.Header style={{ textTransform: "uppercase" }} closeButton>Upload profile</Modal.Header>
        <Modal.Body>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-group mt-0 my-4">
              <input
                className="form-control"
                type="file"
                onChange={(e) => onUploadProfile(e.target.files[0])}
              />
              <img width="80px" height="80px" className='rounded-circle mt-4' src={imagePreview} alt="" />
            </div>

            <Button type="submit" className="btn-success">
              Submit
            </Button>
            <br />
            {error && <span className="error">{error}</span>}
          </form>
        </Modal.Body>
      </Modal>
    </Navbar>
  )
}

export default Header;

const Profile = styled.div`
height: 40px;
line-height: 40px;
width: 40px;
background: green;
color: white;
border-radius: 50%; 
text-transform: uppercase;
cursor: pointer;

.profile-modal{
    position: absolute;
    left: 0;
    bottom: -80px;
    padding: 5px 10px;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    display: none;
    align-items: center;
}
&:hover{
    .profile-modal{
    display: block;
}}
`;