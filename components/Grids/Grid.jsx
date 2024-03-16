import React from "react";
import { FaBus } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaRoute } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";
import styles from "./Grid.module.css";


function Grid() {
  return (
    <div className={styles.container}>
      <div className={styles.card1}>
        <div className={styles.cont}>
          <div className={styles.logo}>
            <FaBus />
          </div>
          <div className={styles.title1}>Buses</div>
          <div className={styles.text}>27 Total</div>
        </div>
      </div>
      <div className={styles.card1}>
        <div className={styles.cont}>
          <div className={styles.logo}>
            <FaUser />
          </div>
          <div className={styles.title1}>Drivers</div>
          <div className={styles.text}>27 Total</div>
        </div>
      </div>
      <div className={styles.card1}>
        <div className={styles.cont}>
          <div className={styles.logo}>
            <FaRoute />
          </div>
          <div className={styles.title1}>Routes</div>
          <div className={styles.text}>17 Total</div>
        </div>
      </div>
      <div className={styles.card1}>
        <div className={styles.cont}>
          <div className={styles.logo}>
            <PiStudentBold />
          </div>
          <div className={styles.title1}>Students</div>
          <div className={styles.text}>230 Total</div>
        </div>
      </div>
    </div>
  );
}

export default Grid;
