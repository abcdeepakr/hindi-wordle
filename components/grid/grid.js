import React, { useContext, useState } from "react";
import styles from "./grid.module.css";

import { AppContext } from "../../pages/index";

function Grid() {
  const stateValueContext = useContext(AppContext);
  
  const [gridCount, setGridCount] = useState(1)
  let correct = "green"
  let incorrect = "grey"
  let present = "yellow"
  let colourMapping = stateValueContext.stateValue.colorMapping
  console.log(colourMapping)
  return (
    <div className={styles.mainGrid}>
      {[1,2,3,4,5,6].map(rowNumber =>{
        return <div className={styles.row} key = {rowNumber}>
          {stateValueContext.stateValue.todaysWord.split('').map((letter, index) =>{
           return (<div
            className={styles.cell}
            style ={{backgroundColor:colourMapping[stateValueContext.stateValue.todaysWord.length*(rowNumber-1)+index+1]}}
            key = {stateValueContext.stateValue.todaysWord.length*(rowNumber-1)+index+1}><div style={{backgroundColor:colourMapping[stateValueContext.stateValue.todaysWord.length*(rowNumber-1)+index+1], width:"100%",height:"100%"}} ></div>
              {stateValueContext.stateValue.mapSequence[stateValueContext.stateValue.todaysWord.length*(rowNumber-1)+index+1]}
            </div>)
          })}
        </div>;
      })}
    </div>
  );
}

export default Grid;
