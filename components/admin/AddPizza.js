import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearErrors, newPizza } from '../../redux/actions/pizzaActions';
import { NEW_PIZZA_RESET } from '../../redux/constants/pizzaConstants';

import styles from '../../styles/AddPizza.module.css';

const AddPizza = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [prices, setPrices] = useState([]);
    const [extraOptions, setExtraOptions] = useState([]);
    const [extra, setExtra] = useState('');

    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const dispatch = useDispatch();
    const router = useRouter();

    const { loading, error, success } = useSelector(state => state.newPizza)

    const changePrice = (e, index) => {
        const currentPrices = prices;
        currentPrices[index] = e.target.value;
        setPrices(currentPrices);
    };

    const handleExtraInput = (e) => {
        setExtra({ ...extra, [e.target.name]: e.target.value });
    };

    const handleExtra = (e) => {
        setExtraOptions((prev) => [...prev, extra]);
    };

    useEffect(() => {

        if (error) {
            toast.error(error);
            dispatch(clearErrors())
        }

        if (success) {
            toast.success("Pizza added successfully.")
            router.push('/admin/allPizza')
            dispatch({ type: NEW_PIZZA_RESET })
        }

    }, [dispatch, error, success, router])

    const handleCreate = () => {

        const pizzaData = {
            title,
            description,
            prices,
            prices,
            extraOptions,
            images
        }

        console.log("Data", pizzaData);

        if (images.length === 0) return toast.error('Please upload images.')

        dispatch(newPizza(pizzaData))

    }

    const onChange = (e) => {

        const files = Array.from(e.target.files)

        setImages([]);
        setImagesPreview([]);

        files.forEach(file => {

            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImages(oldArray => [...oldArray, reader.result]);
                    setImagesPreview(oldArray => [...oldArray, reader.result]);
                }
            }

            reader.readAsDataURL(file)

        })

    }

    return (
        <div className={styles.add_pizza}>
            <h3 className='text-center fw-bold'>Add Pizza</h3>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-offset-md-6 mx-auto">

                        <div className={styles.form_group}>
                            <label htmlFor="title_field">Title</label>
                            <input
                                type="text"
                                className={styles.form_control}
                                name='title'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>

                        {/*start price section  */}

                        <div className={styles.form_group}>
                            <div className="row">
                                <div className="col-md-4">
                                    <label htmlFor="price_field">Price for small</label>
                                    <input
                                        type="number"
                                        className={styles.form_control}
                                        name='price'
                                        onChange={(e) => changePrice(e, 0)}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="price_field">Price for mediam</label>
                                    <input
                                        type="number"
                                        className={styles.form_control}
                                        name='price'
                                        onChange={(e) => changePrice(e, 1)}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="price_field">Price for large</label>
                                    <input
                                        type="number"
                                        className={styles.form_control}
                                        name='price'
                                        onChange={(e) => changePrice(e, 2)}
                                    />
                                </div>
                            </div>

                        </div>

                        {/*start description section  */}

                        <div className={styles.form_group}>
                            <label htmlFor="password_field">Description</label>
                            <textarea
                                className={styles.textarea}
                                placeholder="Your Message"
                                name="description"
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>

                        {/*start extras section  */}

                        <div className={styles.form_group}>
                            <div className="row">
                                <div className="col-md-7">
                                    <label htmlFor="password_field">Add Extras Name</label>
                                    <input
                                        type="text"
                                        className={styles.form_control}
                                        placeholder="Enter Item name .."
                                        name="text"
                                        onChange={handleExtraInput}

                                    />
                                </div>
                                <div className="col-md-3">
                                    <label htmlFor="password_field">Add Extras price</label>
                                    <input
                                        type="number"
                                        className={styles.form_control}
                                        placeholder="Enter Item Price .."
                                        name="price"
                                        onChange={handleExtraInput}

                                    />
                                </div>
                                <div className="col-md-2 d-flex align-items-center mt-3">
                                    <div className=''>
                                        <button onClick={handleExtra} className='btn btn-info'>Add</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/*show extras section  */}

                        <div className={styles.form_group}>
                            <label htmlFor="password_field">Extras Item</label>
                            <div className={styles.extraItems}>
                                {extraOptions.map((option) => (
                                    <span key={option.text} className={styles.extraItem}>
                                        {option.text}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/*start image section  */}

                        <div className={styles.form_group}>
                            <label htmlFor='avatar_upload'>Avatar</label>
                            <input
                                type='file'
                                name='images'
                                className={styles.file_control}
                                id='customFile'
                                accept='images/*'
                                onChange={onChange}
                                multiple

                            />
                            <div className='d-flex align-items-center'>
                                {imagesPreview.map(img => (
                                    <Image
                                        src={img}
                                        key={img}
                                        alt="Images Preview"
                                        className="mt-3 mr-2"
                                        width="55"
                                        height="55"
                                    />
                                ))}
                            </div>
                        </div>
                        <div className='mt-3 text-center'>
                            <button onClick={handleCreate} className={styles.btn}>{loading ? <Spinner animation="border" /> : 'CREATE'}</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddPizza;