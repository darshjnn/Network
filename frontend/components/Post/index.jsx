import React from 'react';
import { useDispatch } from 'react-redux';

import { getPosts } from '@/config/redux/action/postAction/getPosts';
import { toggleLikePost } from '@/config/redux/action/postAction/toggleLikePost';

import styles from "./style.module.css";

import InteractBtn from "../Buttons/InteractBtn";

import { BASE_URL } from '@/config';

export default function Post({ userId, post }) {
  const dispatch = useDispatch()

  const handleTogglePostLike = async (postId) => {
    await dispatch(toggleLikePost({ postId: postId })).unwrap();
    await dispatch(getPosts());
  }

  return (
    <>

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

      <div className={styles.postActions}>
        <p className="likes">
          Likes: {post.likes}
        </p>
        {
          !post.likedBy.includes(userId) &&
          <div className={styles.likePost} onClick={() => handleTogglePostLike(post._id)}>
            <InteractBtn message={"Like"} svg={"like.svg"} />
          </div>
        }

        {
          post.likedBy.includes(userId) &&
          <div className={styles.unlikePost} onClick={() => handleTogglePostLike(post._id)}>
            <InteractBtn message={"Unlike"} svg={"liked_filled.svg"} />
          </div>
        }

        <div className={styles.comment}>
          <InteractBtn message={"Comment"} svg={"comment.svg"} />
        </div>
      </div>
    </>
  );
}
