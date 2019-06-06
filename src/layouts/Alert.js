import React from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';

const styles = {
    backgroundColor: "#d32f2f",
    color: "#fff",
    borderRadius: "4px",
    boxShadow: "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)",
    height: "5vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
}

const Alert = ({ alerts }) => alerts !== null && alerts.length > 0 &&
alerts.map(a => 

<div key={a.id} style={styles}>{a.msg}</div>)

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    alerts: state.alert
})

export default connect(mapStateToProps)(Alert)