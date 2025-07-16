import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from "./style.module.css";

import UserLayout from '@/layouts/UserLayout';
import FeedLayout from '@/layouts/FeedLayout';

import { BASE_URL } from '@/config';

export default function index() {
  const dispatch = useDispatch();
  const postState = useSelector((state) => state.post);

  return (
    <UserLayout>

      <FeedLayout>
        <div className={styles.feedBody}>

          {
            postState.posts?.map((p) => {
              return (
                <div key={p._id} className={styles.postContainer}>

                  <div className={styles.postHeader}>
                    <img src={`${BASE_URL}/uploads/profile_pictures/${p.userId.profilePicture}`} alt="user_img" className={styles.userImg} />

                    <div className={styles.userInfo}>
                      <p><b>{p.userId.name}</b></p>
                      <p>@{p.userId.username}</p>
                    </div>
                  </div>

                  <div className={styles.postContent}>
                    {
                      (p.fileType === "jpg" || p.fileType === "jpeg" || p.fileType === "png")
                      &&
                      <div className={styles.postImgContainer}>
                        <img src={`${BASE_URL}/uploads/posts/${p.media}`} alt="post_img" className={styles.postImg} />
                      </div>
                    }

                    <div className={styles.postBodyContainer}>
                      <p>{p.body}</p>
                    </div>
                  </div>

                </div>
              );
            })
          }

        </div>
      </FeedLayout>

    </UserLayout>
  );
}
