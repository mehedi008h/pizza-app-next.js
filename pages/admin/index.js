import { getSession } from 'next-auth/react';
import React from 'react';

import Dashboard from '../../components/admin/Dashboard';
import Sidebar from '../../components/admin/Sidebar';
import Drawer from '../../components/layout/Drawer';
import Layout from '../../components/layout/Layout';
import User from '../../models/user';

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

// check admin 

export async function getServerSideProps(context) {

    const session = await getSession({ req: context.req })

    let user = await User.findById(session.id);
    if (!session || user.role !== 'admin') {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

    return {
        props: {}
    }

}

export default index;