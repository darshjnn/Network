import React from 'react';
import { useRouter } from 'next/router';

import styles from "./style.module.css";

export default function InteractBtn({ message, svg, route }) {
    const router = useRouter();

    return (
        <>
            {(route && svg) &&
                <button type="button" onClick={() => router.push(route)} className={styles.btn}>
                    {svg}
                    <span>{message}</span>
                </button>
            }

            {
                (!route) && svg &&
                <button type="button" className={styles.btn}>
                    {svg}
                    <span>{message}</span>
                </button>
            }
        </>
    );
}
