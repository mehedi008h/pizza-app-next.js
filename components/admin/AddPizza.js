import React from 'react';

import styles from '../../styles/AddPizza.module.css';

const AddPizza = () => {
    return (
        <div className={styles.add_pizza}>
            <h3 className='text-center fw-bold'>Add Pizza</h3>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-offset-md-6 mx-auto">
                        <form className='mt-3' >
                            <div className={styles.form_group}>
                                <label htmlFor="title_field">Title</label>
                                <input
                                    type="text"
                                    className={styles.form_control}
                                    name='title'

                                />
                            </div>
                            <div className={styles.form_group}>
                                <label htmlFor="price_field">Price</label>
                                <input
                                    type="number"
                                    className={styles.form_control}
                                    name='price'

                                />
                            </div>
                            <div className={styles.form_group}>
                                <label htmlFor="password_field">Description</label>
                                <textarea
                                    className={styles.textarea}
                                    placeholder="Your Message"
                                    name="message"
                                />
                            </div>
                            <div className={styles.form_group}>
                                <label htmlFor='avatar_upload'>Avatar</label>
                                <div className='d-flex align-items-center'>

                                    {/* <Image
                                src={avatarPreview}
                                height={50} width={50} className={styles.avatar_img}
                                alt='image'
                            /> */}

                                    <input
                                        type='file'
                                        name='avatar'
                                        className={styles.file_control}
                                        id='customFile'
                                        accept='images/*'

                                    />

                                </div>
                            </div>
                            <div className='mt-3 text-center'>
                                <button className={styles.btn}>Sign Up</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddPizza;