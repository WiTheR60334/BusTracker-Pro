"use client";
import React, { useState, useRef } from "react";
import styles from "./StudentProfile.module.css";
import { Popconfirm, message } from "antd";

function Profile() {
  const [imageSrc, setImageSrc] = useState(""); 
  const inputRef = useRef(null); 

  const handleFileChange = (event) => {
    const file = event.target.files[0]; 
    if (file) {
      const reader = new FileReader(); 
      reader.onloadend = () => {
        setImageSrc(reader.result); 
      };
      reader.readAsDataURL(file); 
    }
  };

  const handleImageClick = () => {
    inputRef.current.click(); 
  };

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
          <img
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "5px solid #eae7e7be",
            }}
            src={
              imageSrc ||
              "https://media.istockphoto.com/id/1200064810/vector/user-profile-login-or-access-authentication-icon-button-people-account-sign-in-logo-sign.jpg?s=612x612&w=0&k=20&c=p7KoaWP5NLXGldaUjJ1daqJhDK2YNYB_fbz7X-TmpyQ="
              // "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
            }
            alt=""
            onClick={handleImageClick}
          />
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <div style={{ marginTop: "1rem", fontSize: "20px" }}>
            Romir Bedekar
          </div>
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