import React from 'react';
import Layout from '../../components/layout/Layout';
import PizzaDetails from '../../components/pizza/PizzaDetails';
import { getPizzaDetails } from '../../redux/actions/pizzaActions';

import { wrapper } from '../../redux/store';

const pizzaDetails = () => {
    return (
        <Layout title="Pizza Details - Pizza App">
            <PizzaDetails />
        </Layout>
    );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, params }) => {
    await store.dispatch(getPizzaDetails(req, params.id))
})

export default pizzaDetails;