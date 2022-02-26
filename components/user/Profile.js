import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Spinner } from 'react-bootstrap';
import { MdFavoriteBorder } from 'react-icons/md';
import { useSelector } from 'react-redux';

import styles from '../../styles/Profile.module.css';

const Profile = () => {
    const { user, loading } = useSelector(state => state.loadedUser);
    return (
        <div className={styles.profile}>
            {
                loading ? (
                    <div className={styles.spinner}>
                        <Spinner animation="grow" />
                    </div>
                ) : (
                    <>
                        <div className='container mt-3'>
                            <div className="row">
                                <div className="col-md-3">
                                    <div className={styles.profile_container}>
                                        <div className='text-center mt-3'>
                                            <Image src={user.avatar && user.avatar.url} alt={user && user.name} className="rounded-circle" height={"120px"} width={"120px"} />
                                        </div>
                                        <div className='text-center mt-3'>
                                            <h5>{user.name}</h5>
                                            <p>{user?.email}</p>
                                        </div>
                                        <hr />
                                        <div className={styles.link_items}>
                                            <Link href="/" passHref>
                                                <a><MdFavoriteBorder className='me-3' size={25} /> My Oder</a>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-9"></div>
                            </div>
                        </div>
                    </>
                )
            }
        </div>
    );
};

export default Profile;