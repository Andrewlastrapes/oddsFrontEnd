import React, { useState } from "react"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import InputAdornment from '@material-ui/core/InputAdornment';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { connect } from "react-redux";
import { postUserRoute } from "../Api";





function IndividualGameModal({ selectedGame, user, handleClose }) {

    const [modalState, setModalState] = useState({
        bet: 0,
        team: ''
    });

    const { bet, team } = modalState

    const handleToggle = value => () => {
        setModalState({ ...modalState, team: value });
    };

    const submitBet = () => {
        let data = {
            user: user,
            bet: {
                money: bet,
                team: team
            }

        }
        postUserRoute(data, "postBet")
            .then(data => {
                console.log(data)
                handleClose()
            });
    }

    const handleBet = e => {
        setModalState({ ...modalState, bet: e.target.value })
    }

    const textField = {
        paddingLeft: "30px",
        width: "171px"
    }

    const buttons = {
        display: "flex",
        justifyContent: "center"
    }

    return (
        <div>
            <DialogContent>
                <List>
                    {selectedGame["teams"].map(t => {
                        const labelId = `checkbox-list-label-${t}`;
                        return (
                            <ListItem key={t} role={undefined} dense button onClick={handleToggle(t)}>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={t === team}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                </ListItemIcon>
                                <ListItemText id={labelId} primary={t} />
                                <ListItemSecondaryAction>
                                </ListItemSecondaryAction>
                            </ListItem>
                        )
                    })}

                </List>
                <TextField
                    style={textField}
                    value={bet}
                    onChange={handleBet}
                    autoFocus
                    margin="normal"
                    type='number'
                    variant="filled"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}

                />
            </DialogContent>
            <DialogActions style={buttons}>
                    <Button color="primary" onClick={handleClose}>
                        Cancel
                            </Button>
                    <Button color="primary" onClick={submitBet} >
                        Bet
                        </Button>
            </DialogActions>
        </div>
    )

}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(IndividualGameModal)