import React from 'react';
import { getSession } from 'next-auth/react';

import Layout from '../../../components/layout/Layout';
import User from '../../../models/user';
import AllOrder from '../../../components/admin/AllOrder';
import Sidebar from '../../../components/admin/Sidebar';
import Drawer from '../../../components/layout/Drawer';

const AllOrdersPage = () => {
    return (
        <Layout title='Admin - Pizza App'>
            <div className="row g-3">
                <div className="col-md-2">
                    <Sidebar />
                </div>
                <div className="col-md-10">
                    <Drawer>
                        <AllOrder />
                    </Drawer>
                </div>
            </div>
        </Layout>
    )
}

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

export default AllOrdersPage