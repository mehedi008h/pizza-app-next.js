import React, { useEffect, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { BiLogOutCircle, BiUserCircle } from 'react-icons/bi';
import { MdFavoriteBorder, MdOutlineArrowDropDownCircle, MdOutlineRestaurantMenu, MdShoppingCart } from 'react-icons/md';
import Image from 'next/image';
import Link from 'next/link';

import { getItemToCart } from '../../redux/actions/cartActions';

import styles from '../../styles/Header.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from '../../redux/actions/userActions';
import { signOut } from 'next-auth/react';
import { Spinner } from 'react-bootstrap';

const Header = () => {
    const [toggleMenu, setToggleMenu] = useState(false);
    const [dropdown, setDropdown] = useState(false);

    const dispatch = useDispatch();

    const { user, loading } = useSelector(state => state.loadedUser);
    const { cartItems } = useSelector(state => state.cart);

    useEffect(() => {
        if (!user) {
            dispatch(loadUser())
        }

        if (cartItems) {
            dispatch(getItemToCart())
        }
    }, [dispatch])


    const logoutHandler = () => {
        signOut();
    }
    return (
        <nav className={styles.app__navbar}>
            <div className="container d-flex align-items-center justify-content-between">
                <div className={styles.app__navbar_logo}>
                    <Image height={50} width={50} src="https://res.cloudinary.com/mehedi08h/image/upload/v1645853942/pizza/logo_tkouyy.jpg" alt="app__logo" />
                </div>
                <div className={styles.app__navbar_login}>
                    <Link href="/" passHref><a className={styles.p__opensans}>Home</a></Link>
                    <Link href="/pizza" passHref><a className={styles.p__opensans}>Pizza</a></Link>
                    <div className={styles.divied} />
                    <Link href="/cart" passHref>
                        <div className={styles.item}>
                            <div className={styles.cart}>
                                <MdShoppingCart size={25} />
                                <div className={styles.counter}>{cartItems.length}</div>
                            </div>
                        </div>
                    </Link>
                    {loading ?
                        (
                            <Spinner as="span" animation="border" variant="info" role="status" aria-hidden="true" />
                        ) : (
                            <>
                                {
                                    user ? (
                                        <>
                                            <Image src={user.avatar && user.avatar.url} alt={user && user.name} className="rounded-circle" height={"50px"} width={"50px"} />
                                            <button className={styles.dropdown_btn} onClick={() => setDropdown(true)}>{user && user.name} <MdOutlineArrowDropDownCircle size={20} /></button>
                                            {
                                                dropdown && (
                                                    <div className={styles.dropdown_content}>

                                                        {user.role === 'user' && (
                                                            <>
                                                                <Link href="/me/profile" passHref>
                                                                    <a onClick={() => setDropdown(false)} className={styles.dropdown_item}><BiUserCircle className='me-2 mb-1' size={20} /> Profile</a>
                                                                </Link>
                                                            </>
                                                        )}
                                                        {user.role === 'admin' && (
                                                            <>
                                                                <Link href="/admin" passHref>
                                                                    <a onClick={() => setDropdown(false)} className={styles.dropdown_item}><MdFavoriteBorder className='me-2 mb-1' size={20} /> Dashboard</a>
                                                                </Link>
                                                            </>
                                                        )}
                                                        <Link href="/" passHref><a onClick={logoutHandler} className={styles.dropdown_item}><BiLogOutCircle className='me-2 mb-1' size={20} /> Logout</a></Link>
                                                    </div>
                                                )
                                            }
                                        </>
                                    ) : (
                                        <>
                                            <Link href="/login" passHref><a className={styles.p__opensans}>Login</a></Link>
                                        </>
                                    )
                                }
                            </>
                        )
                    }

                </div>
                <div className={styles.app__navbar_smallscreen}>
                    <GiHamburgerMenu color="#fff" fontSize={27} onClick={() => setToggleMenu(true)} />
                    {toggleMenu && (
                        <div className={styles.app__navbar_smallscreen_overlay}>
                            <MdOutlineRestaurantMenu fontSize={27} className={styles.overlay__close} onClick={() => setToggleMenu(false)} />
                            <ul className={styles.app__navbar_smallscreen_links}>
                                <li><Link href="/" passHref><a onClick={() => setToggleMenu(false)}>Home</a></Link></li>
                                <li><Link href="/about" passHref><a onClick={() => setToggleMenu(false)}>About</a></Link></li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Header;