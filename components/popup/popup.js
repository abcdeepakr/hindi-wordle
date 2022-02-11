import React from "react";
import { Alert } from "react-bootstrap";
import styles from "./popup.module.css";

function Popup(props) {
  if (props.show) {
    return (
      <div className={styles.parent}>
        <Alert variant="danger">
          
          {props.children}
        </Alert>
      </div>
    );
  } else {
    return null;
  }
}

export default Popup;