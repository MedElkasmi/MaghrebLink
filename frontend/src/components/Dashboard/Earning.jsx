import React from "react";

const Earning = () => {
    return (
        <div className="card">
            <div className="card-header border-0 pb-0">
                <h4 className="heading mb-0">Total Earning</h4>
            </div>
            <div className="card-body px-0 overflow-hidden">
                <div className="total-earning">
                <h2>$6,743.00</h2>
                <ul
                    className="nav nav-underline mb-3 earning-tab earning-chart"
                    id="pills-tab1"
                    role="tablist"
                >
                    <li className="nav-item px-2" role="presentation">
                    <button
                        className="nav-link py-2 px-0 border-3 m-0 active"
                        data-series="day"
                        id="pills-day-tab1"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-day1"
                        type="button"
                        role="tab"
                        aria-selected="true"
                    >
                        Day
                    </button>
                    </li>
                    <li className="nav-item px-2" role="presentation">
                    <button
                        className="nav-link py-2 px-0 border-3 m-0"
                        id="pills-week-tab1"
                        data-series="week"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-week1"
                        type="button"
                        role="tab"
                        aria-selected="false"
                    >
                        Week
                    </button>
                    </li>
                    <li className="nav-item px-2" role="presentation">
                    <button
                        className="nav-link py-2 px-0 border-3 m-0"
                        id="pills-month-tab1"
                        data-series="month"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-month1"
                        type="button"
                        role="tab"
                        aria-selected="false"
                    >
                        Month
                    </button>
                    </li>
                    <li className="nav-item px-2" role="presentation">
                    <button
                        className="nav-link py-2 px-0 border-3 m-0"
                        id="pills-year-tab1"
                        data-series="year"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-year1"
                        type="button"
                        role="tab"
                        aria-selected="false"
                    >
                        Year
                    </button>
                    </li>
                </ul>
                <div id="earningChart" />
                </div>
            </div>
        </div>

    )
}

export default Earning