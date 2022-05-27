import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { useEffect, useState } from 'react';
import './App.css';
import './style.css';
import Die from './components/Die';
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import Timer from './components/Timer';


export default function App() {

  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [numberOfRolls, setNumberOfRolls] = useState(0);
  const [key, setKey] = useState("0");
 
  useEffect(() => {
    if (dice.every((die, i) => (die.value === dice[0].value) && (die.isHeld))) {
      setTenzies(true);
    }
  }, [dice]);


    function allNewDice() {
      const newDice = [];
      for (let i = 0; i < 10; i++){
        Math.ceil(Math.random() * 6);
        newDice.push(
          generateNewDie()
        )
      }
      return newDice
    }
  
  function generateNewDie() {
    return {
          value: Math.ceil(Math.random() * 6),
          isHeld: false,
          id: nanoid()
    }
  }

  function newGame() {
      setKey(nanoid());
      setDice(allNewDice());
      setTenzies(false);
      setNumberOfRolls(0);
  }

  function saveHighScore() {
      const bestTime = Number(document.getElementById('left').innerHTML);
    
      // first game
      if (localStorage.getItem("highScore") === null) {
        localStorage.setItem("highScore", numberOfRolls);
        localStorage.setItem("bestTime", bestTime);
      }
    
    //smaller number of rolls, longer time
      if (localStorage.getItem("highScore") > numberOfRolls) {
        localStorage.setItem("highScore", numberOfRolls);
        localStorage.setItem("bestTime", bestTime);
      }
    //same number of rolls, shorter time
       if (localStorage.getItem("highScore") === numberOfRolls && localStorage.getItem("bestTime") > bestTime) {
        localStorage.setItem("bestTime", bestTime);
      }
  }
  
  function rollDice() {
    if (tenzies) {
      saveHighScore();
      newGame();
    } else { 
      
      setDice(prevDice =>
        prevDice.map(die => {
          return die.isHeld ?
            die :
            generateNewDie()
        })
      );
      setNumberOfRolls(prevNum => prevNum + 1);
    }
    
  }

  function holdDice(id) {
    setDice(prevDice => 
      prevDice.map(die => {
        return die.id === id ?
          {
            ...die,
            isHeld: !die.isHeld
          } :
          die
      })
    )
  }

  const diceElements = dice.map(die =>
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />) 
  
  
  return (
    <div className='container centered'>
      {tenzies && <Confetti />}
      
      <div className="board centered">
        <h1 className='title'>Tenzies</h1>
        <p className='instructions'>Roll until all dice are the same. Click each die to freeze it at its current <br></br>  value between rolls.</p>
        <span className='high--score'>
          <b>🏆 Your High Score: {localStorage.getItem("highScore") ? localStorage.getItem("highScore") : "_"} 🎲
           &nbsp;{localStorage.getItem("bestTime") ? localStorage.getItem("bestTime") : "_"}s ⌛</b> </span>
        <div className='dice--container'>
          {diceElements}
        </div>
        <button className='roll-dice' onClick={rollDice}>{tenzies? 'New Game' : 'Roll' }</button>
        <div className='statistics'>
          <span className='rolls--number'>Number of rolls: <b>{numberOfRolls} 🎲</b> </span>
          <span className='timer' id='right'>Time:</span>
          <Timer key={key} isOn={!tenzies}/>
         
        </div>
      </div>
    </div>
  );
}


