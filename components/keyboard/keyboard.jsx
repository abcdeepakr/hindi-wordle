import React, {useContext} from 'react';
import styles from './keyboard.module.css'
import Key from './key'
import words from '../../data/words.json'

import { AppContext } from "../../pages/index";
function Keyboard() {
    const stateValueContext = useContext(AppContext);
    
  return (
    <div className={styles.keyboard}>
              {/* <button
        onClick={() => stateValueContext.dispatchState({ type: "something" , value : 20 })}>
        KEYBOARD + 20
      </button> */}
      {/* <h4> {stateValueContext.stateValue}</h4> */}
        <div className={styles.row}>
            {words[0].firstrow.split('').map( letter => {
                return <Key value = {letter}  key={letter} color={stateValueContext.stateValue.keyBoardMapping[letter]}/>
            })}
        </div>
        <div className={styles.row}>
            {words[0].secondRow.split('').map( letter => {
                return <Key value = {letter}  key={letter} color={stateValueContext.stateValue.keyBoardMapping[letter]}/>
            })}
        </div>
        <div className={styles.row}>
            {words[0].thirdRow.split('').map( letter => {
                return <Key value = {letter}  key={letter} color={stateValueContext.stateValue.keyBoardMapping[letter]}/>
            })}
        </div>
        <div className={styles.row}>
            <Key value = "Enter" />
            {words[0].fourthRow.split('').map( letter => {
                return <Key value = {letter}  key={letter} color={stateValueContext.stateValue.keyBoardMapping[letter]}/>
            })}
            <Key value = "Back" />
        </div>
    </div>
  );
}

export default Keyboard;
