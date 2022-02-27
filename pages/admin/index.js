import React from 'react';
import Dashboard from '../../components/admin/Dashboard';
import Sidebar from '../../components/admin/Sidebar';
import Drawer from '../../components/layout/Drawer';
import Layout from '../../components/layout/Layout';

const index = () => {
    return (
        <Layout title='Admin - Pizza App'>
            <div className="row g-3">
                <div className="col-md-2">
                    <Sidebar />
                </div>
                <div className="col-md-10">
                    <Drawer>
                        <Dashboard />
                    </Drawer>
                </div>
            </div>
        </Layout>
    );
};

export default index;