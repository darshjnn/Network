import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { toggleLikePost } from '@/config/redux/action/postAction/toggleLikePost';
import { getAllComments } from '@/config/redux/action/postAction/getAllComments';

import { resetComment } from '@/config/redux/reducer/postReducer';

import styles from "./style.module.css";

import InteractBtn from "../Buttons/InteractBtn";
import Comment from "../Comment";

import LikeSVG from "@/svg/like.svg";
import LikeFilledSVG from "@/svg/liked_filled.svg";
import CommentSVG from "@/svg/comment.svg";
import CloseSVG from "@/svg/close.svg";

import { BASE_URL } from '@/config';

export default function Post({ userId, post }) {
  const postState = useSelector((state) => state.post);
  const dispatch = useDispatch();

  const [isPostLiked, setIsPostLiked] = useState(post.likedBy.includes(userId));
  const [postLikeCount, setPostLikeCount] = useState(post.likes);

  const handleTogglePostLike = async (postId) => {
    try {
      await dispatch(toggleLikePost({ postId: postId })).unwrap();
      setIsPostLiked(prev => !prev);

      if (!isPostLiked) {
        setPostLikeCount(prev => prev + 1);
      } else {
        setPostLikeCount(prev => prev - 1);
      }

    } catch (err) {
      console.error(err)
    }
  }

  const handleGetComments = async (postId) => {
    await dispatch(getAllComments({ postId: postId })).unwrap();
  }

  const handleResetComment = () => {
    dispatch(resetComment());
  }

  return (
    <>
      <div className={styles.postContainer}>
        {
          (post.createdAt !== post.updatedAt) && <p className={styles.isEdited}>Edited</p>
        }

        <div className={styles.postHeader}>
          <img src={`${BASE_URL}/uploads/profile_pictures/${post.userId.profilePicture}`} alt={post.userId.username} className={styles.userImg} />

          <div className={styles.userInfo}>
            <span><b>{post.userId.name}</b></span>
            <span>@{post.userId.username}</span>
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
          Posted on: {new Date(post.createdAt).toLocaleString()}
        </div>
      </div>

      <div className={styles.postActions}>
        <span className="likes">Likes: {postLikeCount}</span>

        {
          isPostLiked ?
            <div className={styles.unlikePost} onClick={() => handleTogglePostLike(post._id)}>
              <InteractBtn message={"Unlike"} svg={<LikeFilledSVG />} />
            </div>
            :
            <div className={styles.likePost} onClick={() => handleTogglePostLike(post._id)}>
              <InteractBtn message={"Like"} svg={<LikeSVG />} />
            </div>
        }

        <div className={styles.comment} onClick={() => handleGetComments(post._id)}>
          <InteractBtn message={"Comment"} svg={<CommentSVG />} />
        </div>

        {
          postState.comment &&
          <div className={styles.commentContainer} onClick={handleResetComment}>

            <div className={styles.commentsWrapper} onClick={(e) => e.stopPropagation()}>
              <div className={styles.closeCommentBoxBtn} onClick={handleResetComment}>
                <InteractBtn svg={<CloseSVG />} />
              </div>

              {
                postState.isLoading ?
                  <h2>Fetching Comments...</h2>
                  :
                  <Comment userId={userId} postId={postState.postId} comments={postState.comment} />
              }

            </div>
          </div>
        }
      </div>
    </>
  );
}
