import React from 'react'
import { getSession } from 'next-auth/react'

import Layout from '../../../components/layout/Layout';
import Profile from '../../../components/user/Profile';
import Drawer from '../../../components/user/Drawer';
import MyOrder from '../../../components/user/MyOrder';

const profile = () => {
    return (
        <Layout title='My Profile'>
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

export default profile;