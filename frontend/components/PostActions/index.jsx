import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { toggleArchivePost } from '@/config/redux/action/postAction/toggleArchivePost';
import { deletePost } from '@/config/redux/action/postAction/deletePost';

import styles from "./styles.module.css";

import ActionBtn from '../Buttons/ActionBtn';

export default function PostActions({ posts, setPosts, postId, isArchived }) {
  const dispatch = useDispatch();

  const [archived, setArchived] = useState(isArchived);

  const handleDeletePost = async () => {
    try {
      await dispatch(deletePost({ postId: postId })).unwrap();
      const index = posts.findIndex((p) => p._id === postId);
      setPosts(prevPosts => prevPosts.filter(p => p._id !== postId));
    } catch (error) {
      console.error(error);
    }
  }

  const handleArchivePost = async () => {
    try {
      await dispatch(toggleArchivePost({ postId: postId })).unwrap();
      setArchived(prev => !prev);
    } catch (error) {
      console.error(error);
    }
  }

  const handleEditPost = async () => {
    alert("Edit post is currently unavailable :(")
    console.log("Edit post is currently unavailable :(");
    console.log(postId);
  }

  return (
    <div className={styles.userPostActions}>

      <div onClick={() => handleEditPost()}>
        <ActionBtn message={"Edit Post"} />
      </div>

      {
        (!archived) ?
          <div onClick={() => handleArchivePost()}>
            <ActionBtn message={"Archive Post"} />
          </div>
          :
          <div onClick={() => handleArchivePost()}>
            <ActionBtn message={"Unarchive Post"} />
          </div>
      }

      <div onClick={() => handleDeletePost()}>
        <ActionBtn message={"Delete Post"} />
      </div>
    </div>
  )
}
