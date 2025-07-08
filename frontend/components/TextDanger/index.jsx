import React from 'react';

import styles from "./style.module.css";

export default function index({ message }) {
    return (
        <p className={styles.text}>{message}</p>
    );
}
