import React, { useContext, useState } from 'react';
import styles from './keyboard.module.css'
import { AppContext } from "../../pages/index";
import words from '../../data/words.json'

import Popup from '../popup/popup';

function Key(props) {
    const stateValueContext = useContext(AppContext);
    const [newRow, setNewRow] = useState(true)
    const [Popup, setShowPopup] = useState({ message: "", show: false })
    
    const checkWord = (cellValue) => {

        let todaysWord = stateValueContext.stateValue.todaysWord
        let wordLength = stateValueContext.stateValue.todaysWord.length
        let mapSequence = stateValueContext.stateValue.mapSequence
        let allGuesses = Object.keys(mapSequence)
        
        // let currentGuessSlice =  allGuesses.length/(allGuesses.length/wordLength)
        // let slicedArray = allGuesses.slice(currentGuessSlice+1)

        
        let slicedArray = allGuesses.slice(allGuesses.length - wordLength)
        
        let currentColours = { ...stateValueContext.stateValue.colorMapping }
        let solution = stateValueContext.stateValue.solution
        let keyboardColorMapping = { ...stateValueContext.stateValue.keyBoardMapping }
        slicedArray.map(position => {
            if (solution[position % wordLength] == mapSequence[position]) {
                
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
            stateValueContext.dispatchState({ type: "UPDATE_POPUPMESSAGE", popupData: {state:true, message:"सही उत्तर !!!!!! बहुत उम्दा खेले आप"} })
            stateValueContext.dispatchState({ type: "UPDATE_COLOURS", colours: currentColours })
            stateValueContext.dispatchState({ type: "UPDATE_KEYBOARD", keyColours: keyboardColorMapping })
            // alert("GUESSED THE CORRECT WORD : ", todaysWord)
            
            setShowPopup({ type: "correct", show: "true" })
            
            
            setTimeout(() => {
                stateValueContext.dispatchState({ type: "UPDATE_POPUPMESSAGE", popupData: {state:false, message:""} })
            }, 5000);

        } else if (words[0][wordLength].indexOf(guessedWord) == -1) {
            // stateValueContext.dispatchState({ type: "UPDATE_KEYBOARD", keyColours: keyboardColorMapping })
            // alert("WORD NOT FOUND")
            if(stateValueContext.stateValue.position == wordLength*6+1 ){
                showWord()
            }
            stateValueContext.dispatchState({ type: "UPDATE_POPUPMESSAGE", popupData: {state:true, message:"शब्द नहीं मिला"} })
            
            setTimeout(() => {
                stateValueContext.dispatchState({ type: "UPDATE_POPUPMESSAGE", popupData: {state:false, message:""} })
            }, 1000);
            
        } else if (words[0][wordLength].indexOf(guessedWord) != -1) {
            stateValueContext.dispatchState({ type: "UPDATE_KEYBOARD", keyColours: keyboardColorMapping })
            stateValueContext.dispatchState({ type: "UPDATE_COLOURS", colours: currentColours })
            stateValueContext.dispatchState({ type: "ALLOWROW", allow: true })
            showWord()
            // stateValueContext.dispatchState({ type: "UPDATE_POPUPMESSAGE", popupData: {state:true, message:"BDHOOND TE RAHIYE"} })
            
            // setTimeout(() => {
            //     stateValueContext.dispatchState({ type: "UPDATE_POPUPMESSAGE", popupData: {state:false, message:""} })
            // }, 1000);
            // alert("word present but not correct")
        }
    }
    const showWord = () =>{
        let todaysWord = stateValueContext.stateValue.todaysWord
        let wordLength = todaysWord.length
        if(stateValueContext.stateValue.position == wordLength*6+1 ){
             stateValueContext.dispatchState({ type: "UPDATE_POPUPMESSAGE", popupData: {state:true, message:todaysWord} })
            
            setTimeout(() => {
                stateValueContext.dispatchState({ type: "UPDATE_POPUPMESSAGE", popupData: {state:false, message:""} })
            }, 20000);
        }
    }
    const updateCellMapping = (cellValue) => {

        let position = stateValueContext.stateValue.position
        let wordLength = stateValueContext.stateValue.todaysWord.length

        if (cellValue == "Back" && position > 1) {

            stateValueContext.dispatchState({ type: "REMOVE", cellValue: cellValue })
            stateValueContext.dispatchState({ type: "ALLOWROW", allow: true })
            
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
console.log(stateValueContext.stateValue.position)
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