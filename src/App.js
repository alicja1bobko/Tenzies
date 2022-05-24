import { useEffect, useState } from 'react';
import './App.css';
import './style.css';
import Die from './components/Die';
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

export default function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    if (dice.every((die, i) => (die.value === dice[0].value) && (die.isHeld))) {
      setTenzies(true);
      
    }
    
  },[dice])

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
  
  function rollDice() {
    setDice(prevDice => 
      prevDice.map(die => {
        return die.isHeld ?
          die : 
          generateNewDie()
        
      })
      );
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
        <p className='instructions'>Roll untill all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className='dice--container'>
          {diceElements}
        </div>
        <button className='roll-dice' onClick={rollDice}>{tenzies? 'New Game' : 'Roll' }</button>
      </div>
    </div>
  );
}


