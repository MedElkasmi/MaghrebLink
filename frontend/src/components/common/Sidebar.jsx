import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
 
    return (
        <div className="deznav" style={{ flex: 1 }}>
            <div className="deznav-scroll">
                <ul className="metismenu" id="menu">
                    <li className="menu-title">MaghrebLink</li>
                    
                    <li>
                        <Link to="/admin/dashboard">
                            <div className="menu-icon">
                                <svg
                                    width={20}
                                    height={20}
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M2.5 7.49999L10 1.66666L17.5 7.49999V16.6667C17.5 17.1087 17.3244 17.5326 17.0118 17.8452C16.6993 18.1577 16.2754 18.3333 15.8333 18.3333H4.16667C3.72464 18.3333 3.30072 18.1577 2.98816 17.8452C2.67559 17.5326 2.5 17.1087 2.5 16.6667V7.49999Z"
                                        stroke="#888888"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M7.5 18.3333V10H12.5V18.3333"
                                        stroke="#888888"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                            Dashboard
                        </Link>
                    </li>
                    
                    <li>
                        <a className="has-arrow" href="#" aria-expanded="false">
                            <div className="menu-icon">
                                <svg
                                    width={20}
                                    height={20}
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M2.5 7.49999L10 1.66666L17.5 7.49999V16.6667C17.5 17.1087 17.3244 17.5326 17.0118 17.8452C16.6993 18.1577 16.2754 18.3333 15.8333 18.3333H4.16667C3.72464 18.3333 3.30072 18.1577 2.98816 17.8452C2.67559 17.5326 2.5 17.1087 2.5 16.6667V7.49999Z"
                                        stroke="#888888"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M7.5 18.3333V10H12.5V18.3333"
                                        stroke="#888888"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                            <span className="nav-text">Clients</span>
                        </a>
                        <ul aria-expanded="false">
                            <li>
                                <Link to="/admin/clients">List</Link>
                            </li>
                            <li>
                                <Link to="/admin/clients/store">Add</Link>
                            </li>
                            <li>
                                <Link to="/admin/clients/removed">Archive</Link>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <a className="has-arrow" href="#" aria-expanded="false">
                            <div className="menu-icon">
                                <svg
                                    width={20}
                                    height={20}
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M2.5 7.49999L10 1.66666L17.5 7.49999V16.6667C17.5 17.1087 17.3244 17.5326 17.0118 17.8452C16.6993 18.1577 16.2754 18.3333 15.8333 18.3333H4.16667C3.72464 18.3333 3.30072 18.1577 2.98816 17.8452C2.67559 17.5326 2.5 17.1087 2.5 16.6667V7.49999Z"
                                        stroke="#888888"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M7.5 18.3333V10H12.5V18.3333"
                                        stroke="#888888"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                            <span className="nav-text">Shipments</span>
                        </a>
                        <ul aria-expanded="false">
                            <li>
                                <Link to="/admin/shipments">List</Link>
                            </li>
                            <li>
                                <Link to="/admin/shipments/store">Add</Link>
                            </li>
                            <li>
                                <Link to="/admin/shipments/removed">Archive</Link>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <a className="has-arrow" href="#" aria-expanded="false">
                            <div className="menu-icon">
                                <svg
                                    width={20}
                                    height={20}
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M2.5 7.49999L10 1.66666L17.5 7.49999V16.6667C17.5 17.1087 17.3244 17.5326 17.0118 17.8452C16.6993 18.1577 16.2754 18.3333 15.8333 18.3333H4.16667C3.72464 18.3333 3.30072 18.1577 2.98816 17.8452C2.67559 17.5326 2.5 17.1087 2.5 16.6667V7.49999Z"
                                        stroke="#888888"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M7.5 18.3333V10H12.5V18.3333"
                                        stroke="#888888"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                            <span className="nav-text">Goods</span>
                        </a>
                        <ul aria-expanded="false">
                            <li>
                                <Link to="/admin/goods">List</Link>
                            </li>
                            <li>
                                <Link to="/admin/goods/store">Add</Link>
                            </li>
                            <li>
                                <Link to="/admin/goods/removed">Archive</Link>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <a className="has-arrow" href="#" aria-expanded="false">
                            <div className="menu-icon">
                                <svg
                                    width={20}
                                    height={20}
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M2.5 7.49999L10 1.66666L17.5 7.49999V16.6667C17.5 17.1087 17.3244 17.5326 17.0118 17.8452C16.6993 18.1577 16.2754 18.3333 15.8333 18.3333H4.16667C3.72464 18.3333 3.30072 18.1577 2.98816 17.8452C2.67559 17.5326 2.5 17.1087 2.5 16.6667V7.49999Z"
                                        stroke="#888888"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M7.5 18.3333V10H12.5V18.3333"
                                        stroke="#888888"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                            <span className="nav-text">Drivers</span>
                        </a>
                        <ul aria-expanded="false">
                            <li>
                                <Link to="/admin/drivers">List</Link>
                            </li>
                            <li>
                                <Link to="/admin/drivers/store">Add</Link>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <a className="has-arrow" href="#" aria-expanded="false">
                            <div className="menu-icon">
                                <svg
                                    width={20}
                                    height={20}
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M2.5 7.49999L10 1.66666L17.5 7.49999V16.6667C17.5 17.1087 17.3244 17.5326 17.0118 17.8452C16.6993 18.1577 16.2754 18.3333 15.8333 18.3333H4.16667C3.72464 18.3333 3.30072 18.1577 2.98816 17.8452C2.67559 17.5326 2.5 17.1087 2.5 16.6667V7.49999Z"
                                        stroke="#888888"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M7.5 18.3333V10H12.5V18.3333"
                                        stroke="#888888"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                            <span className="nav-text">Tracking System</span>
                        </a>
                        <ul aria-expanded="false">
                            <li>
                                <Link to="/admin/tracking">Track Shipment</Link>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <a className="has-arrow" href="#" aria-expanded="false">
                            <div className="menu-icon">
                                <svg
                                    width={20}
                                    height={20}
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M2.5 7.49999L10 1.66666L17.5 7.49999V16.6667C17.5 17.1087 17.3244 17.5326 17.0118 17.8452C16.6993 18.1577 16.2754 18.3333 15.8333 18.3333H4.16667C3.72464 18.3333 3.30072 18.1577 2.98816 17.8452C2.67559 17.5326 2.5 17.1087 2.5 16.6667V7.49999Z"
                                        stroke="#888888"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M7.5 18.3333V10H12.5V18.3333"
                                        stroke="#888888"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                            <span className="nav-text">Delivers System</span>
                        </a>
                        <ul aria-expanded="false">
                            <li>
                                <Link to="/admin/deliveries">List</Link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar;
