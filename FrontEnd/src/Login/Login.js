import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useNavigate();

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Send the username and password to the backend for authentication
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password}),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    // Set the user ID and redirect to the appropriate homepage based on the user's role
                    props.setUserId(data.userId);
                    props.setUser(data);
                    if (data.role === 'Administrator') {
                        history('/admin-home');
                    } else {
                        history('/user-home');
                    }
                } else {
                    alert('Login failed');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (

        <div className="container">
            <h1 className="mt-4">Login Page</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        value={username}
                        onChange={handleUsernameChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                </div>

                <div className="mt-3">
                    <button type="submit" className="btn btn-primary">Login</button>
                </div>
            </form>
        </div>


    );
};

export default Login;
