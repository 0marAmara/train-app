import {Link} from "react-router-dom";
import React from "react";

const Navbar = (props) => {

    const signoutHandler = () => {
        props.setUser({});
        props.setUserId('');
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">Train App</Link>
                {(props.userId === '') ? (
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                    </ul>
                ) : (<ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/login" onClick={signoutHandler}>Sign
                            Out</Link>
                    </li>
                </ul>)}

            </div>
        </nav>
    );
};

export default Navbar;
