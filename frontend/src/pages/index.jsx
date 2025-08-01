import React, { useEffect } from 'react';
import Link from 'next/link';

import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import { currentUser } from '@/config/redux/action/authAction/currentUser';

import UserLayout from "@/layouts/UserLayout";

import ActionBtn from "../../components/Buttons/ActionBtn";

import styles from "@/styles/Home.module.css";

export default function Home() {
  const route = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      // Check if the token in local matches with the one in database
      dispatch(currentUser({ token: localStorage.getItem("token") }))
        .unwrap().catch(() => {
          route.push("/");
          localStorage.clear("token");
        });

      // Push to "/feed" if valid user is there
      route.push("/feed");
    }
  }, []);

  return (
    <UserLayout>

      <div className={styles.body}>
        <main className={styles.mainContainer}>

          <div className={styles.mainContainerLeft}>
            <p>Make Friends Without Exaggeration...</p>

            <p>A true social platform with no bluffs!</p>

            <div className={styles.buttonActions}>
              <Link href={"/signup"}>
                <ActionBtn message={"Create a room for Yourself by Registering!"} />
              </Link>

              <Link href={"/login"}>
                <ActionBtn message={"Knock the door to Log in..."} />
              </Link>
            </div>
          </div>

          <div className={styles.mainContainerRight}>
            <img src="images/home_main.png" alt="connect with people" className={styles.mainContainerRightImg} />
          </div>

        </main>
      </div>
    </UserLayout>
  );
}
