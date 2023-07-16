import React, { useState } from "react";
import JobCardStyles from "./JobCard.module.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";

function JobCard({ job }) {

  return (
    <div className={JobCardStyles.container} >
      <div className={JobCardStyles.theme}></div>
      <div className={JobCardStyles.card}>
        <span style={{ fontWeight: "bold", fontSize: "24px" }}>{job.role}</span>
        <span style={{ fontStyle: "italic", fontSize: "18px", color: "gray" }}>
          {job.company}
        </span>
        <div style={{ display: "flex", padding: "15px 0" }}>
          <LocationOnIcon style={{}} />
          <span style={{}}>{job.location}</span>
        </div>

        <div className={JobCardStyles.lower}>
          <div className={JobCardStyles.lowerContent}>
            <span className={JobCardStyles.lowerHeading}>Start Date</span>
            <span className={JobCardStyles.lowerContents}>{job.startDate}</span>
          </div>
          <div className={JobCardStyles.lowerContent}>
            <span className={JobCardStyles.lowerHeading}>Duration</span>
            <span className={JobCardStyles.lowerContents}>{job.duration}</span>
          </div>
          <div className={JobCardStyles.lowerContent}>
            <span className={JobCardStyles.lowerHeading}>Stipend</span>
            <span className={JobCardStyles.lowerContents}>{job.stipend}</span>
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default JobCard;
