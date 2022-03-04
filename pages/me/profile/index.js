import React from 'react'
import { getSession } from 'next-auth/react'

import Layout from '../../../components/layout/Layout';
import Profile from '../../../components/user/Profile';
import MyOrder from '../../../components/user/MyOrder';
import Drawer from '../../../components/layout/Drawer';

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

export async function getServerSideProps(context) {

    const session = await getSession({ req: context.req })

    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

    return {
        props: { session }
    }

}

export default profile;