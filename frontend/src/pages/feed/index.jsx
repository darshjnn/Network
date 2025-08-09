import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import { getAllPosts } from '@/config/redux/action/postAction/getAllPosts';

import styles from "./style.module.css";

import UserLayout from '@/layouts/UserLayout';
import PanelLayout from '@/layouts/PanelLayout';

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
      dispatch(getAllPosts());
    }
  }, []);

  return (
    <UserLayout>
      <title>
        Feed | Network
      </title>

      <PanelLayout>
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
      </PanelLayout>

    </UserLayout>
  );
}
