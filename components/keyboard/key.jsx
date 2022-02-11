import React, { useContext, useState } from 'react';
import styles from './keyboard.module.css'
import { AppContext } from "../../pages/index";
import words from '../../data/words.json'

import Popup from '../popup/popup';

function Key(props) {
    const stateValueContext = useContext(AppContext);
    const [newRow, setNewRow] = useState(true)
    const [Popup, setShowPopup] = useState({ message: "", show: false })
    console.log(stateValueContext.stateValue.todaysWord)
    const checkWord = (cellValue) => {

        let todaysWord = stateValueContext.stateValue.todaysWord
        let wordLength = stateValueContext.stateValue.todaysWord.length
        let mapSequence = stateValueContext.stateValue.mapSequence
        let allGuesses = Object.keys(mapSequence)
        console.log(todaysWord)
        // let currentGuessSlice =  allGuesses.length/(allGuesses.length/wordLength)
        // let slicedArray = allGuesses.slice(currentGuessSlice+1)

        // console.log(slicedArray)
        let slicedArray = allGuesses.slice(allGuesses.length - wordLength)
        console.log(slicedArray)
        let currentColours = { ...stateValueContext.stateValue.colorMapping }
        let solution = stateValueContext.stateValue.solution
        let keyboardColorMapping = { ...stateValueContext.stateValue.keyBoardMapping }
        slicedArray.map(position => {
            if (solution[position % wordLength] == mapSequence[position]) {
                console.log(mapSequence[position], "green")
                keyboardColorMapping[mapSequence[position]] = "#009432"
                currentColours[position] = "#009432" //green
            } else if (todaysWord.includes(mapSequence[position]) && solution[position % wordLength] != mapSequence[position]) {
                keyboardColorMapping[mapSequence[position]] = "#f1c40f"
                currentColours[position] = "#f1c40f" // yellow
            } else {
                keyboardColorMapping[mapSequence[position]] = "#576574"
                currentColours[position] = "#576574" //grey
            }
        })

        let guessedWord = slicedArray.reduce((final, value) => {
            return final + mapSequence[value]
        }, "");

        if (guessedWord == todaysWord) {
            stateValueContext.dispatchState({ type: "UPDATE_COLOURS", colours: currentColours })
            stateValueContext.dispatchState({ type: "UPDATE_KEYBOARD", keyColours: keyboardColorMapping })
            // alert("GUESSED THE CORRECT WORD : ", todaysWord)
            
            setShowPopup({ type: "correct", show: "true" })

            console.log("GUESSED WORD IS : ", guessedWord)

        } else if (words[0][wordLength].indexOf(guessedWord) == -1) {
            // stateValueContext.dispatchState({ type: "UPDATE_KEYBOARD", keyColours: keyboardColorMapping })
            alert("WORD NOT FOUND")
            console.log("word not found")
        } else if (words[0][wordLength].indexOf(guessedWord) != -1) {
            stateValueContext.dispatchState({ type: "UPDATE_KEYBOARD", keyColours: keyboardColorMapping })
            stateValueContext.dispatchState({ type: "UPDATE_COLOURS", colours: currentColours })

            // setNewRow(true)
            stateValueContext.dispatchState({ type: "ALLOWROW", allow: true })
            alert("word present but not correct")
        }

    }
    
    const updateCellMapping = (cellValue) => {

        let position = stateValueContext.stateValue.position
        let wordLength = stateValueContext.stateValue.todaysWord.length

        if (cellValue == "Back" && position > 1) {

            stateValueContext.dispatchState({ type: "REMOVE", cellValue: cellValue })
            stateValueContext.dispatchState({ type: "ALLOWROW", allow: true })
            console.log(position)
        }

        else if (cellValue == "Enter" && (position % wordLength == 1 && position != 1)) {
            checkWord(cellValue)
        }

        // if (position % wordLength != 1 || position==1) {
        else if (stateValueContext.stateValue.newRow) {

            if (position % wordLength == 0 && position != 1) {
                stateValueContext.dispatchState({ type: "ALLOWROW", allow: false })
            }
            if (cellValue != "Back" && cellValue != "Enter") {
                stateValueContext.dispatchState({ type: "UPDATE_CELL", cellValue: cellValue })
            }


        }
        console.log("STATE VALUE", stateValueContext.stateValue.mapSequence)
        console.log("NEW ROW", stateValueContext.stateValue.newRow)
        console.log("POSITION", stateValueContext.stateValue.position)
        console.log("WORD", stateValueContext.stateValue.todaysWord)
        console.log("SOLUTION", stateValueContext.stateValue.solution)

    }
    return (
        <React.Fragment>
            <div className={styles.keyDiv} onClick={() => {
                updateCellMapping(props.value)
            }} style={{ backgroundColor: props.color }}>
                {props.value}
            </div>

            
        </React.Fragment>
    );
}

export default Key;