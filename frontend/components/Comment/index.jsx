import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAllComments } from '@/config/redux/action/postAction/getAllComments';
import { postComment } from '@/config/redux/action/postAction/postComment';
import { toggleLikeComment } from '@/config/redux/action/postAction/toggleLikeComment';

import styles from "./style.module.css";

import InteractBtn from "../Buttons/InteractBtn";
import ActionBtn from '../Buttons/ActionBtn';
import AutoResizeTextArea from "../AutoResizeTextArea";
import TextSuccess from '../TextSuccess';
import TextDanger from '../TextDanger';

import LikeSVG from "@/svg/like.svg";
import LikeFilledSVG from "@/svg/liked_filled.svg";
import ReplySVG from "@/svg/reply.svg";

import { BASE_URL } from '@/config';

function CommentItem({ userId, postId, comment }) {
  const dispatch = useDispatch();

  const [isCommentLiked, setIsCommentLiked] = useState(comment.likedBy.includes(userId));
  const [commentLikeCount, setCommentLikeCount] = useState(comment.likes);

  const handleCommentToggleLike = async (commentId, postId) => {
    try {
      await dispatch(toggleLikeComment({ commentId: commentId, postId: postId })).unwrap();
      setIsCommentLiked(prev => !prev);

      if (!isCommentLiked) {
        setCommentLikeCount(prev => prev + 1);
      } else {
        setCommentLikeCount(prev => prev - 1);
      }

    } catch (error) {
      console.error(error)
    }
  }

  const handleCommentReply = async (postId, parentComment) => {
    alert("Reply to comment is not available currently :(")
    console.log("Reply to comment is not available currently :(");
    console.log(postId)
    console.log(parentComment)
  }

  return (
    <div className={styles.commentItem}>
      <div className={styles.commentHeader}>
        <img src={`${BASE_URL}/uploads/profile_pictures/${comment.userId.profilePicture}`} alt={comment.userId.username} className={styles.profilePic} />

        <div className={styles.userInfo}>
          <p><b>{comment.userId.name}</b></p>
          <p>@{comment.userId.username}</p>
        </div>
      </div>

      <div className={styles.commentBody}>
        {comment.body}
      </div>

      <div className={styles.commentMeta}>
        <span>{new Date(comment.createdAt).toLocaleString()}</span>
      </div>

      <div className={styles.commentActions}>
        <span>Likes: {commentLikeCount}</span>

        {
          isCommentLiked ?
            <div className={styles.unlikePost} onClick={
              () => handleCommentToggleLike(comment._id, comment.postId)}>
              <InteractBtn message={"Unlike"} svg={<LikeFilledSVG />} />
            </div>
            :
            <div className={styles.likePost} onClick={
              () => handleCommentToggleLike(comment._id, comment.postId)}>
              <InteractBtn message={"Like"} svg={<LikeSVG />} />
            </div>
        }

        <div className={styles.comment} onClick={
          () => handleCommentReply(postId, comment._id)}>
          <InteractBtn message={"Reply"} svg={<ReplySVG />} />
        </div>
      </div>

      {/* Render Comments Recursively */}
      {
        comment.replies && comment.replies.length > 0 &&
        <div className={styles.replies}>
          {
            comment.replies.map(reply => {
              return (
                <CommentItem key={reply._id} userId={userId} postId={postId} comment={reply} />
              )
            })
          }
        </div>
      }
    </div>
  );
}

export default function Comment({ userId, postId, comments }) {
  const postState = useSelector((state) => state.post);
  const dispatch = useDispatch();

  const [commentBody, setCommentBody] = useState("");

  const handlePostComment = async (postId) => {
    await dispatch(postComment({ postId: postId, body: commentBody })).unwrap();
    setTimeout(async () => {
      await dispatch(getAllComments({ postId: postId })).unwrap();
    }, 1000);

    setCommentBody("");
  }

  return (
    <div className={styles.postComments}>

      {postState.isError && <TextDanger message={postState.message.message} />}
      {postState.message.message && !postState.isError && <TextSuccess message={postState.message.message} />}

      {
        (!comments || comments.length === 0) ?
          <h2>No Comments yet...</h2>
          :
          comments && comments.length > 0 &&
          comments.map(comment => {
            return (
              <div key={comment._id} className={styles.commentItemParent}>
                <CommentItem userId={userId} postId={postId} comment={comment} />
              </div>
            );
          })
      }

      <div className={styles.addCommentContainer}>
        <AutoResizeTextArea name={"comment"} value={commentBody} onChange={e => { setCommentBody(e.target.value) }} placeholder={"Want to share your thoughts about this?"} />

        <div onClick={() => handlePostComment(postId)}>
          <ActionBtn message={"Comment"} />
        </div>
      </div>

    </div>
  );
}
