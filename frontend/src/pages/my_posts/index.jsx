import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import { getCurrUserPosts } from '@/config/redux/action/postAction/getCurrUserPosts';

import UserLayout from '@/layouts/UserLayout';
import FeedLayout from '@/layouts/FeedLayout';

import Post from '../../../components/Post';
import PostActions from '../../../components/PostActions';
import TextDanger from "../../../components/TextDanger";
import TextSuccess from "../../../components/TextSuccess";

import styles from "./style.module.css";

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

  const [posts, setPosts] = useState();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(getCurrUserPosts());
    }
  }, []);

  useEffect(() => {
    if (Array.isArray(postState.posts) || posts) {
      setPosts(postState.posts);
    }
  }, [postState.posts]);

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
            Array.isArray(posts) && posts.length === 0 &&
            <h1 className={styles.noPosts}>No posts to show...</h1>
          }

          {
            authState.user &&
            posts?.map((p) => {
              return (
                <div key={p._id}>
                  <Post userId={authState.user._id} post={p} />

                  {
                    (p.userId._id === authState.user._id) &&
                    <PostActions posts={posts} setPosts={setPosts} postId={p._id} isArchived={p.archived} />
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
