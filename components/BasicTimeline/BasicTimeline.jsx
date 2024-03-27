"use client";
import * as React from "react";
import { useEffect, useState } from "react";
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
  const theme = useTheme();
  const isBelow716px = useMediaQuery(theme.breakpoints.down(716));
  const [allBusDetails, setAllBusDetails] = useState([]);

  useEffect(() => {
    const fetchAllBusData = async () => {
      const allBusData = await AllBusDetails();
      setAllBusDetails(allBusData);
    };
    fetchAllBusData();
  }, []);

  return (
     <>
      <AdminProtectedRoute>
      {allBusDetails && Array.isArray(allBusDetails) && (
          allBusDetails.map((bus) => (
    <div className={styles.container}>

        <div key={bus._id}>
          <div className={styles.title}>Bus No: {bus.registration_no}</div>
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
                    <TimelineDot style={{ backgroundColor: "blue" }} />
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
                    <TimelineDot style={{ backgroundColor: "blue" }} />
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
                        House 1
                      </div>
                      <div>6:30 am</div>
                    </div>
                  </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot style={{ backgroundColor: "red" }} />
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
                        House 2 (Skipped)
                      </div>
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
                      <div
                        style={{
                          fontSize: "20px",
                          color: "black",
                          fontWeight: "750",
                        }}
                      >
                        House 3
                      </div>
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
                </TimelineItem>
              </Timeline>
            </div>
            <div className={styles.content}>
              <div className={styles.wrapper}>
                <div className={styles.busStatus}>
                  Bus Status :{/* {getTextColorClassName("High")} */}
                  {getTextColorClassName("Avg")}
                  {/* {getTextColorClassName("Low")} */}
                </div>
                <div className={styles.busDetails}>
                  <div className={styles.items}>
                    <div className={styles.itemName}>Average Speed:</div>
                    <div className={styles.itemValue}>30 km/hr</div>
                  </div>
                  <div className={styles.items}>
                    <div className={styles.itemName}>Distance:</div>
                    <div className={styles.itemValue}>200 m</div>
                  </div>
                  <div className={styles.items}>
                    <div className={styles.itemName}>Estimated Time:</div>
                    <div className={styles.itemValue}>5 m</div>
                  </div>
                  <div className={styles.items}>
                    <div className={styles.itemName}>Live Location:</div>
                    <div className={styles.itemValue}>Commerce Six Roads</div>
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
                    Traffic
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
      ))
      )}

      </AdminProtectedRoute>
      <StudentProtectedRoute>
      {allBusDetails && Array.isArray(allBusDetails) && (
          allBusDetails.map((bus) => (
    <div className={styles.container}>

        <div key={bus._id}>
          <div className={styles.title}>Bus No: {bus.registration_no}</div>
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
                    <TimelineDot style={{ backgroundColor: "blue" }} />
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
                    <TimelineDot style={{ backgroundColor: "blue" }} />
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
                        House 1
                      </div>
                      <div>6:30 am</div>
                    </div>
                  </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot style={{ backgroundColor: "red" }} />
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
                        House 2 (Skipped)
                      </div>
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
                      <div
                        style={{
                          fontSize: "20px",
                          color: "black",
                          fontWeight: "750",
                        }}
                      >
                        House 3
                      </div>
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
                </TimelineItem>
              </Timeline>
            </div>
            <div className={styles.content}>
              <div className={styles.wrapper}>
                <div className={styles.busStatus}>
                  Bus Status :{/* {getTextColorClassName("High")} */}
                  {getTextColorClassName("Avg")}
                  {/* {getTextColorClassName("Low")} */}
                </div>
                <div className={styles.busDetails}>
                  <div className={styles.items}>
                    <div className={styles.itemName}>Average Speed:</div>
                    <div className={styles.itemValue}>30 km/hr</div>
                  </div>
                  <div className={styles.items}>
                    <div className={styles.itemName}>Distance:</div>
                    <div className={styles.itemValue}>200 m</div>
                  </div>
                  <div className={styles.items}>
                    <div className={styles.itemName}>Estimated Time:</div>
                    <div className={styles.itemValue}>5 m</div>
                  </div>
                  <div className={styles.items}>
                    <div className={styles.itemName}>Live Location:</div>
                    <div className={styles.itemValue}>Commerce Six Roads</div>
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
                    Traffic
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
      ))
      )}

      </StudentProtectedRoute>
     </>
  );
}

export default BasicTimeline;
