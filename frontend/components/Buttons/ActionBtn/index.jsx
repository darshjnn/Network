import React from 'react';
import { useRouter } from 'next/router';

import styles from "./style.module.css";

export default function ActionBtn({ message, route, type = "button" }) {
  const router = useRouter();

  return (
    <>
      {
        route ?
          <button onClick={() => { router.push(route) }} type={type} className={styles.button}>
            {message}
          </button >
          :
          <button type={type} className={styles.button}> {message} </button >
      }
    </>
  );
}
