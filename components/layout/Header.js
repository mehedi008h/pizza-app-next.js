import React, { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineAlignRight } from 'react-icons/ai';
import { MdOutlineRestaurantMenu } from 'react-icons/md';
import Image from 'next/image';
import Link from 'next/link';

import styles from '../../styles/Header.module.css';

const Header = () => {
    const [toggleMenu, setToggleMenu] = useState(false);
    return (
        <nav className={styles.app__navbar}>
            <div className="container d-flex align-items-center justify-content-between">
                <div className={styles.app__navbar_logo}>
                    <Image height={50} width={50} src="https://res.cloudinary.com/mehedi08h/image/upload/v1645027084/protflio/logo_vucikv.png" alt="app__logo" />
                </div>
                <div className={styles.app__navbar_login}>
                    <Link href="/" passHref><a className={styles.p__opensans}>Home</a></Link>
                    <Link href="/about" passHref><a className={styles.p__opensans}>About</a></Link>
                    <div />
                    <Link href="/" passHref><a className={styles.p__opensans}>RESUME</a></Link>
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