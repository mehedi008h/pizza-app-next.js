import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getAdminPizza } from '../../redux/actions/pizzaActions';
import { MDBDataTable } from 'mdbreact';

const AllPizza = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const { loading, error, pizzas } = useSelector(state => state.adminPizza);
    // const { error: deleteError, isDeleted } = useSelector(state => state.room)

    useEffect(() => {

        dispatch(getAdminPizza())

        if (error) {
            toast.error(error);
            dispatch(clearErrors())
        }

        // if (deleteError) {
        //     toast.erroe(deleteError);
        //     dispatch(clearErrors())
        // }

        // if (isDeleted) {
        //     router.push('/admin/rooms')
        //     dispatch({ type: DELETE_ROOM_RESET })
        // }

    }, [dispatch, error, router])


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
                        <Link href={`/admin/pizza/${pizza._id}`}>
                            <a className="btn btn-primary">
                                <i className="fa fa-pencil"></i>
                            </a>
                        </Link>

                        <button className="btn btn-danger mx-2">
                            <i className="fa fa-trash"></i>
                        </button>

                    </>
            })
        })

        return data;

    }
    return (
        <div className='container container-fluid'>
            {loading ? <Spinner /> :
                <>
                    <h1 className='my-5'>{`${pizzas && pizzas.length} Pizzas`}</h1>


                    <MDBDataTable
                        data={setPizzas()}
                        className='px-3'
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