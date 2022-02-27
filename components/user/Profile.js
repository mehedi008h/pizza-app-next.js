import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Spinner } from 'react-bootstrap';
import { MdFavoriteBorder } from 'react-icons/md';
import { useSelector } from 'react-redux';

import styles from '../../styles/Profile.module.css';
import Drawer from './Drawer';

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
                                <Link href="/me/profile/myorder" passHref>
                                    <a><MdFavoriteBorder className='me-3' size={25} /> My Oder</a>
                                </Link>
                                <Link href="/me/profile/editProfile" passHref>
                                    <a><MdFavoriteBorder className='me-3' size={25} /> Edit Profile</a>
                                </Link>
                            </div>
                        </div>
                    </>
                )
            }
        </div>
    );
};

export default Profile;