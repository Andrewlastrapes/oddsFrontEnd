import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';


class BetGame extends Component {

    render() {
        console.log(this.props.selectedGame)
        const { selectedGame } = this.props;

        return (
            <div >
                <Typography variant="subtitle1" id="simple-modal-description">
                    {selectedGame.teams[0]}
                </Typography>
                <Typography variant="subtitle1" id="simple-modal-description">
                    {selectedGame.teams[1]}
                </Typography>
            </div>
        )
    }

}

BetGame.propTypes = {
    selectedGame: PropTypes.object.isRequired
}

export default BetGame;