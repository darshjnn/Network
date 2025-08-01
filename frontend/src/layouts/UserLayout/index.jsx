import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import { clearAuthMessage } from '@/config/redux/reducer/authReducer';
import { clearPostMessage } from '@/config/redux/reducer/postReducer';
import { currentUser } from '@/config/redux/action/authAction/currentUser';

import styles from "./style.module.css";

import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

export default function UserLayout({ children }) {
    const route = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearAuthMessage());
        dispatch(clearPostMessage());
        if (localStorage.getItem("token")) {
            // Check if the token in local matches with the one in database
            dispatch(currentUser({ token: localStorage.getItem("token") }))
                .unwrap().catch(() => {
                    route.push("/");
                    localStorage.clear("token");
                });
        }
    }, []);

    return (
        <div className={styles.body}>
            <Navbar />

            <div className={styles.container}>

                {children}

            </div>

            <Footer />
        </div>
    )
}
