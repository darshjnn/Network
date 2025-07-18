import React from 'react';

import styles from "./style.module.css";

import { BASE_URL } from '@/config';

export default function Post({ id, post }) {
  return (
    <div className={styles.postContainer}>
      {
        (post.createdAt !== post.updatedAt) && <p className={styles.isEdited}>Edited</p>
      }

        <div className={styles.postHeader}>
          <img src={`${BASE_URL}/uploads/profile_pictures/${post.userId.profilePicture}`} alt="user_img" className={styles.userImg} />

          <div className={styles.userInfo}>
            <p><b>{post.userId.name}</b></p>
            <p>@{post.userId.username}</p>
          </div>
        </div>

        <div className={styles.postContent}>
          {
            (post.fileType === "jpg" || post.fileType === "jpeg" || post.fileType === "png")
            &&
            <div className={styles.postImgContainer}>
              <img src={`${BASE_URL}/uploads/posts/${post.media}`} alt="post_img" className={styles.postImg} />
            </div>
          }

          <div className={styles.postBodyContainer}>
            <p>{post.body}</p>
          </div>
        </div>

        <div className={styles.postFooter}>
        <p>Posted on: {post.createdAt.toString().split('T')[0]}</p>
        </div>
      </div>
  )
}
