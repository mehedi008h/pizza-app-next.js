import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from '../redux/actions/userActions';
import { createOrder } from '../redux/actions/orderActions';

import styles from '../styles/Shipping.module.css';

const Shipping = () => {
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');

    const dispatch = useDispatch();

    const { user, loading } = useSelector(state => state.loadedUser);
    const { cartItems } = useSelector(state => state.cart);

    // Calculate Order Prices
    const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shippingPrice = itemsPrice > 200 ? 0 : 25;
    const taxPrice = Number((0.05 * itemsPrice).toFixed(2));
    const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);

    const orderData = {
        orderItems: cartItems,
        shippingInfo: {
            address,
            city,
            phone,
            postalCode,
            country,
        },
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice

    }

    const handleOrder = () => {
        dispatch(createOrder(orderData))
    }

    useEffect(() => {
        if (!user) {
            dispatch(loadUser())
        }

        // if (cartItems) {
        //     dispatch(getItemToCart())
        // }

    }, [dispatch, user]);
    return (
        <div className={styles.shipping}>
            <div className={styles.shipping_banner}>
                <div className="container">
                    <h3>Shipping Info</h3>
                </div>
            </div>
            <div className="container mt-3">
                <div className="row g-3">
                    <div className=" col-offset-md-2 col-md-4 ms-auto">
                        <div className={styles.shipping_card}>
                            {/* contact infoemation */}

                            <h5>Contact Information ...</h5>
                            <div className={styles.form_group}>
                                <label htmlFor="title_field">Email <span className='text-danger'>*</span></label>
                                <input
                                    type="text"
                                    className={styles.form_control}
                                    name='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder='Enter your email ...'
                                />
                            </div>
                            <div className={styles.form_group}>
                                <label htmlFor="title_field">Phone <span className='text-danger'>*</span></label>
                                <input
                                    type="text"
                                    className={styles.form_control}
                                    name='phoneNo'
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                    placeholder='Enter your phone ...'
                                />
                            </div>

                            {/* Address Information  */}
                            <h5 className='mt-4'>Adress Information ...</h5>
                            <div className={styles.form_group}>
                                <label htmlFor="title_field">Address <span className='text-danger'>*</span></label>
                                <input
                                    type="text"
                                    className={styles.form_control}
                                    name='address'
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    required
                                    placeholder='Enter your address ...'
                                />
                            </div>
                            <div className={styles.form_group}>
                                <label htmlFor="title_field">City <span className='text-danger'>*</span></label>
                                <input
                                    type="text"
                                    className={styles.form_control}
                                    name='city'
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    required
                                    placeholder='Enter your city ...'
                                />
                            </div>

                            <div className={styles.form_group}>
                                <label htmlFor="title_field">Postal Code <span className='text-danger'>*</span></label>
                                <input
                                    type="text"
                                    className={styles.form_control}
                                    name='postalCode'
                                    value={postalCode}
                                    onChange={(e) => setPostalCode(e.target.value)}
                                    required
                                    placeholder='Enter your postal code ...'
                                />
                            </div>
                            <div className={styles.form_group}>
                                <label htmlFor="title_field">Country</label>
                                <input
                                    type="text"
                                    className={styles.form_control}
                                    name='country'
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    required
                                    placeholder='Enter your country ...'
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-offset-md-2 me-auto">
                        <div className={styles.checkout}>
                            <div className='d-flex align-items-center justify-content-between'>
                                <p className='fw-bold'>Items Price</p>
                                <p>{itemsPrice}</p>
                            </div>
                            <hr className='text-peimary' />
                            <div className='d-flex align-items-center justify-content-between'>
                                <p className='fw-bold'>Tax Charge</p>
                                <p>{taxPrice}</p>
                            </div>
                            <hr className='text-peimary' />
                            <div className='d-flex align-items-center justify-content-between'>
                                <p className='fw-bold'>Shipping Charge</p>
                                <p>{shippingPrice}</p>
                            </div>
                            <hr className='text-peimary' />
                            <div className='d-flex align-items-center justify-content-between'>
                                <p className='fw-bold'>Total Price</p>
                                <p>{totalPrice}</p>
                            </div>
                            <hr className='text-peimary' />
                            <button onClick={handleOrder} className={styles.btn}>Order</button>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
};

export default Shipping;