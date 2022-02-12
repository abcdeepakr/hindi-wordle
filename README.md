## Hindi Wordle,

It's mostly spaghetti code with multiple hashmaps to keep the mappings, it could have been reduced with a better state management or nested hashmap. I created this to learn useReducer and useContext hooks, creating a global state so that all the childrens in the application have access to the states.

This is what I learnt about state management with useReducer and useContest - [My Documentation](https://nebula-honeycrisp-5c2.notion.site/useContext-API-c56be4d28cdf4a52bd734c068bef3ffd)

<hr>

State variables in this wordle : 

 - **todaysWord**: string 
    - This is a random word generated on each refresh
 - **mapSequence**: hashmap
     - Key-Value pair ``` {0 : "letter"} ``` to store the entered letter, it is updated on each click on keyboard
 - **position**: number
     - current position and letter to be updated
 - **newRow**: boolean
     - weather the player can move to the next row in case of a partially correct or legit word
 - **solution**: hashmap
     - key-value pair of the solution where 0 is the key of last letter of the word
 - **colorMapping**: hashmap 
 - **keyBoardMapping**: hashmap
 - **popup**: {state: boolean, message: string }
     - Updates the message
