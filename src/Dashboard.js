import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import IndividualGame from "./individualGame";
import Dialog from '@material-ui/core/Dialog';
import { getGames } from "./Api";
import { setGames } from "./actions/dashboard";
import { connect } from "react-redux";
import { setAlert } from "./actions/alert"
import IndividualGameModal from "./layouts/modal";
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import "./dashboard.css";
import Moment  from "../node_modules/moment/moment";
import { SET_ALERT } from './actions/types';
import Alert from "./layouts/Alert";
import { SUBMITTED_BET } from "./actions/types"




const Dashboard = ({ user, games, setGames, setAlert }) => {

    const [dashState, setDashState] = useState({
        value: 0,
        open: false,
        selectedGame: {},
        date: ''
    });

    const { value, open, selectedGame, date } = dashState;

    useEffect(() => {
       setGamesDashboard(0, "baseball_mlb")
       formatDate()
       setDashState({
           ...dashState,
           date: formatDate()
       });
    }, [])

    const handleChange = (event, value) => {
        let sport;
        switch (value) {
            case 0:
                sport = "baseball_mlb"
                break;
            case 1:
                sport = "basketball_nba"
                break;
            case 3:
                sport = "icehockey_nhl"
        }
        setGamesDashboard(value, sport)

    };

    const setGamesDashboard = (value, sport) => {
        getGames(sport)
        .then(data => setGames(data['data'])
        );
        setDashState({value});
    }


    const openModal = (g) => {
        setDashState({selectedGame: g, open: true});
    }

    const handleClose = (submitted, data) => {
        let totalMoney = data["user"]["money"]
        if(submitted === SUBMITTED_BET){
            setAlert(`Bet submitted. You have $${totalMoney} left in your account`, SET_ALERT)
        }
        setDashState({open: false});
        setGamesDashboard(0, "baseball_mlb")
    }

    const formatDate = () => {
        let moment = Moment
        return moment().format('MMMM Do YYYY');
    }

    const listStyle = {
        boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)',
        padding: "0"
    }

     let gamesArray = games[games.length - 1];

        
     let grid = 
         <List style={listStyle}>
        {games && games.length > 0 ? gamesArray.map((g, i) =>
          <div className="listItem" onClick={() => openModal(g)}><IndividualGame game={g} index={i} /><Divider /></div> 
        ) : ""}
          </List>
     
        
        let display = <div>
            {value === 0 && grid}
            {value === 1 && grid}
            {value === 2 && grid}
        </div>

        let noGames = "There are no games today";

        return (
            <div >
                <AppBar position="static">
                    <Tabs value={value} onChange={handleChange}>
                        <Tab label="MLB" />
                        <Tab label="NBA" />
                        <Tab label="NHL" />
                    </Tabs>
                </AppBar>
                {alert ? <Alert /> : ""}
                <div >
                    <h6>Click on game to make wager.</h6>
                    {user.length > 0 ? <div>Welcome, {user[0]["username"]}</div> : ""}
                    {grid["props"]["children"].length ? 
                        <Grid container>
                            <Grid item xs={3}>
                              
                            </Grid>
                            <Grid item xs={6}>
                              <div className="date">{date}</div>
                              {display} 
                            </Grid>
                            <Grid item xs={3}>
                             
                            </Grid>
                        </Grid>
                        
                        : 
                        noGames}
                </div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title">
                    {selectedGame ? <IndividualGameModal selectedGame={selectedGame} handleClose={handleClose}/> : ""}
                </Dialog>
            </div>
        )
    }

const mapStateToProps = state => {
    const {user, dashboard} = state
    return {
        user: user,
        games: dashboard,
        alert: state.alert 
    }
}

export default connect(mapStateToProps, { setGames, setAlert })(Dashboard);