import * as React from "react";
import styles from "./BasicTimeline.module.css";
import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { IoWarningOutline } from "react-icons/io5";

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
  return (
    <div className={styles.container}>
      <div className={styles.title}>Bus No: 1234</div>
      <div className={styles.details}>
        <div className={styles.timeline}>
          <Timeline
            sx={{
              [`& .${timelineItemClasses.root}:before`]: {
                flex: 0.1,
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
              Bus Status : {getTextColorClassName("High")}
              {/* {getTextColorClassName("Avg")}
              {getTextColorClassName("Low")} */}
            </div>
            <div className={styles.busDetails}>
              <div className={styles.items}>
                <div className={styles.itemName}>
                  Average Speed:
                </div>
                <div className={styles.itemValue}>
                  30 km/hr
                </div>
              </div>
              <div className={styles.items}>
                <div className={styles.itemName}>
                  Distance:
                </div>
                <div className={styles.itemValue}>
                  200 m
                </div>
              </div>
              <div className={styles.items}>
                <div className={styles.itemName}>
                  Estimated Time:
                </div>
                <div className={styles.itemValue}>
                  5 m
                </div>
              </div>
              <div className={styles.items}>
                <div className={styles.itemName}>
                  Live Location:
                </div>
                <div className={styles.itemValue}>
                  Commerce Six Roads
                </div>
              </div>
              <div className={styles.items}>
                <div className={styles.itemName}>
                  Total Seats:
                </div>
                <div className={styles.itemValue}>
                  40
                </div>
              </div>
              <div className={styles.items}>
                <div className={styles.itemName}>
                  Available Seats:
                </div>
                <div className={styles.itemValue}>
                  22
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasicTimeline;
