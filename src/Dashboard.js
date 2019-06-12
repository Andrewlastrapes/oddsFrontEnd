import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import IndividualGame from "./individualGame";
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import { getGames } from "./Api";
import { setGames } from "./actions/dashboard";
import { connect } from "react-redux";
import IndividualGameModal from "./layouts/modal";



const Dashboard = ({ user, games, setGames }) => {

    const [dashState, setDashState] = useState({
        value: 0,
        open: false,
        selectedGame: {},
    });

    const { value, open, selectedGame } = dashState;

    useEffect(() => {
       setGamesDashboard(0, "baseball_mlb")
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

    const handleClose = () => {
        setDashState({open: false});
        setGamesDashboard(0, "baseball_mlb")
    }

        let gamesArray = games[games.length - 1];

        let grid =
            <Grid container spacing={16}>
                {games && games.length > 0 ? gamesArray.map((g, i) =>
                    <Grid item xs={4} key={i} onClick={() => openModal(g)}>
                        <IndividualGame game={g} />
                    </Grid>) : ""}
            </Grid>

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
                <div >
                    <h6>Click on game to make wager.</h6>
                    {user.length > 0 ? <div>Welcome, {user[0]["username"]}</div> : ""}
                    {grid["props"]["children"].length ? display : noGames}
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
        games: dashboard
    }
}

export default connect(mapStateToProps, { setGames })(Dashboard);