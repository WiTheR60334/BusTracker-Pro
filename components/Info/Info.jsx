import React from "react";
import styles from "./Info.module.css";

function Info() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
      <div className={styles.box}>
        <div className={styles.content}>
          <div className={styles.title}>
            <div>No of Students</div>
          </div>
          <div className={styles.value}>27</div>
        </div>
        <div className={styles.content}>
          <div className={styles.title}>
            <div>No of Students</div>
          </div>
          <div className={styles.value}>27</div>
        </div>
        <div className={styles.content}>
          <div className={styles.title}>
            <div>No of Students</div>
          </div>
          <div className={styles.value}>27</div>
        </div>
        <div className={styles.content}>
          <div className={styles.title}>
            <div>No of Students</div>
          </div>
          <div className={styles.value}>27</div>
        </div>
      </div>

      </div>
    </div>
  );
}

export default Info;
