import React, { useEffect, useState } from "react"
import Chart from "react-apexcharts"
import axiosInstance from "../../axiosConfig"

const Project = () => {
  return (
    <div className="card">
      <div className="card-header pb-0 border-0">
        <h4 className="heading mb-0">Projects Status</h4>
        <select className="default-select status-select normal-select">
          <option value="Today">Today</option>
          <option value="Week">Week</option>
          <option value="Month">Month</option>
        </select>
      </div>
      <div className="card-body">
        <div id="projectChart" className="project-chart" />
        <div className="project-date">
          <div className="project-media">
            <p className="mb-0">
              <svg
                className="me-2"
                width={12}
                height={13}
                viewBox="0 0 12 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  y="0.5"
                  width={12}
                  height={12}
                  rx={3}
                  fill="var(--primary)"
                />
              </svg>
              Completed Projects
            </p>
            <span>125 Projects</span>
          </div>
          <div className="project-media">
            <p className="mb-0">
              <svg
                className="me-2"
                width={12}
                height={13}
                viewBox="0 0 12 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect y="0.5" width={12} height={12} rx={3} fill="#3AC977" />
              </svg>
              Progress Projects
            </p>
            <span>125 Projects</span>
          </div>
          <div className="project-media">
            <p className="mb-0">
              <svg
                className="me-2"
                width={12}
                height={13}
                viewBox="0 0 12 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect y="0.5" width={12} height={12} rx={3} fill="#FF5E5E" />
              </svg>
              Cancelled
            </p>
            <span>125 Projects</span>
          </div>
          <div className="project-media">
            <p className="mb-0">
              <svg
                className="me-2"
                width={12}
                height={13}
                viewBox="0 0 12 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect y="0.5" width={12} height={12} rx={3} fill="#FF9F00" />
              </svg>
              Yet to Start
            </p>
            <span>125 Projects</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Project
