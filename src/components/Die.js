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
            {(props.value === 1) && <div className="dot center"></div>}
            {(props.value === 2) &&
                <>  <div className="dot top left"></div>
                    <div className="dot bottom right"></div></>}
            {(props.value === 3) &&
                <>  <div className="dot top left"></div>
                    <div className="dot center"></div>
                    <div className="dot bottom right"></div></>}
            {(props.value === 4) &&
                <>  <div className="dot top left"></div>
                    <div className="dot top right"></div>
                    <div className="dot bottom left"></div>
                    <div className="dot bottom right"></div></>}
            {(props.value === 5) &&
                <>  <div className="dot top left"></div>
                    <div className="dot top right"></div>
                    <div className="dot bottom left"></div>
                    <div className="dot bottom right"></div>
                    <div className="dot center"></div></>}
            {(props.value === 6) &&
                <>  <div className="dot top left"></div>
                    <div className="dot top right"></div>
                    <div className="dot bottom left"></div>
                    <div className="dot bottom right"></div>
                    <div className="dot middle left"></div>
                    <div className="dot middle right"></div></>}
        </div>
    )
}