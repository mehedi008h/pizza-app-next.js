import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Spinner } from 'react-bootstrap';
import { MdOutlineDashboard, MdOutlineLeakAdd } from 'react-icons/md';
import { FaPizzaSlice } from 'react-icons/fa';
import { RiUserHeartLine } from 'react-icons/ri';
import { BsBorderStyle } from 'react-icons/bs';
import { useSelector } from 'react-redux';

import styles from '../../styles/Sidebar.module.css';

const Sidebar = () => {
    const { user, loading } = useSelector(state => state.loadedUser);
    return (
        <div className={styles.sidebar}>
            <div >
                {
                    loading ? (
                        <>
                            <Spinner />
                        </>
                    ) : (
                        <>
                            <div className='d-flex align-items-center  mt-4 p-2'>
                                <div>
                                    <Image src={user?.avatar && user?.avatar.url} alt={user && user?.name} className="rounded-circle" height={"70px"} width={"70px"} />
                                </div>
                                <div className='ms-3'>
                                    <span className='fw-bold'>{user?.name}</span>
                                    <p>Admin</p>
                                </div>
                            </div>
                        </>
                    )
                }

                <p className='ms-4 mt-3'>Menu</p>
                <hr className='text-success' />
                <div className={styles.link_items}>
                    <Link href="/admin" passHref>
                        <a className={styles.link_item}><MdOutlineDashboard className='me-4' size={20} /> Dashboard</a>
                    </Link>
                    <Link href="/admin/pizzas/" passHref>
                        <a className={styles.link_item}><FaPizzaSlice className='me-4' size={20} /> All Pizza</a>
                    </Link>
                    <Link href="/admin/pizzas/addpizza" passHref>
                        <a className={styles.link_item}><MdOutlineLeakAdd className='me-4' size={20} /> Add Pizza</a>
                    </Link>
                    <Link href="/admin/orders" passHref>
                        <a className={styles.link_item}><BsBorderStyle className='me-4' size={20} /> All Order</a>
                    </Link>
                    <Link href="/admin/pizzas/addpizza" passHref>
                        <a className={styles.link_item}><RiUserHeartLine className='me-4' size={20} /> All User</a>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;