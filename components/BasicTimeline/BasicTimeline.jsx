import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";

function BasicTimeline() {
  return (
    <Timeline
      sx={{
        [`& .${timelineItemClasses.root}:before`]: {
          flex: 0.2,
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
              style={{ fontSize: "20px", color: "black", fontWeight: "750" }}
            >
              Departure from Depot
            </div>
            {/* <div>6:30 am</div> */}
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
              style={{ fontSize: "20px", color: "black", fontWeight: "750" }}
            >
              House 1
            </div>
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
            <div style={{ fontSize: "20px", color: "black",fontWeight: "750" }}>House 2</div>
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
            <div style={{ fontSize: "20px", color: "black", fontWeight: "750" }}>House 3</div>
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
            <div style={{ fontSize: "20px", color: "black", fontWeight: "750" }}>School</div>
            <div>7:00 am</div>
          </div>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}

export default BasicTimeline;
