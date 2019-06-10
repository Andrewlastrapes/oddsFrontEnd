import React, {useState} from "react"
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { connect } from "react-redux";
import { postUserRoute } from "../Api";



 function IndividualGameModal({ selectedGame, user}){

    console.log(selectedGame)

    const [modalState, setModalState] = useState({
        bet: 0,
        team: ''

    });

    const {bet, team} = modalState

  const submitBet = () => {
        let data = {
            user: user,
            bet: bet,
            team: team
        }
        postUserRoute(data,"postBet")
        .then(data => {
            console.log(data)
        })
        
    }

    const handleCheck = (e, team) => {
        
        if(e.target.checked){
           setModalState({...modalState, team: team})
        } else {
            setModalState({...modalState, team: ''})
        }
    }

    const handleBet = e => {
       setModalState({...modalState, bet: e.target.value})
       console.log("handleBet: " + bet)
    }

    return (
        <div>
              {console.log(bet)}
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
                                    <Checkbox name="team" onChange={(e) => handleCheck(e, selectedGame["teams"][0])} />
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
                                    <Checkbox name="team" onChange={(e) => handleCheck(e, selectedGame["teams"][1])} />
                                </Grid>
                            </Grid>
                        </DialogContentText>
                        <TextField
                            value = {bet}
                            onChange={handleBet}
                            autoFocus
                            margin="dense"
                            type='number'
                            fullWidth
                        />
                    </DialogContent> 
                     <DialogActions>
                        <Button color="primary" onClick={() => console.log("hey")}>
                            Cancel
                            </Button>
                        <Button color="primary" onClick={() => submitBet()} >
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