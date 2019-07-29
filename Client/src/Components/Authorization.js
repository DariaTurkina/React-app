import React from 'react';
import './Authorization.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const axios = require('axios');
const path = "http://localhost:1234/users";

const useStyles = makeStyles(theme => ({
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    button: {
        margin: theme.spacing(1),
    },
    input: {
        display: 'none',
    }
}));

export default class Authorization extends React.Component {

    state = {
        email: "",
        pwd: "",
        id: "",
        statusLog: "in"
    }

    notifyError(err) {
        toast.error(`${err}`, {
            position: "top-left",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true
        });
    }

    notifySuccess(text) {
        toast.success(`${text}`, {
            position: "top-left",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true
        });
    }

    readEmailInput = (e) => {
        const { value } = e.target;
        this.setState({ email: value });
    }

    readPwdInput = (e) => {
        const { value } = e.target;
        this.setState({ pwd: value });
    }

    compareUserData() {
        axios.get(`${path}/login`, {
            params: {
                email: this.state.email,
                pwd: this.state.pwd
            }
        })
            .then(res => {
                let { data } = res;
                if (data) {
                    this.notifySuccess(`Authorization was successfully`);
                    this.props.changeStateApp(data._id);
                } else {
                    this.notifyError(`Error, no such user (${this.state.email}) exists!`);
                }
            })
            .catch(() => {
                this.notifyError(`Error, no such user (${this.state.email}) exists!`);
            })
    }

    changeStatusLog() {
        if (this.state.statusLog === "in") {
            this.setState({ statusLog: "up" });
        } else {
            this.setState({ statusLog: "in" });
        }
        this.setState({ email: "" });
        this.setState({ pwd: "" });
    }

    regNewUser() {
        let user = {
            email: this.state.email,
            pwd: this.state.pwd
        }
        axios.post(`${path}/create`, user)
            .then(res => {
                let { DBres } = res.data;
                if (DBres) {
                    this.notifySuccess(`User ${this.state.email} registered successfully`);
                    this.props.changeStateApp(DBres._id);
                } else {
                    this.notifyError(`Error, this email (${this.state.email}) is already taken!`);
                }
            })
            .catch(() => {
                this.notifyError(`Error, this email (${this.state.email}) is already taken!`);
            })
    }

    render() {
        return (
            <div className="Authorization">
                <ToastContainer />
                <header className="Authorization-header">
                    {this.state.statusLog === "in" ? "Authorization" : "Registration"}
                </header>
                <div className="creds">
                    <div className="email-block div-inp">
                        <TextField
                            id="outlined-email-input"
                            label="Email"
                            className={useStyles.textField}
                            value={this.state.email}
                            onChange={(e) => this.readEmailInput(e)}
                            type="email"
                            name="email"
                            autoComplete="email"
                            margin="normal"
                            variant="outlined"
                        />
                    </div>
                    <div className="pwd-block div-inp">
                        <TextField
                            id="outlined-password-input"
                            label="Password"
                            className={useStyles.textField}
                            value={this.state.pwd}
                            onChange={(e) => this.readPwdInput(e)}
                            type="password"
                            autoComplete="current-password"
                            margin="normal"
                            variant="outlined"
                        />
                    </div>
                    <div className="but-block">
                        {this.state.statusLog === "in" &&
                            <Button
                                variant="outlined"
                                className={useStyles.button}
                                onClick={() => this.compareUserData()}
                            >Sign in</Button>
                        }
                        {this.state.statusLog === "in" &&
                            <p className="offerToReg">
                                If you don't have an account, register, please.
                            </p>
                        }
                        <div className="reg-buts">
                            <div className={this.state.statusLog === "up" ? "one reg-buts" : "two reg-buts"}>
                                <Button
                                    variant="outlined"
                                    className={useStyles.button}
                                    onClick={this.state.statusLog === "in" ? () => this.changeStatusLog() : () => this.regNewUser()}
                                >Register</Button>
                            </div>
                            <div className={this.state.statusLog === "up" ? "reg-buts" : "invis"}>
                                <Button
                                    variant="outlined"
                                    className={useStyles.button}
                                    onClick={() => this.changeStatusLog()}
                                >Cancel</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}