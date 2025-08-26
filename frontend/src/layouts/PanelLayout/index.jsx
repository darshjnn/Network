import React from 'react';
import Link from 'next/link';

import styles from "./style.module.css";

import ActionBtn from "../../../components/Buttons/ActionBtn";

export default function PanelLayout({ children }) {

  return (
    <div className={styles.feedMainContainer}>

      <div className={styles.userContainer}>
        <div className={styles.userContainerWrapper}>
          <div className={styles.routesWrapper}>

            <h3>My Activity</h3>

            <Link href={"/my_posts"}>
              <ActionBtn message={"My Posts"} />
            </Link>

            <Link href={"/my_posts"}>
              <ActionBtn message={"My Comments"} />
            </Link>

            <Link href={"/my_posts"}>
              <ActionBtn message={"My Likes"} />
            </Link>

          </div>

          <div className={styles.routesWrapper}>
            <h3>Manage Connections</h3>

            <Link href={"/connections"}>
              <ActionBtn message={"My Connections"} />
            </Link>

            <Link href={"/requests"}>
              <ActionBtn message={"Manage Requests"} />
            </Link>

          </div>
        </div>
      </div>

      <div className={styles.feedContainer}>

        <div className={styles.createPost}>
          <Link href={"/post"}>
            <ActionBtn message={"Share Your Thoughts. Create a new Post?"} />
          </Link>
        </div>

        {children}

      </div>

    </div>
  );
}
