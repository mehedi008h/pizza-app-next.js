import React from 'react';
import { FaPizzaSlice } from 'react-icons/fa';
import styles from '../../styles/Dashboard.module.css';

const Dashboard = () => {
    return (
        <div className={styles.dashboard}>
            <div className="container mt-3">
                <div className="row g-3">
                    <div className="col-md-3">
                        <div className={styles.total_items}>
                            <FaPizzaSlice className='me-4' size={35} />
                            <div>
                                <h5>Total Pizza</h5>
                                <h4>33</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;