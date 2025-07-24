import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import { currentUser } from '@/config/redux/action/authAction/currentUser';
import { getPosts } from '@/config/redux/action/postAction/getPosts';

import styles from "./style.module.css";

import UserLayout from '@/layouts/UserLayout';
import FeedLayout from '@/layouts/FeedLayout';

import Post from '../../../components/Post';

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
      dispatch(getPosts());
    }
  }, []);

  return (
    <UserLayout>
      <title>
        Feed | Network
      </title>

      <FeedLayout>
        <div className={styles.feedBody}>

          {authState.user &&
            postState.posts?.map((p) => {
              return (
                <div key={p._id}>
                  <Post userId={authState.user._id} post={p} />
                </div>
              );
            })
          }

        </div>
      </FeedLayout>

    </UserLayout>
  );
}
