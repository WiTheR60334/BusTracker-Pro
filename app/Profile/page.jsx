"use client";
import React, { useState, useRef } from "react";
import styles from "./StudentProfile.module.css";
import { Popconfirm, message } from "antd";
import img from "./profile.png";

function Profile() {
  const hiddenFileInput = useRef(null);
  const [img, setImg] = useState(null);
  const [imgCrop, setImgCrop] = useState("");
  const [src, setsrc] = useState(false);
  const [profile, setprofile] = useState([]);
  const [pview, setpview] = useState(false);

  const confirm = () => {
    message.success("Updated your details successfully!!!");
  };

  const cancel = () => {
    message.info("Details not updated");
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.avatar}>
          {/* <img
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "4px solid #eae7e7be",
            }}
            src={"./profile.png"}
            alt=""
          />
          <input type="file" /> */}
        </div>
        <div className={styles.details}>
          <div className={styles.detailsContainer}>
            <div className={styles.name}>
              <div className={styles.title}>Name</div>
              <div>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className={styles.input}
                />
              </div>
            </div>
            <div className={styles.name}>
              <div className={styles.title}>Enrollment No</div>
              <div>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className={styles.input}
                />
              </div>
            </div>
            <div className={styles.name}>
              <div className={styles.title}>Address</div>
              <div>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className={styles.input}
                />
              </div>
            </div>
            <div className={styles.name}>
              <div className={styles.title}>Parents Mobile No</div>
              <div>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className={styles.input}
                />
              </div>
            </div>
            <div className={styles.name}>
              <div className={styles.title}>Alternate Mobile No</div>
              <div>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className={styles.input}
                />
              </div>
            </div>
          </div>
          <div className={styles.update}>
            <Popconfirm
              title="Are you sure you want to update your details?"
              onConfirm={confirm}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <div className={styles.item}>Update</div>
            </Popconfirm>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
