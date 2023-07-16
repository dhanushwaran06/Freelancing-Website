import React, { useState, useEffect } from "react";
import JobStyles from "./Jobs.module.css";
import _ from "lodash";
import JobCard from "../../components/JobCard/JobCard";

function Jobs({ user }) {
  const [jobs, setJobs] = useState([]);
  const [recomendedJobs, setRecomonedJobs] = useState([]);
  const [popularJobs, setPopularJobs] = useState([]);
  const [jobState, setJobState] = useState("recomended");

  useEffect(() => {
    getJobs();
  }, []);

  useEffect(() => {
    const recJobs = _.filter(jobs, (job) => {
      return doesUserSkillsMatch(user.skills, job.skills);
    });
    setRecomonedJobs(recJobs);
  }, [user, jobs]);

  const getJobs = async () => {
    fetch("http://localhost:4000/jobs")
      .then((response) => {
        const res = response.json();
        return res;
      })
      .then((job) => {
        let jobs = job;
        setJobs(jobs);
      });
  };

  const doesUserSkillsMatch = (userSkills, jobSkills) => {
    return userSkills?.some((skill) => jobSkills.includes(skill));
  };

  return (
    <div className={JobStyles.home}>
      <div className={JobStyles.filterContainer}>
        <span
          className={JobStyles.tags}
          onClick={() => setJobState("recomended")}
          style={
            jobState === "recomended"
              ? { backgroundColor: "green", color: "white" }
              : {}
          }>
          Recomended
        </span>
        <span
          className={JobStyles.tags}
          onClick={() => setJobState("popular")}
          style={
            jobState === "popular"
              ? { backgroundColor: "green", color: "white" }
              : {}
          }>
          Popular
        </span>
        <span
          className={JobStyles.tags}
          onClick={() => setJobState("allJobs")}
          style={
            jobState === "allJobs"
              ? { backgroundColor: "green", color: "white" }
              : {}
          }>
          All Jobs
        </span>
      </div>
      <div className={JobStyles.container}>
        {jobState === "allJobs" &&
          jobs &&
          jobs.map((job) => {
            return <JobCard key={job.title} job={job} />;
          })}
        {jobState === "recomended" &&
          recomendedJobs &&
          recomendedJobs.map((job) => {
            return <JobCard key={job.title} job={job} />;
          })}
        {jobState === "popular" &&
          popularJobs &&
          popularJobs.map((job) => {
            return <JobCard key={job.title} job={job} />;
          })}
      </div>
    </div>
  );
}

export default Jobs;
