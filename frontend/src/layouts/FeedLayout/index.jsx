import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import styles from "./style.module.css";

import ActionBtn from "../../../components/Buttons/ActionBtn";

export default function index({ children }) {
  const route = useRouter();

  return (
    <div className={styles.feedMainContainer}>

      <div className={styles.userContainer}>
        <span>User Profile</span>

        <div className={styles.userActivity}>
          <h3>My Activity</h3>

          <ActionBtn message={"My Posts"} route={"/my_posts"} />

          <ActionBtn message={"My Comments"} />

          <ActionBtn message={"My Likes"} />
        </div>

      </div>

      <div className={styles.feedContainer}>

        <div className={styles.createPost}>
          <ActionBtn message={"Share Your Thoughts. Create a new Post?"} route={"/post"} />
        </div>

        {children}

      </div>

    </div>
  );
}
