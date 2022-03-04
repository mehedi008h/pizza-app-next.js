import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, getItemToCart, removeItemFromCart } from '../redux/actions/cartActions';
import { loadUser } from '../redux/actions/userActions';
import styles from '../styles/Cart.module.css';
import { AiOutlineDelete } from 'react-icons/ai';
import { useRouter } from 'next/router';

const Cart = () => {
    const { user, loading } = useSelector(state => state.loadedUser);
    const { cartItems } = useSelector(state => state.cart);

    const dispatch = useDispatch();
    const router = useRouter();



    const removeCartItemHandler = (id) => {
        dispatch(removeItemFromCart(id))
    }

    const increaseQty = (item, quantity) => {
        const newQty = quantity + 1;

        if (newQty > 5) return;

        const pizza = { ...item, quantity: newQty }
        dispatch(addItemToCart(pizza))
    }

    const decreaseQty = (item, quantity) => {

        const newQty = quantity - 1;

        if (newQty <= 0) return;

        const pizza = { ...item, quantity: newQty }
        dispatch(addItemToCart(pizza))

    }

    useEffect(() => {
        if (!user) {
            dispatch(loadUser())
        }

        // if (cartItems) {
        //     dispatch(getItemToCart())
        // }

    }, [dispatch, user]);

    const handleShipping = () => {
        router.push('/shipping');
    }

    return (
        <div>
            <div className="container">
                {cartItems.length === 0 ? <h2 className={styles.cart_empty}>Your Cart is Empty !</h2> : (
                    <div>
                        <h2 className={styles.cart_empty}>Your Cart: <b>{cartItems.length} items</b></h2>

                        <div className="row d-flex justify-content-between">
                            <div className="col-12 col-lg-8">
                                {cartItems.map(item => (
                                    <div key={item.id}>
                                        <hr />

                                        <div className={styles.cart_item}>
                                            <div className="row d-flex align-items-center">
                                                <div className="col-4 col-lg-3">
                                                    <Image src={item?.image} alt={item?.title} height="90" width="90" />
                                                </div>

                                                <div className="col-5 col-lg-3">
                                                    <Link href={`/pizza/${item.id}`} passHref>
                                                        <a className={styles.item_link}>{item?.title}</a>
                                                    </Link>
                                                </div>


                                                <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                                                    <p className={styles.item_price}>${item?.price}</p>
                                                </div>

                                                <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                    <div className={styles.quantity}>
                                                        <span className="btn btn-danger minus" onClick={() => decreaseQty(item, item.quantity)}>-</span>

                                                        <input type="number" className="form-control count d-inline" value={item.quantity} readOnly />

                                                        <span className="btn btn-primary plus" onClick={() => increaseQty(item, item.quantity)}>+</span>
                                                    </div>
                                                </div>

                                                <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                                                    <div className={styles.btn_delete}>
                                                        <button onClick={() => removeCartItemHandler(item.id)}>remove</button>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <hr />
                                    </div>
                                ))}

                            </div>

                            <div className="col-12 col-lg-3 my-4">
                                <div className={styles.order_summary} id="order_summary">
                                    <h4>Order Summary</h4>
                                    <hr />
                                    <p>Subtotal:  <span className="order-summary-values">{cartItems.reduce((acc, item) => (acc + Number(item.quantity)), 0)} (Units)</span></p>
                                    <p>Est. total: <span className="order-summary-values">${cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}</span></p>

                                    <hr />

                                    <button onClick={handleShipping}>Check out</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;