import Image from 'next/image';
import React from 'react';
import { AiFillStar } from 'react-icons/ai';
import { MdOutlineFavoriteBorder } from 'react-icons/md';

import styles from '../../styles/Pizza.module.css';

const PizzaCard = ({ pizza }) => {
    console.log(pizza);
    return (
        <div className={styles.pizza_card}>
            <div className='d-flex align-items-center justify-content-between'>
                <div className={styles.card_rating}><AiFillStar style={{ color: 'gold' }} size={20} /> <span className='text-white ms-1'>4.5</span></div>
                <div className={styles.card_add}><MdOutlineFavoriteBorder size={20} /></div>
            </div>
            <div className={styles.card_image}>
                <Image src={pizza?.images[0].url} width={170} height={170} alt={pizza?.title} />
            </div>
            <div className='mt-3 text-center'>
                <h5>{pizza?.title}</h5>
                <p className='fw-bold'>$ {pizza?.prices[0]}</p>
            </div>
        </div>
    );
};

export default PizzaCard;