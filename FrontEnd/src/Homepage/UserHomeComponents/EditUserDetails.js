import React, {useState} from "react";

const EditUserDetails = (props) => {
    const [showEditUserForm, setShowEditUserForm] = useState(false);
    const [username, setUsername] = useState(props.user.username);
    const [email, setEmail] = useState(props.user.email);
    const [address, setAddress] = useState(props.user.address);
    const [phoneNumber, setPhoneNumber] = useState(props.user.phoneNumber);
    const [password, setPassword] = useState(props.user.password);

    const handleUpdateUser = (event) => {
        event.preventDefault();

        const updatedUser = {
            username,
            email,
            address,
            phoneNumber
        };

        fetch(`http://localhost:3000/users/${props.userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUser),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    console.error('Error updating user:', data.error);
                } else {
                    console.log('User updated successfully');
                    setShowEditUserForm(false);
                    props.setUser({...props.user, username})
                    window.location.href('http://localhost:3001/')
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const handleDeleteUser = () => {
        fetch(`http://localhost:3000/users/${props.userId}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    console.error('Error deleting user:', data.error);
                } else {
                    props.setDeletedUserId(props.userId);
                    props.setUser({...props.user, username})

                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const handleEditUserDetails = () => {
        setShowEditUserForm(true);
    };

    const handleFormChange = (event) => {
        const {name, value} = event.target;

        if (name === 'username') {
            setUsername(value);
        } else if (name === 'email') {
            setEmail(value);
        } else if (name === 'address') {
            setAddress(value);
        } else if (name === 'phoneNumber') {
            setPhoneNumber(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };


    return <>
        <button className="btn btn-primary" onClick={handleEditUserDetails}>
            Edit User Details
        </button>

        {showEditUserForm && (
            <div className="mt-4">
                <h2>Edit User Details</h2>
                <form onSubmit={handleUpdateUser}>
                    <div className="form-group">
                        <label>Username:</label>
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={handleFormChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={handleFormChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={handleFormChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Address:</label>
                        <input
                            type="text"
                            name="address"
                            value={address}
                            onChange={handleFormChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Phone Number:</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={phoneNumber}
                            onChange={handleFormChange}
                            className="form-control"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary mt-3">
                        Save Changes
                    </button>
                    <button
                        className="btn btn-danger mt-3 ml-2"
                        onClick={handleDeleteUser}
                    >
                        Delete User
                    </button>
                </form>
            </div>
        )}
    </>
}

export default EditUserDetails
