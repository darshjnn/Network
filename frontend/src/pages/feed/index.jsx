import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getPosts } from '@/config/redux/action/postAction/getPosts';

import styles from "./style.module.css";

import UserLayout from '@/layouts/UserLayout';
import FeedLayout from '@/layouts/FeedLayout';

import Post from '../../../components/Post';

export default function index() {
  const postState = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch posts if the user is valid
    dispatch(getPosts());
  }, []);

  return (
    <UserLayout>
      <title>
        Feed | Network
      </title>

      <FeedLayout>
        <div className={styles.feedBody}>

          {
            postState.posts?.map((p) => {
              return (
                <span key={p._id}>
                  <Post post={p} />
                </span>
              );
            })
          }

        </div>
      </FeedLayout>

    </UserLayout>
  );
}
