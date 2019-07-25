import React from 'react';
//import './Authorization.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class Authorization extends React.Component {
    state = {
        email: "",
        pwd: "",
        id: ""
    }

    notify(err) {
        toast.error(`${err}`, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true
        });
    }

    render() {
        return (
            <div className="Authorization">
                <ToastContainer />
                <header className="Authorization-header">Authorization</header>
                <div className="creds">
                    <div className="email-block">
                        <p className="email-p">Email :</p>
                        <input
                            type="text"
                            className="email-value"
                        />
                    </div>
                    <div className="pwd-block">
                        <p className="pwd-p">Password :</p>
                        <input
                            type="text"
                            className="pwd-value"
                        />
                    </div>
                    <div className="but-block">
                        <input
                            type="submit"
                            className="login"
                        >Sign in</input>
                        <input
                            type="submit"
                            className="register"
                        >Register</input>
                    </div>
                </div>
            </div>
        )
    }
}