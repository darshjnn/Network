import React from 'react';
import { useRouter } from 'next/router';

import styles from "./style.module.css";

export default function index({ message, svg, route }) {
    const router = useRouter();

    return (
        <>
            {(route && svg) &&
                <button type="button" onClick={() => router.push(route)} className={styles.btn}>
                    <img src={`svg/${svg}`} alt={`${svg}`} className={styles.btnImg} />
                    {message}
                </button>
        }
        </>
    );
}
