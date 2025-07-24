import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
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
import { toggleArchivePost } from '@/config/redux/action/postAction/toggleArchivePost';

export default function index() {
  const authState = useSelector((state) => state.auth);
  const postState = useSelector((state) => state.post);
  const route = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      route.push("/");
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(getUserPosts());
    }
  }, []);

  const handleDeletePost = async (postId) => {
    await dispatch(deletePost({ postId: postId })).unwrap();

    setTimeout(() => {
      dispatch(getUserPosts()).unwrap();
    }, 1000);
  }

  const handleArchivePost = async (postId) => {
    await dispatch(toggleArchivePost({ postId: postId })).unwrap();

    setTimeout(() => {
      dispatch(getUserPosts()).unwrap();
    }, 1000);
  }

  const handleEditPost = async (postId) => {
    console.log(postId);
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
            <h1 className={styles.noPosts}>No posts to show...</h1>
          }

          {authState.user &&
            postState.posts?.map((p) => {
              return (
                <div key={p._id}>
                  <Post userId={authState.user._id} post={p} />

                  {(p.userId._id === authState.user._id)
                    &&
                    <div className={styles.userPostActions}>

                      <button type='button' className={actionBtnStyle.button} onClick={() => handleEditPost(p._id)}>
                        Edit Post
                      </button>

                      { 
                      (!p.archived) ?
                      <button type="button" className={actionBtnStyle.button} onClick={() => handleArchivePost(p._id)}>
                        Archive Post
                      </button>
                      :
                      <button type="button" className={actionBtnStyle.button} onClick={() => handleArchivePost(p._id)}>
                        Unarchive Post
                      </button>
                      }

                      <button type='button' className={actionBtnStyle.button} onClick={() => handleDeletePost(p._id)}>
                        Delete Post
                      </button>
                    </div>
                  }
                </div>
              );
            })
          }

        </div>
      </FeedLayout>


    </UserLayout>
  )
}
