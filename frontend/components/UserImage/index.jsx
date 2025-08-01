import React from 'react';
import Image from 'next/image';

import styles from "./style.module.css";

export default function UserImage({ src }) {
    return (
        <div className={styles.userImageContainer}>
            <img src={src} alt="user" />
        </div>
    );
}
