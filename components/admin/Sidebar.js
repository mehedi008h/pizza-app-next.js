import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Spinner } from 'react-bootstrap';
import { MdFavoriteBorder } from 'react-icons/md';
import { useSelector } from 'react-redux';

import styles from '../../styles/Sidebar.module.css';

const Sidebar = () => {
    // const { user, loading } = useSelector(state => state.loadedUser);
    return (
        <div className={styles.sidebar}>
            <div className="container">
                {/* {
                    loading ? (
                        <>
                            <Spinner />
                        </>
                    ) : (
                        <>
                            <div className='text-center mt-4'>
                                <Image src={user?.avatar && user?.avatar.url} alt={user && user?.name} className="rounded-circle" height={"120px"} width={"120px"} />
                                <h5>{user?.name}</h5>
                            </div>
                        </>
                    )
                }

                <hr /> */}
                <div className={styles.link_items}>
                    <Link href="/admin" passHref>
                        <a><MdFavoriteBorder className='me-3' size={25} /> Dashboard</a>
                    </Link>
                    <Link href="/admin/pizzas/" passHref>
                        <a><MdFavoriteBorder className='me-3' size={25} /> All Pizza</a>
                    </Link>
                    <Link href="/admin//pizzas/addpizza" passHref>
                        <a><MdFavoriteBorder className='me-3' size={25} /> Add Pizza</a>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;