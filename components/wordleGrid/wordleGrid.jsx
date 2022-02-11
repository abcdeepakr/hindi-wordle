import React, { useState, useEffect } from 'react';
import words from '../../data/words.json'
import styles from './wordleGrid.module.css'
function WordleGrid() {

    const [selectedWord, setSelectedWord] = useState('')

    const getWord = () => {
        let wordArray = words[0].words
        let randomWord = wordArray[Math.round(Math.random() * (wordArray.length))]
        setSelectedWord(randomWord)
        
    }


    let wordarr = words[0].words
    wordarr.map(word => {
        let splitted = word.split('')
    })
    return (<div className={styles.word}>
        <h1>{selectedWord}</h1>
        <h1></h1>
    </div>);
}

export default WordleGrid;
