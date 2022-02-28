import React from 'react';
import Layout from '../../components/layout/Layout';
import Pizza from '../../components/pizza/Pizza';

const index = () => {
    return (
        <Layout title="All Pizza - Pizza App">
            <Pizza />
        </Layout>
    );
};

export default index;