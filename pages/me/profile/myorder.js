import React from 'react';
import Drawer from '../../../components/layout/Drawer';
import Layout from '../../../components/layout/Layout';
import MyOrder from '../../../components/user/MyOrder';
import Profile from '../../../components/user/Profile';

const myorder = () => {
    return (
        <Layout title='My Order - Pizza App'>
            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-3">
                        <Profile />
                    </div>
                    <div className="col-md-9">
                        <Drawer>
                            <MyOrder />
                        </Drawer>
                    </div>
                </div>
            </div>

        </Layout>
    );
};

export default myorder;