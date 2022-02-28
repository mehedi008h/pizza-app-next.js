import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { clearErrors, getAllPizza } from '../../redux/actions/pizzaActions';
import PizzaCard from './PizzaCard';
import styles from '../../styles/Pizza.module.css';

const Pizza = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const { pizzas, loading, error } = useSelector(state => state.allPizza);

    useEffect(() => {
        dispatch(getAllPizza());

        if (error) {
            toast.error(error);
            dispatch(clearErrors())
        }
    }, [error, toast])
    return (
        <div className={styles.pizza}>
            {
                loading ? (
                    <div className='spinner'>
                        <Spinner animation="border" />
                    </div>
                ) : (
                    <>
                        <div className="container mt-3">
                            <div className="row g-5">
                                {
                                    pizzas.map(pizza => (
                                        <div key={pizza._id} className="col-md-3">
                                            <PizzaCard key={pizza._id} pizza={pizza} />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </>
                )
            }
        </div>
    );
};

export default Pizza;