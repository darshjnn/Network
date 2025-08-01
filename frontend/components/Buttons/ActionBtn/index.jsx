import React from 'react';

import styles from "./style.module.css";

export default function ActionBtn({ message, type = "button" }) {

  return (
    <button type={type} className={styles.button}>
      {message}
    </button >
  );
}
