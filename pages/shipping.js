import { getSession } from 'next-auth/react';
import React from 'react';
import Layout from '../components/layout/Layout';
import Shipping from '../components/Shipping';

const shipping = () => {
    return (
        <Layout>
            <Shipping />
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

export default shipping;