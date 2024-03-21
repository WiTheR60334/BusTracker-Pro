"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./StudentProfile.module.css";
import { Popconfirm, message } from "antd";
import { notFound } from "next/navigation";

function Profile() {
  const [imageSrc, setImageSrc] = useState("");
  const inputRef = useRef(null);

  const [student, setStudent] = useState({
    id: "",
    name: "",
    surname: "",
    enrollment_no: "",
    address: "",
    father_mobile: "",
    mother_mobile: "",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:3000/api/Student", {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();
        if (data && data.length > 0) {
          const fetchedStudent = data[0];
          setStudent({
            id: fetchedStudent._id,
            name: fetchedStudent.name,
            surname: fetchedStudent.surname,
            enrollment_no: fetchedStudent.enrollment_no,
            address: fetchedStudent.address,
            father_mobile: fetchedStudent.father_mobile,
            mother_mobile: fetchedStudent.mother_mobile,
          });
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    }
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

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

  const cancel = () => {
    message.info("Details not updated");
  };

  const confirm = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/${student.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(student),
      });
      if (res.ok) {
        message.success("Details updated successfully!");
      } else {
        throw new Error("Failed to update details");
      }
    } catch (error) {
      console.error("Error updating student details:", error);
      message.error("Failed to update details");
    }
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
            {student.name} {student.surname}
          </div>
        </div>
        <div className={styles.details}>
          <div className={styles.detailsContainer}>
            <div className={styles.name}>
              <div className={styles.title}>Name</div>
              <div>
                <input
                  type="text"
                  placeholder={student.name}
                  className={styles.input}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={styles.name}>
              <div className={styles.title}>Enrollment No</div>
              <div>
                <input
                  type="text"
                  placeholder={student.enrollment_no}
                  className={styles.input}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={styles.name}>
              <div className={styles.title}>Address</div>
              <div>
                <input
                  type="text"
                  placeholder={student.address.street}
                  className={styles.input}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={styles.name}>
              <div className={styles.title}>Parents Mobile No</div>
              <div>
                <input
                  type="text"
                  placeholder={student.father_mobile}
                  className={styles.input}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={styles.name}>
              <div className={styles.title}>Alternate Mobile No</div>
              <div>
                <input
                  type="text"
                  placeholder={student.mother_mobile}
                  className={styles.input}
                  onChange={handleChange}
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
