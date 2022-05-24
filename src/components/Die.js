import React from "react";

export default function Die(props) {
    const styles = {
        background: props.isHeld ? '#59E391' : 'white' 
    }
    return (
        <div
            className="die-face centered"
            style={styles}
            onClick={props.holdDice}>
            <h2 className="die--num">{props.value}</h2>
        </div>
    )
}