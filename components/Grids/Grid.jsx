import React from "react";
import styles from "./Grid.module.css";

const getTextColorClassName = (text) => {
  if (text === "High") {
    return styles.greenText;
  } else if (text === "Avg") {
    return styles.yellowText;
  } else if (text === "Low") {
    return styles.redText;
  } else {
    return "";
  }
};

function Grid() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.block}>
          <h1 className={styles.title}> Performance </h1>
          <span className={getTextColorClassName("High")}>High</span>
        </div>
        <span className={styles.textt}>
          Price return has been average, nothing exciting hehe haha
        </span>
      </div>
      <div className={styles.card}>
        <div className={styles.block}>
          <h1 className={styles.title}> Intrinsic Value</h1>
          <span className={getTextColorClassName("Avg")}>Avg</span>
        </div>
        <div className={styles.textt}>
          Current value is less than Intrinsic value not sure but
        </div>
      </div>
      <div className={styles.card}>
        <div className={styles.block}>
          <h1 className={styles.title}> Growth</h1>
          <span className={getTextColorClassName("Low")}>Low</span>
        </div>
        <span className={styles.textt}>
          Lagging behind the market in financials growth assessment
        </span>
      </div>
      <div className={styles.card}>
        <div className={styles.block}>
          <h1 className={styles.title}> Growth</h1>
          <span className={getTextColorClassName("Low")}>Low</span>
        </div>
        <span className={styles.textt}>
          Lagging behind the market in financials growth assessment
        </span>
      </div>
    </div>
  );
}

export default Grid;
