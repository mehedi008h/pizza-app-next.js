import React from 'react';
import AddPizza from '../../components/admin/AddPizza';
import Sidebar from '../../components/admin/Sidebar';
import Drawer from '../../components/layout/Drawer';
import Layout from '../../components/layout/Layout';

const addpizza = () => {
    return (
        <Layout title='Admin - Pizza App'>
            <div className="row g-3">
                <div className="col-md-2">
                    <Sidebar />
                </div>
                <div className="col-md-10">
                    <Drawer>
                        <AddPizza />
                    </Drawer>
                </div>
            </div>
        </Layout>
    );
};

export default addpizza;