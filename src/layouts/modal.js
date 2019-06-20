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
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';


const buttons = {
    display: "flex",
    justifyContent: "center"
}

function IndividualGameModal({ selectedGame, user, handleClose }) {

    const [modalState, setModalState] = useState({
        bet: 0,
        team: '',
        openConfirmationModal: false
    });

    const { bet, team, openConfirmationModal } = modalState

    const handleToggle = value => () => {
        setModalState({ ...modalState, team: value });
    };

    const submitBet = () => {

        setModalState({
            ...modalState,
            openConfirmationModal: true
        })
    }

    const handleBet = e => {
        setModalState({ ...modalState, bet: e.target.value })
    }

    const textField = {
        paddingLeft: "30px",
        width: "171px"
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
            <Dialog open={openConfirmationModal}>
                <ConfirmationModal user={user} team={team} bet={bet} handleClose={handleClose}/>
            </Dialog>

        </div>
    )

}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(IndividualGameModal)

function ConfirmationModal({ user, team, bet, handleClose }) {
    
     let data = {
            user: user,
            bet: {
                money: bet,
                team: team
            }
        }

    const submitBet = () => {
        postUserRoute(data, "postBet")
        .then(data => {
            handleClose()
        });
     }  

    return (
        <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {user[0]['username']}, are you sure you want to bet ${bet} on {team}?
          </DialogContentText>
            <DialogActions style={buttons}>
                <Button color="primary" onClick={handleClose}>
                    Cancel
                            </Button>
                <Button color="primary" onClick={submitBet}>
                    Confirm
                        </Button>
            </DialogActions>
        </DialogContent>
    )
}

