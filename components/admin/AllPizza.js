import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearErrors, deletePizza, getAdminPizza } from '../../redux/actions/pizzaActions';
import { MDBDataTable } from 'mdbreact';
import { DELETE_PIZZA_RESET } from '../../redux/constants/pizzaConstants';

const AllPizza = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const { loading, error, pizzas } = useSelector(state => state.adminPizza);
    const { error: deleteError, isDeleted } = useSelector(state => state.pizza);

    useEffect(() => {

        dispatch(getAdminPizza())

        if (error) {
            toast.error(error);
            dispatch(clearErrors())
        }

        if (deleteError) {
            toast.error(deleteError);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            toast.success("Pizza Deleted Successfuly.");
            router.push('/admin/allPizza');
            dispatch({ type: DELETE_PIZZA_RESET })
        }

    }, [dispatch, deleteError, isDeleted, error, router])


    const setPizzas = () => {
        const data = {
            columns: [
                {
                    label: 'Pizza ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                }

            ],
            rows: []
        }

        pizzas && pizzas.forEach(pizza => {
            data.rows.push({
                id: pizza._id,
                name: pizza.title,
                actions:
                    <>
                        <Link href={`/admin/pizzas/${pizza._id}`}>
                            <a className="btn btn-primary">
                                Edit
                            </a>
                        </Link>

                        <button onClick={() => deletePizzaHandler(pizza._id)} className="btn btn-danger mx-2">
                            Delete
                        </button>

                    </>
            })
        })

        return data;

    }

    const deletePizzaHandler = (id) => {
        dispatch(deletePizza(id))
    }
    return (
        <div className='container container-fluid'>
            {loading ? <Spinner /> :
                <>
                    <h1 className='my-5'>{`${pizzas && pizzas.length} Pizzas`}</h1>


                    <MDBDataTable
                        data={setPizzas()}
                        className='p-3'
                        bordered
                        striped
                        hover
                    />

                </>
            }
        </div>
    );
};

export default AllPizza;