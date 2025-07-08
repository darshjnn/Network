import React from 'react';

import { useRouter } from 'next/router';

import Button from '../Button';

import styles from "./styles.module.css";

export default function Navbar() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>

        <div className={styles.navbarLeft}>
          <div onClick={() => { router.push("/login") }} className={styles.routeHome}>
            <img src="svg/logo.svg" alt="logo" />
            <p>Network</p></div>
        </div>

        <div className={styles.navbarRight}>
          <div className={styles.buttonActions}>
            <Button message={"Sign Up!"} route="/signup" />

            <Button message={"Log In"} route="/login" />
          </div>

        </div>
      </nav>
    </div>
  )
}
