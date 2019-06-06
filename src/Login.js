import React, {useState} from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import { postLogin } from "./Api";
import { setAlert } from "./actions/alert";
import { connect } from "react-redux";
import { SET_ALERT } from "./actions/types";
import  Alert from "./layouts/Alert";
import "./Register-Login.css";
import PropTypes from "prop-types";
import { setUser } from "./actions/user";


const Login = ({history, alert, setAlert, setUser}) =>  {
    
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    })

    const { username, password } = formData;


   const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
}

   const login = () => {
       let alertMessage = "Username/Password incorrect"
        if(!username || !password){
            setAlert(alertMessage, SET_ALERT);
            return;
        }
        postLogin(username, password)
        .then(data => {
            console.log(data)
            if(data['token']){
                setUser(data['user'])
                history.push("/dashboard")
            } else {
                setAlert(data["message"], SET_ALERT)
            }
        })
    
    }

        return (
            <div className="container1">
                <Paper>
                    <CssBaseline />
                    <div >
                        <Card className="cardStyleLogin" raised >
                            <div >
                                <CardContent>
                                    <i className="material-icons">
                                        lock
                                    </i>
                                    <Typography variant="h5">
                                        Login
                            </Typography>
                                </CardContent>
                                <CardContent>
                                    <Typography variant="h5" component="h2">
                                        <Input placeholder="Username" value={username} name="username" onChange={handleChange} />
                                    </Typography>
                                    <Typography >
                                        <Input type="password" placeholder="Password" onChange={handleChange} name="password" value={password} />
                                    </Typography>
                                </CardContent>
                            </div>
                            <CardActions style={{ justifyContent: 'center' }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="SomeName"
                                            value="SomeValue"
                                        />
                                    }
                                    label="Remember me?" />
                            </CardActions>
                            <CardContent style={{paddingBottom: "8%"}}>
                                <CardActions style={{ justifyContent: 'center' }}>
                                    <Button variant="contained" size="large" color="primary" onClick={login}>
                                        Enter
                        </Button>
                                </CardActions>
                                {alert ? <Alert /> : ""}
                            </CardContent>
                        </Card>
                    </div>
                </Paper>
            </div>
        )

        Login.propTypes = {
            setAlert: PropTypes.func.isRequired
        }
    }

    const mapStateToProps = state => {
        return {
            alert: state.alert 
        }
    }



export default connect(mapStateToProps, {setAlert, setUser} )(Login);