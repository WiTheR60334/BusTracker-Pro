"use client";
import React, { useState } from "react";
import styles from "./StudentProfile.module.css";
import { Popconfirm, message } from "antd";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import Avatar from "react-avatar-edit";

function Profile() {
  const [img, setImg] = useState("");
  const [imgCrop, setImgCrop] = useState("");
  const [src, setsrc] = useState(false);
  const [profile, setprofile] = useState([]);
  const [pview, setpview] = useState(false);
  const profileFinal = profile.map((item) => item.pview);
  const onClose = () => {
    setpview(null);
  };
  const onCrop = (view) => {
    setpview(view);
  };
  const saveCropImage = () => {
    setprofile([...profile, { pview }]);
    setImgCrop(false);
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
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "4px solid #eae7e7be",
            }}
            onClick={() => setImgCrop(true)}
            src={profileFinal.length ? profileFinal : img}
            alt=""
          />
          <Dialog
            visible={imgCrop}
            header={() => (
              <p htmlFor="" style={{ fontSize: "25px", fontWeight: "bold" }}>
                Update Profile
              </p>
            )}
            onHide={() => setImgCrop(false)}
          >
            <div className={styles.confirmation_content}>
              <Avatar
                width={500}
                height={400}
                onCrop={onCrop}
                onClose={onClose}
                src={src}
                shadingColor={"#474649"}
                backgroundColor={"#474649"}
                className={styles.avatar_container}
              />
              <div className={styles.button_container}>
                <div className={styles.button_wrapper}>
                  <Button onClick={saveCropImage}>
                    <i
                      className="pi pi-check"
                      style={{
                        marginRight: "5px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    ></i>
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </Dialog>
          <InputText
            type="file"
            accept="image/"
            style={{ display: "none" }}
            onChange={(event) => {
              const file = event.target.files[0];
              if (file && file.type.substring(0, 5) === "image") {
                setImg(file);
              } else {
                setImg(null);
              }
            }}
            // style={{
            //   display: "flex",
            //   textAlign: "center",
            //   marginTop: "2rem",
            //   width: "100%",
            //   marginLeft: "10rem",
            // }}
          />
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
