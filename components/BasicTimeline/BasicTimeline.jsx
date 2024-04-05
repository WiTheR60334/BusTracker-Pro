"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import styles from "./BasicTimeline.module.css";
import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import AllBusDetails from "../AllBusDetails/AllBusDetails";
import AllRoutesDetails from "../AllRoutesDetails/AllRoutesDetails";
import AllBusLocationDetails from "../AllBusLocationDetails/AllBusLocationDetails";
import { RiErrorWarningFill } from "react-icons/ri";
import { IoWarningOutline } from "react-icons/io5";
import AdminProtectedRoute from "../../app/adminprotected/page";
import StudentProtectedRoute from "../../app/studentprotected/page";

const getTextColorClassName = (text) => {
  if (text === "High") {
    return <div className={styles.greenText}>On Time</div>;
  } else if (text === "Avg") {
    return (
      <div className={styles.yellowText}>
        <div>
          <IoWarningOutline
            style={{
              fontWeight: "bold",
              alignItems: "center",
              marginTop: ".15rem",
              marginRight: ".2rem",
            }}
          />{" "}
        </div>
        Delay
      </div>
    );
  } else if (text === "Low") {
    return <div className={styles.redText}>Holiday</div>;
  } else {
    return "";
  }
};

function BasicTimeline() {
  const { data: session, status } = useSession();
  const theme = useTheme();
  const isBelow716px = useMediaQuery(theme.breakpoints.down(716));
  const [allBusDetails, setAllBusDetails] = useState([]);
  const [allBusRoutes, setAllBusRoutes] = useState([]);
  const [allBusLocation, setAllBusLocation] = useState([]);
  const [student, setStudent] = useState(null);
  const [addresses, setAddresses] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllBusData = async () => {
      const allBusData = await AllBusDetails();
      setAllBusDetails(allBusData);

      const busRoutes = await AllRoutesDetails();
      setAllBusRoutes(busRoutes);

      // const busLocation = await AllBusLocationDetails();
      // setAllBusLocation(busLocation);
    };
    fetchAllBusData();
  }, []);

  useEffect(() => {
    const fetchAllBusLocationData = async () => {
      const busLocation = await AllBusLocationDetails();
      setAllBusLocation(busLocation);
    };

    fetchAllBusLocationData();

    const interval = setInterval(() => {
      fetchAllBusLocationData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await fetch("/api/Connector", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: session.user.email }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch student data");
        }

        const data = await response.json();
        setStudent(data.body.busNo);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchStudentData();
  }, [session]);

  useEffect(() => {
    const fetchAddresses = async () => {
      const updatedAddresses = {};
      for (const location of allBusLocation) {
        const { lattitude, longitude, registration_no } = location;
        const response = await fetch(
          `https://api.geoapify.com/v1/geocode/reverse?lat=${lattitude}&lon=${longitude}&apiKey=${process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY}`
        );
        const data = await response.json();
        updatedAddresses[registration_no] =
          data.features[0].properties.address_line1;
      }
      setAddresses(updatedAddresses);
    };

    if (allBusLocation.length > 0) {
      fetchAddresses();
    }
  }, [allBusLocation]);

  return (
    <>
      <AdminProtectedRoute>
        {allBusDetails &&
          Array.isArray(allBusDetails) &&
          allBusDetails.map((bus) => (
            <div className={styles.container}>
              <div key={bus._id}>
                <div className={styles.title}>
                  Bus No: {bus.registration_no}
                </div>
                <div className={styles.details}>
                  <div className={styles.timeline}>
                    <Timeline
                      sx={{
                        [`& .${timelineItemClasses.root}:before`]: {
                          flex: isBelow716px ? 0.1 : 0.2,
                          padding: 0,
                        },
                      }}
                    >
                      <TimelineItem>
                        <TimelineSeparator>
                          <TimelineDot />
                          <TimelineConnector style={{ height: "4rem" }} />
                        </TimelineSeparator>
                        <TimelineContent color="textSecondary">
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              marginTop: "-.3rem",
                            }}
                          >
                            <div
                              style={{
                                fontSize: "20px",
                                color: "black",
                                fontWeight: "750",
                              }}
                            >
                              Departure from Depot
                            </div>
                            <div>6:15 am</div>
                          </div>
                        </TimelineContent>
                      </TimelineItem>
                      <TimelineItem>
                        <TimelineSeparator>
                          <TimelineDot />
                          <TimelineConnector style={{ height: "4rem" }} />
                        </TimelineSeparator>
                        <TimelineContent color="textSecondary">
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              marginTop: "-.3rem",
                            }}
                          >
                            {allBusRoutes.map((route) => {
                              if (
                                route.registration_no === bus.registration_no
                              ) {
                                return (
                                  <div
                                    key={route._id}
                                    style={{
                                      fontSize: "20px",
                                      color: "black",
                                      fontWeight: "750",
                                    }}
                                  >
                                    {route.area1}
                                  </div>
                                );
                              } else {
                                <div>
                                  None bus has been assigned this route
                                </div>;
                              }
                            })}
                            <div>6:30 am</div>
                          </div>
                        </TimelineContent>
                      </TimelineItem>
                      <TimelineItem>
                        <TimelineSeparator>
                          <TimelineDot />
                          <TimelineConnector style={{ height: "4rem" }} />
                        </TimelineSeparator>
                        <TimelineContent color="textSecondary">
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              marginTop: "-.3rem",
                            }}
                          >
                            {allBusRoutes.map((route) => {
                              if (
                                route.registration_no === bus.registration_no
                              ) {
                                return (
                                  <div
                                    key={route._id}
                                    style={{
                                      fontSize: "20px",
                                      color: "black",
                                      fontWeight: "750",
                                    }}
                                  >
                                    {route.area2}
                                  </div>
                                );
                              } else {
                                <div>
                                  None bus has been assigned this route
                                </div>;
                              }
                            })}
                            <div>6:35 am</div>
                          </div>
                        </TimelineContent>
                      </TimelineItem>
                      <TimelineItem>
                        <TimelineSeparator>
                          <TimelineDot />
                          <TimelineConnector style={{ height: "4rem" }} />
                        </TimelineSeparator>
                        <TimelineContent color="textSecondary">
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              marginTop: "-.3rem",
                            }}
                          >
                            {allBusRoutes.map((route) => {
                              if (
                                route.registration_no === bus.registration_no
                              ) {
                                return (
                                  <div
                                    key={route._id}
                                    style={{
                                      fontSize: "20px",
                                      color: "black",
                                      fontWeight: "750",
                                    }}
                                  >
                                    {route.area3}
                                  </div>
                                );
                              } else {
                                <div>
                                  None bus has been assigned this route
                                </div>;
                              }
                            })}
                            <div>6:40 am</div>
                          </div>
                        </TimelineContent>
                      </TimelineItem>
                      <TimelineItem>
                        <TimelineSeparator>
                          <TimelineDot />
                          {/* <TimelineConnector style={{ height: "4rem" }} /> */}
                        </TimelineSeparator>
                        <TimelineContent color="textSecondary">
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              marginTop: "-.3rem",
                            }}
                          >
                            {allBusRoutes.map((route) => {
                              if (
                                route.registration_no === bus.registration_no
                              ) {
                                return (
                                  <div
                                    key={route._id}
                                    style={{
                                      fontSize: "20px",
                                      color: "black",
                                      fontWeight: "750",
                                    }}
                                  >
                                    {route.area4}
                                  </div>
                                );
                              } else {
                                <div>
                                  None bus has been assigned this route
                                </div>;
                              }
                            })}
                            <div>6:45 am</div>
                          </div>
                        </TimelineContent>
                      </TimelineItem>
                      {/* <TimelineItem>
                        <TimelineSeparator>
                          <TimelineDot />
                        </TimelineSeparator>
                        <TimelineContent color="textSecondary">
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              marginTop: "-.3rem",
                            }}
                          >
                            <div
                              style={{
                                fontSize: "20px",
                                color: "black",
                                fontWeight: "750",
                              }}
                            >
                              School
                            </div>
                            <div>7:00 am</div>
                          </div>
                        </TimelineContent>
                      </TimelineItem> */}
                    </Timeline>
                  </div>
                  <div className={styles.content}>
                    <div className={styles.wrapper}>
                      <div className={styles.busStatus}>
                        Bus Status :{getTextColorClassName("High")}
                        {/* {getTextColorClassName("Avg")} */}
                        {/* {getTextColorClassName("Low")} */}
                      </div>
                      <div className={styles.busDetails}>
                        {/* <div className={styles.items}>
                          <div className={styles.itemName}>Average Speed:</div>
                          {allBusLocation.map((location) => {
                            if (
                              location.registration_no === bus.registration_no
                            ) {
                              return (
                                <div className={styles.itemValue}>
                                  {location.speed} km/h
                                </div>
                              );
                            } else {
                              <div>Location is updating.....</div>;
                            }
                          })}
                        </div> */}
                        {/* <div className={styles.items}>
                    <div className={styles.itemName}>Distance:</div>
                    <div className={styles.itemValue}>200 m</div>
                  </div> */}
                        <div className={styles.items}>
                          <div className={styles.itemName}>Estimated Time:</div>
                          {allBusLocation.map((location) => {
                            if (
                              location.registration_no === bus.registration_no
                            ) {
                              return (
                                <div className={styles.itemValue}>
                                  {location.estimated_time ||
                                    "Time is calculating..."}{" "}
                                  m
                                </div>
                              );
                            } else {
                              <div>Location is updating.....</div>;
                            }
                          })}
                        </div>
                        <div className={styles.items}>
                          <div className={styles.itemName}>Live Location:</div>
                          {allBusLocation.map((location) => {
                            if (
                              location.registration_no === bus.registration_no
                            ) {
                              return (
                                <div className={styles.itemValue}>
                                  {/* {addresses[location.registration_no] ||
                                    "Address is updating..."} */}
                                  {location.address || "Address is updating..."}
                                </div>
                              );
                            } else {
                              <div>Location is updating.....</div>;
                            }
                          })}
                        </div>
                        <div className={styles.items}>
                          <div className={styles.itemName}>Total Seats : </div>
                          <div className={styles.itemValue}>40</div>
                        </div>
                        <div className={styles.items}>
                          <div className={styles.itemName}>
                            Available Seats:
                          </div>
                          <div className={styles.itemValue}>22</div>
                        </div>
                      </div>
                      <div className={styles.fault}>
                        <RiErrorWarningFill
                          style={{
                            color: "red",
                            marginRight: ".3rem",
                          }}
                        />
                        Fault Type :{" "}
                        <div
                          style={{ marginLeft: ".5rem", fontWeight: "bolder" }}
                        >
                          {" "}
                          None
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </AdminProtectedRoute>

      <StudentProtectedRoute>
        <div className={styles.container}>
          <div className={styles.title}>Bus No: {student}</div>
          <div className={styles.details}>
            <div className={styles.timeline}>
              <Timeline
                sx={{
                  [`& .${timelineItemClasses.root}:before`]: {
                    flex: isBelow716px ? 0.1 : 0.2,
                    padding: 0,
                  },
                }}
              >
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot  />
                    <TimelineConnector style={{ height: "4rem" }} />
                  </TimelineSeparator>
                  <TimelineContent color="textSecondary">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginTop: "-.3rem",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "20px",
                          color: "black",
                          fontWeight: "750",
                        }}
                      >
                        Departure from Depot
                      </div>
                      <div>6:15 am</div>
                    </div>
                  </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot  />
                    <TimelineConnector style={{ height: "4rem" }} />
                  </TimelineSeparator>
                  <TimelineContent color="textSecondary">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginTop: "-.3rem",
                      }}
                    >
                      {allBusRoutes.map((route) => {
                        if (route.registration_no === student) {
                          return (
                            <div
                              key={route._id}
                              style={{
                                fontSize: "20px",
                                color: "black",
                                fontWeight: "750",
                              }}
                            >
                              {route.area1}
                            </div>
                          );
                        } else {
                          <div>None bus has been assigned this route</div>;
                        }
                      })}
                      <div>6:30 am</div>
                    </div>
                  </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot  />
                    <TimelineConnector style={{ height: "4rem" }} />
                  </TimelineSeparator>
                  <TimelineContent color="textSecondary">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginTop: "-.3rem",
                      }}
                    >
                      {allBusRoutes.map((route) => {
                        if (route.registration_no === student) {
                          return (
                            <div
                              key={route._id}
                              style={{
                                fontSize: "20px",
                                color: "black",
                                fontWeight: "750",
                              }}
                            >
                              {route.area2}
                            </div>
                          );
                        } else {
                          <div>None bus has been assigned this route</div>;
                        }
                      })}
                      <div>6:35 am</div>
                    </div>
                  </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector style={{ height: "4rem" }} />
                  </TimelineSeparator>
                  <TimelineContent color="textSecondary">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginTop: "-.3rem",
                      }}
                    >
                      {allBusRoutes.map((route) => {
                        if (route.registration_no === student) {
                          return (
                            <div
                              key={route._id}
                              style={{
                                fontSize: "20px",
                                color: "black",
                                fontWeight: "750",
                              }}
                            >
                              {route.area3}
                            </div>
                          );
                        } else {
                          <div>None bus has been assigned this route</div>;
                        }
                      })}
                      <div>6:40 am</div>
                    </div>
                  </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot />
                    {/* <TimelineConnector style={{ height: "4rem" }} /> */}
                  </TimelineSeparator>
                  <TimelineContent color="textSecondary">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginTop: "-.3rem",
                      }}
                    >
                      {allBusRoutes.map((route) => {
                        if (route.registration_no === student) {
                          return (
                            <div
                              key={route._id}
                              style={{
                                fontSize: "20px",
                                color: "black",
                                fontWeight: "750",
                              }}
                            >
                              {route.area4}
                            </div>
                          );
                        } else {
                          <div>None bus has been assigned this route</div>;
                        }
                      })}
                      <div>6:45 am</div>
                    </div>
                  </TimelineContent>
                </TimelineItem>

                {/* <TimelineItem>
                    <TimelineSeparator>
                      <TimelineDot />
                    </TimelineSeparator>
                    <TimelineContent color="textSecondary">
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          marginTop: "-.3rem",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "20px",
                            color: "black",
                            fontWeight: "750",
                          }}
                        >
                          School
                        </div>
                        <div>7:00 am</div>
                      </div>
                    </TimelineContent>
                  </TimelineItem> */}
              </Timeline>
            </div>
            <div className={styles.content}>
              <div className={styles.wrapper}>
                <div className={styles.busStatus}>
                  Bus Status :{getTextColorClassName("High")}
                  {/* {getTextColorClassName("Avg")} */}
                  {/* {getTextColorClassName("Low")} */}
                </div>
                <div className={styles.busDetails}>
                  {/* <div className={styles.items}>
                    <div className={styles.itemName}>Average Speed:</div>
                    {allBusLocation.map((location) => {
                      if (location.registration_no === student) {
                        return (
                          <div className={styles.itemValue}>
                            {location.speed} km/h
                          </div>
                        );
                      } else {
                        <div>Location is updating.....</div>;
                      }
                    })}
                  </div> */}
                  {/* <div className={styles.items}>
                    <div className={styles.itemName}>Distance:</div>
                    <div className={styles.itemValue}>200 m</div>
                  </div> */}
                  <div className={styles.items}>
                    <div className={styles.itemName}>Estimated Time:</div>
                    {allBusLocation.map((location) => {
                      if (location.registration_no === student) {
                        return (
                          <div className={styles.itemValue}>
                            {/* {addresses[location.registration_no] ||
                              "Address is updating..."} */}
                            {location.estimated_time ||
                              "Address is updating..."}
                          </div>
                        );
                      } else {
                        <div>Location is updating.....</div>;
                      }
                    })}
                  </div>
                  <div className={styles.items}>
                    <div className={styles.itemName}>Live Location:</div>
                    {allBusLocation.map((location) => {
                      if (location.registration_no === student) {
                        return (
                          <div className={styles.itemValue}>
                            {/* {addresses[location.registration_no] ||
                              "Address is updating..."} */}
                            {location.address || "Address is updating..."}
                          </div>
                        );
                      } else {
                        <div>Location is updating.....</div>;
                      }
                    })}
                  </div>
                  <div className={styles.items}>
                    <div className={styles.itemName}>Total Seats:</div>
                    <div className={styles.itemValue}>40</div>
                  </div>
                  <div className={styles.items}>
                    <div className={styles.itemName}>Available Seats:</div>
                    <div className={styles.itemValue}>22</div>
                  </div>
                </div>
                <div className={styles.fault}>
                  <RiErrorWarningFill
                    style={{
                      color: "red",
                      marginRight: ".3rem",
                    }}
                  />
                  Fault Type :{" "}
                  <div style={{ marginLeft: ".5rem", fontWeight: "bolder" }}>
                    {" "}
                    None
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </StudentProtectedRoute>
    </>
  );
}

export default BasicTimeline;
