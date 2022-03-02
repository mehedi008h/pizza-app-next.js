import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { FaPizzaSlice } from 'react-icons/fa';
import styles from '../../styles/PizzaDetails.module.css';
import { toast } from 'react-toastify';
import { addItemToCart } from '../../redux/actions/cartActions';

const PizzaDetails = () => {
    const { pizza, error } = useSelector(state => state.pizzaDetails);

    const [size, setSize] = useState(0);
    const [price, setPrice] = useState(pizza.prices[0]);
    const [quantity, setQuantity] = useState(1);
    const [extras, setExtras] = useState([]);

    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;
    console.log("Price", pizza);

    const changePrice = (number) => {
        setPrice(price + number);
    };

    const handleSize = (sizeIndex) => {
        const difference = pizza.prices[sizeIndex] - pizza.prices[size];
        setSize(sizeIndex);
        changePrice(difference);
    };

    const handleChange = (e, option) => {
        const checked = e.target.checked;

        if (checked) {
            changePrice(option.price);
            setExtras((prev) => [...prev, option]);
        } else {
            changePrice(-option.price);
            setExtras(extras.filter((extra) => extra._id !== option._id));
        }
    };

    const increaseQty = () => {
        const count = document.querySelector('.count')
        if (count.valueAsNumber >= 5) return;
        const qty = count.valueAsNumber + 1;
        setQuantity(qty);
    }

    const decreaseQty = () => {
        const count = document.querySelector('.count')
        if (count.valueAsNumber <= 1) return;
        const qty = count.valueAsNumber - 1;
        setQuantity(qty);
    }

    const pizzaData = {
        price,
        quantity,
        extras,
        image: pizza.images[0].url,
        title: pizza.title,
        id: pizza._id
    };

    const addToCart = () => {
        dispatch(addItemToCart(pizzaData));
        toast.success('Item Added to Cart');
    }

    return (
        <div className={styles.pizza_details}>
            <div className="container mt-3">
                <div className="row g-3">
                    <div className="col-md-6">
                        <Carousel fade variant="dark">
                            {
                                pizza?.images && pizza?.images.map((image, index) => (
                                    <Carousel.Item key={index} className='text-center'>
                                        <Image
                                            src={image.url}
                                            height='300px'
                                            width='300px'
                                            alt="image"
                                        />
                                    </Carousel.Item>
                                ))
                            }

                        </Carousel>
                    </div>
                    <div className="col-md-6">
                        <div>
                            <div>
                                <h3>{pizza?.title}</h3>
                                <p>{pizza?.description}</p>
                                <h5>$ {price}</h5>
                            </div>

                            <div className='d-flex justify-content-between w-75  mt-5'>
                                <div className={styles.pizza_size} onClick={() => handleSize(0)}>
                                    <FaPizzaSlice size={30} />
                                    <p className='fw-bold mt-3'>Small</p>
                                </div>
                                <div className={styles.pizza_size} onClick={() => handleSize(1)}>
                                    <FaPizzaSlice size={30} />
                                    <p className='fw-bold mt-3'>Medium</p>
                                </div>
                                <div className={styles.pizza_size} onClick={() => handleSize(2)}>
                                    <div>
                                        <FaPizzaSlice size={30} />
                                    </div>
                                    <p className='fw-bold mt-3'>Large</p>
                                </div>
                            </div>

                            <div className='mt-3'>
                                {pizza.extraOptions.map((option) => (
                                    <div key={option._id} className={styles.extras}>
                                        <input
                                            type="checkbox"
                                            id={option.text}
                                            name={option.text}

                                            onChange={(e) => handleChange(e, option)}
                                        />
                                        <label className='ms-3' htmlFor="double">{option.text} <span> - ${option.price}</span></label>
                                    </div>
                                ))}
                            </div>

                            <div className={styles.quantity}>
                                <span className="minus " onClick={decreaseQty}>-</span>

                                <input type="number" className="count" value={quantity} readOnly />

                                <span className="plus" onClick={increaseQty}>+</span>
                            </div>

                            <div className={styles.button}>
                                <button>Buy Now</button>
                                <button onClick={addToCart} >Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PizzaDetails;