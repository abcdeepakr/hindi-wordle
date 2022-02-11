import React, { createContext, useReducer } from "react";

import WordleGrid from "../components/wordleGrid/wordleGrid";
import Keyboard from "../components/keyboard/keyboard";

import { reducer, initialState } from "../components/ContextAPI/AppReducer";
import Popup from "../components/popup/popup";
export const AppContext = createContext();

import Grid from "../components/grid/grid";
export default function Home() {
  const [stateVal, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider
      value={{ stateValue: stateVal, dispatchState: dispatch }}>
        <h1 style ={{textAlign:"center", fontFamily:"monospace", fontSize:"30px"}}>वर्ण - dle</h1>
      <div>
        <Popup show={stateVal.popup.state}>{stateVal.popup.message}</Popup>
        <WordleGrid />
        <Grid />
        <Keyboard />
      </div>
    </AppContext.Provider>
  );
}
