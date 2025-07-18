import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getUserPosts } from '@/config/redux/action/postAction/getUserPosts';
import { deletePost } from '@/config/redux/action/postAction/deletePost';

import UserLayout from '@/layouts/UserLayout';
import FeedLayout from '@/layouts/FeedLayout';

import Post from '../../../components/Post';
import TextDanger from "../../../components/TextDanger";
import TextSuccess from "../../../components/TextSuccess";

import styles from "./style.module.css";
import actionBtnStyle from "../../../components/Buttons/ActionBtn/style.module.css";

export default function index() {
  const authState = useSelector((state) => state.auth);
  const postState = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserPosts());
  }, []);

  const handleDeletePost = async (postId) => {
    await dispatch(deletePost({ postId: postId })).unwrap();

    setTimeout(() => {
      dispatch(getUserPosts()).unwrap();
    }, 1000);
  }

  return (
    <UserLayout>
      <title>
        My Posts | Network
      </title>

      <FeedLayout >
        {
          (postState.isError && postState.message.message) &&
          <TextDanger message={postState.message.message} />
        }

        {
          (!postState.isError && postState.message.message) &&
          <TextSuccess message={postState.message.message} />
        }

        <div className={styles.myPosts}>


          {
            Array.isArray(postState.posts) && postState.posts.length === 0 &&
            <p className={styles.noPosts}>No posts to show...</p>
          }


          {
            postState.posts?.map((p) => {
              return (
                <span key={p._id}>
                  <Post post={p} />

                  {(p.userId._id === authState.user._id)
                    &&
                    <div className={styles.userPostActions}>
                      {
                        (!p.archived) ?
                          <button type="button" className={actionBtnStyle.button}>
                            Archive Post
                          </button>
                          :
                          <button type="button" className={actionBtnStyle.button}>
                            Unarchive Post
                          </button>
                      }

                      <button type='button' className={actionBtnStyle.button} onClick={() => handleDeletePost(p._id)}>
                        Delete Post
                      </button>
                    </div>
                  }
                </span>
              );
            })
          }

        </div>
      </FeedLayout>


    </UserLayout>
  )
}
