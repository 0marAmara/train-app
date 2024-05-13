import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Login from './Login/Login';
import Register from './Register/Register';
import UserHome from './Homepage/UserHome';
import AdminHome from "./Homepage/AdminHome";

import 'bootstrap/dist/css/bootstrap.css';

const App = () => {
    const [userId, setUserId] = useState('');
    const [user, setUser] = useState({});

    return (
        <Router>
            <div>
                <Navbar userId={userId} setUser={setUser} setUserId={setUserId}/>
                <Routes>
                    <Route exact path="/" element={<Login setUserId={setUserId} setUser={setUser}/>}/>
                    <Route path="/login" element={<Login setUserId={setUserId} setUser={setUser}/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/user-home" element={<UserHome userId={userId} user={user} setUser={setUser}/>}/>
                    <Route path="/admin-home" element={<AdminHome userId={userId} user={user}/>}/>
                </Routes>
            </div>
        </Router>
    );
};

export default App;
