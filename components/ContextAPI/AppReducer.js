import words from '../../data/words.json'

let wordArray = words[0].words
let todaysWord = wordArray[Math.round(Math.random()*(wordArray.length))]
let solution = {}
for(var i in todaysWord){
    solution[(i+1 )% todaysWord.length] = todaysWord[i]
}
export const initialState = {todaysWord : todaysWord, mapSequence:{}, position:1, newRow : true, solution:solution, colorMapping:{}, keyBoardMapping:{}};

export const reducer = (state, action) =>{
    switch (action.type) {
        case "something":
            return state += action.value
        case "reset":
            return initialState
        case "UPDATE_CELL":
            let updatedState = {...state}
            updatedState.mapSequence[updatedState.position] = action.cellValue
            updatedState.position++
            return updatedState
        case "REMOVE":
            let newState = {...state}
            let popPosition = newState.position - 1
            delete newState.mapSequence[popPosition]
            newState.position--
            return newState
        case "ALLOWROW":
            let changeAllowState = {...state}    
            changeAllowState.newRow = action.allow
            return changeAllowState
        case "UPDATE_COLOURS":
            let updatedColourState = {...state}
            updatedColourState.colorMapping = {...updatedColourState.colorMapping, ...action.colours}
            return updatedColourState
        case "UPDATE_KEYBOARD":
            let updateKeyboardState = {...state}
            updateKeyboardState.keyBoardMapping = {...updateKeyboardState.keyBoardMapping, ...action.keyColours}
            return updateKeyboardState
        default:
            return state
    }
}