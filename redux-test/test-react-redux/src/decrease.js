import React, { Component } from 'react'
import { connect } from 'react-redux'

class Decrease extends Component {
    render() {
        return (
            <button onClick={this.props.onDecrease}>Decrease</button>
        )
    }
}

// Action
export const DECREASE_KEY = "decrease";
const decreaseAction = { type: DECREASE_KEY }
function mapDispatchToProps(dispatch) {
    return {
        onDecrease: () => {
            console.info("减 1")
            dispatch(decreaseAction)
        }
    }
}
export const ReduxDecrease = connect(null, mapDispatchToProps)(Decrease);
