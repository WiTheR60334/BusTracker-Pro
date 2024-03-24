"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./StudentProfile.module.css";
import { Popconfirm, message } from "antd";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";

function Profile() {
  const { data: session, status } = useSession();
  const [student, setStudent] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    surname: "",
    enrollment_no: "",
    address: "",
    father_mobile: "",
    mother_mobile: "",
    picture: "",
    email: session?.user.email,
  });
  console.log("hi");

  if (session) {
    console.log("loggged in");
    const { user } = session;
  }
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
        console.log(
          "this is the message received on client side : ",
          data.body
        );
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchStudentData();
  }, [session]);

  useEffect(() => {
    if (status !== "authenticated") {
      router.push("/");
      message.info("You need to login to access this page");
    }
  }, [status, router]);

  const [imageSrc, setImageSrc] = useState("");
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // const handleChange = (e) => {
  //   const fieldName = e.target.name;
  //   const fieldValue = e.target.value;

  //   setStudent((prevState) => ({
  //     ...prevState,
  //     [fieldName]: fieldValue,
  //   }));
  // };

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
        // Assuming your API endpoint for updating a student is '/api/student/:id'
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        message.success("Details updated successfully!");
        window.location.reload();
      } else {
        // Handle specific error cases based on response status
        if (res.status === 404) {
          throw new Error("Student not found");
        } else {
          throw new Error("Failed to update details");
        }
      }
    } catch (error) {
      console.error("Error updating student details:", error);
      message.error(error.message); // Display the error message to the user
    }
  };

  return (
    <>
      {status === "authenticated" ? (
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
                    // imageSrc ||
                    // "https://media.istockphoto.com/id/1200064810/vector/user-profile-login-or-access-authentication-icon-button-people-account-sign-in-logo-sign.jpg?s=612x612&w=0&k=20&c=p7KoaWP5NLXGldaUjJ1daqJhDK2YNYB_fbz7X-TmpyQ="
                    // "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"

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
                    {student ? `${student.name} ${student.surname}` : "Loading..."  }
                  </div>
                </div>
                <form onSubmit={confirm}>
                  <div className={styles.details}>
                    <div className={styles.detailsContainer}>
                      {/* {student ? ( */}
                      <div className={styles.name}>
                        <div className={styles.title}>Name</div>
                        <div>
                          {student ? (
                            <input
                              type="text"
                              placeholder={student.name}
                              className={styles.input}
                              onChange={handleChange}
                              value={formData.name}
                              name="name"
                            />
                          ) : (
                            <input
                              type="text"
                              placeholder="Your name is not registered yet"
                              className={styles.input}
                              onChange={handleChange}
                              name="name"
                              // value={formData.name}
                              // value={student.name}
                            />
                          )}
                        </div>
                      </div>
                      <div className={styles.name}>
                        <div className={styles.title}>Enrollment No</div>
                        <div>
                          {student ? (
                            <input
                              type="text"
                              placeholder={student.enrollment_no}
                              className={styles.input}
                              onChange={handleChange}
                            />
                          ) : (
                            <input
                              type="text"
                              placeholder="Your enrollment number is not registered yet"
                              className={styles.input}
                              onChange={handleChange}
                            />
                          )}
                        </div>
                      </div>
                      <div className={styles.name}>
                        <div className={styles.title}>Address</div>
                        <div>
                          {student ? (
                            <input
                              type="text"
                              placeholder={student.address.street}
                              className={styles.input}
                              onChange={handleChange}
                            />
                          ) : (
                            <input
                              type="text"
                              placeholder="Your address is not registered yet"
                              className={styles.input}
                              onChange={handleChange}
                            />
                          )}
                        </div>
                      </div>
                      <div className={styles.name}>
                        <div className={styles.title}>Parents Mobile No</div>
                        <div>
                          {student ? (
                            <input
                              type="text"
                              placeholder={student.father_mobile}
                              className={styles.input}
                              onChange={handleChange}
                            />
                          ) : (
                            <input
                              type="text"
                              placeholder="Your father's mobile number is not registered yet"
                              className={styles.input}
                              onChange={handleChange}
                            />
                          )}
                        </div>
                      </div>
                      <div className={styles.name}>
                        <div className={styles.title}>Alternate Mobile No</div>
                        <div>
                          {student ? (
                            <input
                              type="text"
                              placeholder={student.mother_mobile}
                              className={styles.input}
                              onChange={handleChange}
                            />
                          ) : (
                            <input
                              type="text"
                              placeholder="Your mother's mobile number is not registered yet"
                              className={styles.input}
                              onChange={handleChange}
                            />
                          )}
                        </div>
                      </div>
                      {/* ) : (
                        <p>Loading...</p>
          )} */}
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
      ) : null}
    </>
  );
}

export default Profile;
