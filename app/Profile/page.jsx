"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./StudentProfile.module.css";
import { Popconfirm, message } from "antd";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Tooltip } from "antd";
import ProtectedRoute from "../protected/page";

function Profile() {
  const { data: session, status } = useSession();
  const [student, setStudent] = useState(null);
  const [formData, setFormData] = useState({
    enrollment_no: "",
    name: "",
    surname: "",
    standard: "",
    section: "",
    father_name: "",
    mother_name: "",
    father_mobile: "",
    mother_mobile: "",
    picture: "",
    address: "",
    busNo: "",
    email: session?.user.email,
  });
  const router = useRouter();

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await fetch("/api/Connector", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: session.user.email }), // Change to the appropriate email
        });

        if (!response.ok) {
          throw new Error("Failed to fetch student data");
        }

        const data = await response.json();
        setStudent(data.body);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchStudentData();
  }, [session]);

  const [imageSrc, setImageSrc] = useState("");
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
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

  const confirm = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch(`/api/${session.user.email}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: session.user.email, address: formData.address, father_mobile: formData.father_mobile, mother_mobile: formData.mother_mobile}),
      });

      if (res.ok) {
        message.success("Details updated successfully!");
        window.location.reload();
      } else {
        if (res.status === 404) {
          throw new Error("Student not found");
        } else {
          throw new Error("Failed to update details");
        }
      }
    } catch (error) {
      console.error("Error updating student details:", error);
      message.error(error.message);
    }
  };

  return (
    <>
      <ProtectedRoute>
        <>
          {session && (
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
                    src={imageSrc || student?.picture}
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
                    {student
                      ? `${student.name} ${student.surname}`
                      : "Loading..."}
                  </div>
                </div>
                <form onSubmit={confirm}>
                  <div className={styles.details}>
                    <div className={styles.detailsContainer}>
                      <div className={styles.name}>
                        <div className={styles.title}>Class</div>
                        <div>
                          {student ? (
                            <Tooltip
                              title="This field is not editable"
                              color="white"
                              overlayInnerStyle={{
                                color: "black",
                                fontWeight: "400",
                              }}
                            >
                              <input
                                type="text"
                                placeholder={`${student.standard} ${student.section}`}
                                className={styles.input}
                                onChange={handleChange}
                                value={formData.standard}
                                name="standard"
                                readOnly
                              />
                            </Tooltip>
                          ) : (
                            <Tooltip
                              title="This field is not editable"
                              color="white"
                              overlayInnerStyle={{
                                color: "black",
                                fontWeight: "400",
                              }}
                            >
                              <input
                                type="text"
                                placeholder="loading..."
                                className={styles.input}
                                onChange={handleChange}
                                name="standard"
                                value={formData.standard}
                                readOnly
                              />
                            </Tooltip>
                          )}
                        </div>
                      </div>
                      <div className={styles.name}>
                        <div className={styles.title}>Enrollment No</div>
                        <div>
                          {student ? (
                            <Tooltip
                              title="This field is not editable"
                              color="white"
                              overlayInnerStyle={{
                                color: "black",
                                fontWeight: "400",
                              }}
                            >
                              <input
                                type="text"
                                placeholder={student.enrollment_no}
                                className={styles.input}
                                onChange={handleChange}
                                value={formData.enrollment_no}
                                name="enrollment_no"
                                readOnly
                              />
                            </Tooltip>
                          ) : (
                            <Tooltip
                              title="This field is not editable"
                              color="white"
                              overlayInnerStyle={{
                                color: "black",
                                fontWeight: "400",
                              }}
                            >
                              <input
                                type="text"
                                placeholder="Your enrollment number is not registered yet"
                                className={styles.input}
                                onChange={handleChange}
                                value={formData.enrollment_no}
                                name="enrollment_no"
                                readOnly
                              />
                            </Tooltip>
                          )}
                        </div>
                      </div>
                      <div className={styles.name}>
                        <div className={styles.title}>Address</div>
                        <div>
                          {student ? (
                            <input
                              type="text"
                              placeholder={student.address}
                              className={styles.input}
                              onChange={handleChange}
                              value={formData.address}
                              name="address"
                            />
                          ) : (
                            <input
                              type="text"
                              placeholder="Your address is not registered yet"
                              className={styles.input}
                              onChange={handleChange}
                              value={formData.address}
                              name="address"
                            />
                          )}
                        </div>
                      </div>
                      <div className={styles.name}>
                        <div className={styles.title}>Father's Mobile No</div>
                        <div>
                          {student ? (
                            <input
                              type="text"
                              placeholder={student.father_mobile}
                              className={styles.input}
                              onChange={handleChange}
                              value={formData.father_mobile}
                              name="father_mobile"
                            />
                          ) : (
                            <input
                              type="text"
                              placeholder="Your father's mobile number is not registered yet"
                              className={styles.input}
                              onChange={handleChange}
                              value={formData.father_mobile}
                              name="father_mobile"
                            />
                          )}
                        </div>
                      </div>
                      <div className={styles.name}>
                        <div className={styles.title}>Mother's Mobile No</div>
                        <div>
                          {student ? (
                            <input
                              type="text"
                              placeholder={student.mother_mobile}
                              className={styles.input}
                              onChange={handleChange}
                              value={formData.mother_mobile}
                              name="mother_mobile"
                            />
                          ) : (
                            <input
                              type="text"
                              placeholder="Your mother's mobile number is not registered yet"
                              className={styles.input}
                              onChange={handleChange}
                              value={formData.mother_mobile}
                              name="mother_mobile"
                            />
                          )}
                        </div>
                      </div>
                      <div className={styles.name}>
                        <div className={styles.title}>Bus No</div>
                        <div>
                          {student ? (
                            <Tooltip
                              title="This field is not editable"
                              color="white"
                              overlayInnerStyle={{
                                color: "black",
                                fontWeight: "400",
                              }}
                            >
                              <input
                                type="text"
                                placeholder={student.busNo}
                                className={styles.input}
                                onChange={handleChange}
                                value={formData.busNo}
                                name="busNo"
                                readOnly
                              />
                            </Tooltip>
                          ) : (
                            <Tooltip
                              title="This field is not editable"
                              color="white"
                              overlayInnerStyle={{
                                color: "black",
                                fontWeight: "400",
                              }}
                            >
                              <input
                                type="text"
                                placeholder="loading..."
                                className={styles.input}
                                onChange={handleChange}
                                value={formData.busNo}
                                name="busNo"
                                readOnly
                              />
                            </Tooltip>
                          )}
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
                </form>
              </div>
            </div>
          )}
        </>
      </ProtectedRoute>
    </>
  );
}

export default Profile;
