import Image from 'next/image';
import React from 'react';

import styles from '../../styles/Banner.module.css';

const Banner = () => {
    return (
        <div className={styles.banner}>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h1>Quality Foods</h1>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam dignissimos quisquam saepe, repellat deserunt quasi!</p>
                    </div>
                    <div className="col-md-6 text-center">
                        <div>
                            <Image src="https://res.cloudinary.com/mehedi08h/image/upload/v1645853942/pizza/logo_tkouyy.jpg" height={300} width={300} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;