import Image from 'next/image';
import React, { useState } from 'react';

import styles from '../../styles/Register.module.css';

const Register = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    })

    const { name, email, password } = user

    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState('https://res.cloudinary.com/mehedi08h/image/upload/v1645853942/pizza/logo_tkouyy.jpg');

    const submitHandler = (e) => {
        e.preventDefault();

        const userData = {
            name, email, password, avatar
        }

        console.log("User", userData);

    }

    const onChange = (e) => {

        if (e.target.name === 'avatar') {

            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatar(reader.result);
                    setAvatarPreview(reader.result);
                }
            }

            reader.readAsDataURL(e.target.files[0])

        } else {
            setUser({ ...user, [e.target.name]: e.target.value })
        }

    }
    return (
        <div className={styles.register}>
            <div className={styles.register_card}>
                <h4>Register</h4>
                <form className='mt-3' onSubmit={submitHandler}>
                    <div className={styles.form_group}>
                        <label htmlFor="name_field">Name</label>
                        <input
                            type="text"
                            className={styles.form_control}
                            name='name'
                            value={name}
                            onChange={onChange}
                        />
                    </div>
                    <div className={styles.form_group}>
                        <label htmlFor="email_field">Email</label>
                        <input
                            type="email"
                            className={styles.form_control}
                            name='email'
                            value={email}
                            onChange={onChange}
                        />
                    </div>
                    <div className={styles.form_group}>
                        <label htmlFor="password_field">Password</label>
                        <input
                            type="password"
                            className={styles.form_control}
                            name='password'
                            value={password}
                            onChange={onChange}
                        />
                    </div>
                    <div className={styles.form_group}>
                        <label htmlFor='avatar_upload'>Avatar</label>
                        <div className='d-flex align-items-center'>

                            <Image
                                src={avatarPreview}
                                height={50} width={50} className={styles.avatar_img}
                                alt='image'
                            />

                            <input
                                type='file'
                                name='avatar'
                                className={styles.file_control}
                                id='customFile'
                                accept='images/*'
                                onChange={onChange}
                            />

                        </div>
                    </div>
                    <div className='mt-3 text-center'>
                        <button className={styles.btn}>Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;