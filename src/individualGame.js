import React, { Component } from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

class IndividualGame extends Component {
    render() {
        const { game } = this.props
        console.log(game)
        return (
            <Card color="#80d6ff">
                <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                        <Grid container spacing={16}>
                            <Grid item xs={9}>
                                    {game.teams[0]}
                                </Grid>
                                <Grid item xs={3}>
                                     {game['sites'][0]['odds']['h2h'][0]}
                                </Grid>
                            </Grid>
                    </Typography>
                    
                    <Typography color="textSecondary" gutterBottom>
                        vs
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                        <Grid container spacing={16}>
                            <Grid item xs={9}>
                                    {game.teams[1]}
                                </Grid>
                                <Grid item xs={3}>
                                     {game['sites'][0]['odds']['h2h'][1]}
                                </Grid>
                            </Grid>
                    </Typography>
                </CardContent>
            </Card>
        )
    }
}

IndividualGame.propTypes = {
    game: PropTypes.object.isRequired
}

export default IndividualGame