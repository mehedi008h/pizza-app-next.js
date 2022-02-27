import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, updateProfile } from '../../redux/actions/userActions';
import { UPDATE_PROFILE_RESET } from '../../redux/constants/userConstants';

import styles from '../../styles/EditProfile.module.css';

const EditProfile = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    });

    const { name, email, password } = user;

    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState('https://res.cloudinary.com/mehedi08h/image/upload/v1645853942/pizza/logo_tkouyy.jpg');

    const { user: loadedUser, loading } = useSelector(state => state.loadedUser);
    const { error, isUpdated, loading: updateLoading } = useSelector(state => state.user);

    useEffect(() => {

        if (loadedUser) {
            setUser({
                name: loadedUser.name,
                email: loadedUser.email
            });
            setAvatarPreview(loadedUser.avatar.url);
        }

        if (error) {
            toast.error(error);
            dispatch(clearErrors())
        }

        if (isUpdated) {
            router.push('/');
            dispatch({ type: UPDATE_PROFILE_RESET })
        }

    }, [dispatch, isUpdated, error, loadedUser, router]);


    const submitHandler = (e) => {
        e.preventDefault();

        const userData = {
            name, email, password, avatar
        }

        dispatch(updateProfile(userData))

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
        <>
            {
                loading ? (
                    <div className={styles.spinner}>
                        <Spinner animation="grow" />
                    </div>
                ) : (
                    <>
                        <div className={styles.edit_profile}>
                            <h3 className='text-center'>Edit Profile</h3>
                            <form className='mt-3' onSubmit={submitHandler} >
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
                                    <button className={styles.btn}>Update</button>
                                </div>
                            </form>
                        </div>
                    </>
                )
            }
        </>

    );
};

export default EditProfile;