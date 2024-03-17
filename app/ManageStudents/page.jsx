import styles from "./ManageStudents.module.css";
import { FaBus } from "react-icons/fa";
import Table2 from "../../components/Table2/Table2";


function ManageStudents() {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.title}>
          <FaBus
            style={{ color: "#235ff4", fontSize: "18px", marginRight: "8px" }}
          />
          Manage Buses
          <div style={{ marginTop: "2rem" }}>
            <Table2 />
            {/* <Table /> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManageStudents;