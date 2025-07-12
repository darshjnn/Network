import React from 'react';

import styles from "./style.module.css";

export default function index({ children }) {
  return (
    <div className={styles.container}>

      <div className={styles.userContainer}>
        <p>User Profile</p>
      </div>

      <div className={styles.feedContainer}>
        <p>feed</p>

        {children}
        
      </div>
      
    </div>
  );
}
