import React from 'react'
import { getSession } from 'next-auth/react'

import Layout from '../../../components/layout/Layout';
import Profile from '../../../components/user/Profile';

const profile = () => {
    return (
        <Layout title='My Profile'>
            <Profile />
        </Layout>
    );
};

export default profile;