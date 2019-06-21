import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';

class IndividualGame extends Component {
    render() {
        const { game, index } = this.props

        const outer = {
            backgroundColor: '#F5F5F5'
        }

        return (
            <Grid container style={outer}>
                 <Grid item xs={6}>
                <ListItem>
                    <ListItemText
                        inset
                        primary={game["teams"][0]}
                        secondary={
                            <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    color="textPrimary"
                                >
                                    {game['sites'][0]['odds']['h2h'][0]}
                                </Typography>
                            </React.Fragment>
                        }
                    />
                    </ListItem>
                    </Grid>
                    
    
            <Grid item xs={6}>
                <ListItem>
                    <ListItemText
                        inset
                        primary={game["teams"][1]}
                        secondary={
                            <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    color="textPrimary"
                                >
                                    {game['sites'][0]['odds']['h2h'][1]}
                                </Typography>
                            </React.Fragment>
                        }
                    />
                </ListItem>
                </Grid>
            </Grid>
        )
    }
}

IndividualGame.propTypes = {
    game: PropTypes.object.isRequired
}

export default IndividualGame