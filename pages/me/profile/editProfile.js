import { getSession } from 'next-auth/react';
import React from 'react';
import Drawer from '../../../components/layout/Drawer';
import Layout from '../../../components/layout/Layout';
import EditProfile from '../../../components/user/EditProfile';
import Profile from '../../../components/user/Profile';

const editProfile = () => {
    return (
        <Layout title='Edit Profile - Pizza App'>
            <div className="container mt-3">
                <div className="row g-3">
                    <div className="col-md-3">
                        <Profile />
                    </div>
                    <div className="col-md-9">
                        <Drawer>
                            <EditProfile />
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

export default editProfile;