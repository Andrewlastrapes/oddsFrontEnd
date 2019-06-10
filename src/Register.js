import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import { connect } from "react-redux";
import { setAlert } from "./actions/alert";
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import "./Register-Login.css"
import PropTypes from "prop-types";
import Alert from "./layouts/Alert";
import { postUserRoute } from "./Api";
import { SET_ALERT } from './actions/types';



const Register = ({ setAlert, history, alert }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        password2: ''
    })
    const { username, password, password2 } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const toLogin = () => {
        history.push("/login")
    }

    const register = () => {
        let alertMessage = "Passwords do no match"

        if ((!username || !password || !password2) || (password !== password2)) {
            setAlert(alertMessage, SET_ALERT);
            return;
        }
        let data = {
            username: username,
            password: password
        }
        postUserRoute(data, "register")
            .then(data => {
                console.log(data)
                history.push("/login")
            })

    }

    return (
        <div className="container1">
            <CssBaseline />
            <Paper>
                <Card className="cardStyleRegister" raised>
                    <CardContent>
                        <i className="material-icons">
                            lock
                            </i>
                        <Typography gutterBottom variant="h5" component="h2">
                            Register
                            </Typography>
                        <Typography variant="h5" component="h2">
                            <Input placeholder="Email" value={username} name="username" onChange={handleChange} />
                        </Typography>
                        <Typography >
                            <Input type="password" placeholder="Password" onChange={handleChange} name="password" value={password} />
                        </Typography>
                        <Typography >
                            <Input type="password" placeholder="Confirm Password" onChange={handleChange} name="password2" value={password2} />
                        </Typography>

                    </CardContent>
                    <CardContent>
                        <CardActions style={{ justifyContent: 'center' }}>
                            <Button variant="contained" size="large" color="primary" onClick={register}>
                                Enter
                                </Button>
                        </CardActions>
                        {alert ? <Alert /> : ''}
                        <Typography onClick={toLogin}>Already registered? Click here.</Typography>
                    </CardContent>
                </Card>
            </Paper>
        </div>


    )
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
}

const mapStateToProps = state => {
    return {
        alert: state.alert
    }
}


export default connect(mapStateToProps, { setAlert })(Register);