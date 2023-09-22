import React, { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { firestore, storage } from "./firebase-config";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

function EmployeeHandler() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const [profile, setProfile] = useState("");
    const [preview, setPreview] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [dob, setDob] = useState("");
    const [password, setPassword] = useState("");
    const [userId, setUserId] = useState("");
    const [showModal, setShowModal] = useState(false);

    const dbCollection = collection(firestore, "users");

    async function onSubmit(e) {
        e.preventDefault();
        const commonObject = { name, email, gender, dob, profile, password };
        if (userId) {
            delete commonObject.password;
            const dbCollection2 = doc(firestore, "users", userId);
            await updateDoc(dbCollection2, commonObject);
            const updateList = users.map((item) => {
                if (item.id === userId) {
                    return { ...item, ...commonObject };
                } else {
                    return item;
                }
            });
            setUsers(updateList);
        } else {
            await addDoc(dbCollection, commonObject);
            setUsers([...users, commonObject]);
        }
        setShowModal(false);
    }

    async function onDelete(id) {
        const dbCollection2 = doc(firestore, "users", id);
        await deleteDoc(dbCollection2);
        const deletedList = users.filter((item) => item.id !== id);
        setUsers(deletedList);
    }
    function onUpdate(item) {
        setUserId(item.id);
        setName(item.name);
        setEmail(item.email);
        setGender(item.gender);
        setDob(item.dob);
        setShowModal(true);
        setPreview(item.profile);
        setProfile(item.profile);
        setShowModal(true);
    }

    function addEmployee() {
        setShowModal(true);
        setUserId("");
        setName("");
        setEmail("");
        setGender("");
        setDob("");
        setPreview("");
        setProfile("");
    }

    function onUploadProfile(file) {
        setPreview(URL.createObjectURL(file));
        const imageRef = ref(storage, `/images/${file.name}-${Date.now()}`);
        uploadBytes(imageRef, file)
            .then(async (ref) => {
                const url = await getDownloadURL(ref.ref);
                setProfile(url);
            })
            .catch((err) => {
                console("err", err);
            });
    }

    useEffect(() => {
        async function getUsers() {
            const userList = await getDocs(dbCollection);
            const formattedUser = userList.docs.map((doc) => {
                return {
                    ...doc.data(),
                    id: doc.id,
                };
            });
            setUsers(formattedUser);
        }
        getUsers();
    }, []);

    return (
        <div>
            <div className="d-flex justify-content-end m-4">
                <Button className="btn-primary" onClick={addEmployee}>
                    Add Employee
                </Button>
            </div>
            <Table striped bordered hover responsive variant="dark">
                <thead>
                    <th style={{ color: "black" }}>No</th>
                    <th style={{ color: "black" }}>Profile</th>
                    <th style={{ color: "black" }}>Name</th>
                    <th style={{ color: "black" }}>Email</th>
                    <th style={{ color: "black" }}>Gender</th>
                    <th style={{ color: "black" }}>DOB</th>
                    <th style={{ color: "black" }}>Action</th>
                </thead>
                <tbody>
                    {users.map((item, index) => (
                        <tr>
                            <td>{index + 1}</td>
                            <td>
                                {item.profile ? (
                                    <img
                                        width="20px"
                                        height="20px"
                                        className="rounded-circle"
                                        src={item.profile}
                                    />
                                ) : (
                                    <img
                                        width="20px"
                                        height="20px"
                                        className="rounded-circle"
                                        src="https://as1.ftcdn.net/v2/jpg/05/16/27/58/1000_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg" />
                                )
                                }
                            </td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.gender}</td>
                            <td>{item.dob}</td>
                            <td>
                                <Button
                                    onClick={() => onDelete(item.id)}
                                    className="me-2 btn-danger"
                                >
                                    <i className="fa-solid fa-trash" />
                                </Button>
                                <Button onClick={() => onUpdate(item)} className="btn-warning">
                                    <i className="fa-solid fa-pencil" />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal
                show={showModal}
                backdropClassName="overlayBack"
                onHide={() => setShowModal(false)}
            >
                <Modal.Header style={{ textTransform: "uppercase" }} closeButton>
                    {userId ? "Update Employee" : "Add Employee"}
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="form-group mt-0 my-4">
                            <input
                                className="form-control"
                                value={name}
                                type="text"
                                placeholder="Enter name"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="form-group my-4">
                            <input
                                className="form-control"
                                value={email}
                                type="text"
                                placeholder="Enter email"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="form-group my-4">
                            <input
                                className="me-2"
                                type="radio"
                                name="gender"
                                value="Male"
                                checked={gender === "Male"}
                                required
                                onChange={(e) => setGender(e.target.value)}
                            />
                            <label>Male</label>
                            <input
                                className="mx-2"
                                type="radio"
                                name="gender"
                                value="Female"
                                checked={gender === "Female"}
                                required
                                onChange={(e) => setGender(e.target.value)}
                            />
                            <label>Female</label>
                        </div>

                        <div className="form-group my-4">
                            <input
                                className="form-control"
                                type="date"
                                value={dob}
                                required
                                onChange={(e) => setDob(e.target.value)}
                            />
                        </div>
                        <div className="form-group my-4">
                            <input
                                className="form-control"
                                type="file"
                                required
                                onChange={(e) => onUploadProfile(e.target.files[0])}
                            />
                            <img width="20px" height="20px" src={preview} alt="" />
                        </div>

                        {!userId && (
                            <div className="form-group my-4">
                                <input
                                    className="form-control"
                                    type="password"
                                    placeholder="Enter password"
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        )}
                        <Button type="submit" className="btn-success">
                            Submit
                        </Button>
                        <br />
                        {error && <span className="error">{error}</span>}
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default EmployeeHandler;