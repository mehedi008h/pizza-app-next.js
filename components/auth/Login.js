import { signIn } from 'next-auth/react';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import styles from '../../styles/Login.module.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();

        setLoading(true);

        const result = await signIn('credentials', {
            redirect: false,
            email,
            password
        })

        setLoading(false)

        if (result.error) {
            toast.error(result.error);
        } else {
            window.location.href = '/'
        }

    }
    return (
        <div className={styles.login}>
            <div className={styles.login_card}>
                <h4>Register</h4>
                <form className='mt-3' onSubmit={submitHandler}>
                    <div className={styles.form_group}>
                        <label htmlFor="email_field">Email</label>
                        <input
                            type="email"
                            className={styles.form_control}
                            name='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}

                        />
                    </div>
                    <div className={styles.form_group}>
                        <label htmlFor="password_field">Password</label>
                        <input
                            type="password"
                            className={styles.form_control}
                            name='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className='mt-3 text-center'>
                        <button className={styles.btn}>Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;