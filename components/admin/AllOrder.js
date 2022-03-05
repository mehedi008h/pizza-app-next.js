import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { allOrders, clearErrors, deleteOrder, updateOrder } from '../../redux/actions/orderActions';
import { DELETE_ORDER_RESET, UPDATE_ORDER_RESET } from '../../redux/constants/orderConstants';
import { AiOutlineDelete } from 'react-icons/ai';

const AllOrder = () => {
    const { orders, error, loading } = useSelector(state => state.allOrders);
    const { isDeleted, isUpdated } = useSelector(state => state.order);

    const dispatch = useDispatch();
    const route = useRouter();

    useEffect(() => {
        dispatch(allOrders())

        if (error) {
            toast.error(error);
            dispatch(clearErrors())
        }

        if (isUpdated) {
            toast.success('Order updated successfully');
            dispatch({ type: UPDATE_ORDER_RESET })
        }

        if (isDeleted) {
            toast.success('Order deleted successfully');
            route.push('/admin/orders');
            dispatch({ type: DELETE_ORDER_RESET })
        }
    }, [dispatch, error, isDeleted, isUpdated, route])
    console.log(orders);

    // update order status
    const handleUpdateStatus = (id, status) => {
        console.log("Status", status);
        dispatch(updateOrder(id, status))
    }

    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id))
    }
    return (
        <div>
            <div className="container mt-3">
                <Table responsive hover>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Phone</th>
                            <th>Price</th>
                            <th>Address</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders?.map(order => (
                                <tr key={order._id}>
                                    <th>{order._id}</th>
                                    <td>{order.user}</td>
                                    <td>{order.shippingInfo.phone}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>{order.shippingInfo.address}</td>
                                    <td>{order.orderStatus}</td>
                                    <td>
                                        <select className="form-select" aria-label="Default select example"
                                            onChange={(e) => handleUpdateStatus(order._id, e.target.value)}
                                        >
                                            <option defaultValue={order.orderStatus}>{order.orderStatus}</option>
                                            <option value="Processing">Processing</option>
                                            <option value="On the way">On the way</option>
                                            <option value="Delivered">Delivered</option>
                                        </select>
                                    </td>
                                    <td>
                                        <button className='btn btn-outline-danger' onClick={() => deleteOrderHandler(order._id)}><AiOutlineDelete /></button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default AllOrder;