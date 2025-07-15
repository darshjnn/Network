import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { currentUser } from '@/config/redux/action/authAction';
import { getPosts } from '@/config/redux/action/postAction';

import styles from "./style.module.css";

import ActionBtn from "../../../components/Buttons/ActionBtn";

export default function index({ children }) {
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

      // Fetch posts if the user is valid
      dispatch(getPosts({ token: localStorage.getItem("token") }));
    } else {
      route.push("/");
    }
  }, []);

  return (    
    <div className={styles.feedMainContainer}>
      <title>
        Feed | Network
      </title>

      <div className={styles.userContainer}>
        <p>User Profile</p>
      </div>

      <div className={styles.feedContainer}>

        <div className={styles.createPost}>
          <ActionBtn message={"Share Your Thoughts. Create a new Post"} route={"/post"} />          
        </div>

        {children}

      </div>

    </div>
  );
}
