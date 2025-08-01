import React from 'react';

import styles from "./style.module.css";

export default function InteractBtn({ message, svg }) {
    return (
        <button type="button" className={styles.button}>
            {svg}
            <span>{message}</span>
        </button>
    );
}
