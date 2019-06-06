import React, {useState} from "react"
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';



export function IndividualGameModal({selectedGame}){

    console.log(selectedGame)

    const [modalState, setModalState] = useState({
        bet: 0,
        team: '',

    });

    const {bet, team} = modalState

  const submitBet = () => {
        // Send bet and team to POST in api.js
    }

    const handleCheck = (e) => {
       setModalState({
            team: e.target.value
       })
       console.log(modalState)
    }

    const handleBet = e => {
       
        setModalState({bet: e.target.value})

    }
    return (
        <div>
              
               <DialogContent>
                        <DialogContentText>
                            <Grid container>
                                <Grid item xs={8}>
                                    {selectedGame["teams"] ? selectedGame["teams"][0] : ''}
                                </Grid>
                                <Grid item xs={2}>
                                    {selectedGame["teams"] ? selectedGame['sites'][0]['odds']['h2h'][0] : ''}
                                </Grid>
                                <Grid item xs={2}>
                                    <Checkbox value={selectedGame["teams"][0]} onChange={handleCheck} />
                                </Grid>
                            </Grid>
                        </DialogContentText>
                        <DialogContentText>
                            <Grid container>
                                <Grid item xs={8}>
                                    {selectedGame["teams"] ? selectedGame["teams"][1] : ''}
                                </Grid>
                                <Grid item xs={2}>
                                    {selectedGame["teams"] ? selectedGame['sites'][0]['odds']['h2h'][1] : ''}
                                </Grid>
                                <Grid item xs={2}>
                                    <Checkbox value={selectedGame["teams"][1]} onChange={handleCheck} />
                                </Grid>
                            </Grid>
                        </DialogContentText>
                        <TextField
                            value = {bet}
                            onChange={handleBet}
                            autoFocus
                            margin="dense"
                            type='number'
                            label="Amount"
                            fullWidth
                        />
                    </DialogContent> 
                     <DialogActions>
                        <Button color="primary" onClick={() => console.log("hey")}>
                            Cancel
                            </Button>
                        <Button color="primary" onClick={() => submitBet()} >
                            Bet test
                        </Button>
                    </DialogActions>
        </div>
    )

}