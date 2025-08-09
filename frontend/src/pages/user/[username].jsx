import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import { getUsernamePosts } from '@/config/redux/action/postAction/getUsernamePosts';
import { connectionsList } from '@/config/redux/action/authAction/connectionsList';

import styles from "./style.module.css";

import UserLayout from '@/layouts/UserLayout';

import TextSuccess from '../../../components/TextSuccess';
import TextDanger from '../../../components/TextDanger';
import ActionBtn from '../../../components/Buttons/ActionBtn';
import UserProfile from '../../../components/UserProfile';
import UsernameConnectionStatus from '../../../components/UsernameConnectionStatus';
import Post from '../../../components/Post';
import PostActions from '../../../components/PostActions';

import LogoSVG from "@/svg/logo.svg";

import { BASE_URL, clientServer } from '@/config';

export default function User({ userProfile }) {
  const authState = useSelector((state) => state.auth);
  const postState = useSelector((state) => state.post);

  const dispatch = useDispatch();
  const route = useRouter();
  const { username } = route.query;

  const [posts, setPosts] = useState();
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      route.push("/");
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("token") && username) {
      try {
        dispatch(connectionsList());
        dispatch(getUsernamePosts({ username: username }));
      } catch (error) {
        console.error(error);
        setError(error);
      }
    }
  }, [username]);

  useEffect(() => {
    if (Array.isArray(postState.posts) || posts) {
      setPosts(postState.posts);
    }
  }, [postState.posts]);

  const handleDownloadProfile = async () => {
    try {
      const response = await clientServer.post("/profile/get_resume", {
        token: localStorage.getItem("token"),
        userId: userProfile.userId._id
      });

      if (response.data) {
        window.open(`${BASE_URL}/uploads/resume/${userProfile.userId._id}.pdf`, "_blank");
      }

    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  }

  return (
    <UserLayout>
      <title>
        Profile | Network
      </title>

      {error && <TextDanger onClose={() => setError()} message={error} />}

      {success && <TextSuccess onClose={() => setSuccess()} message={success} />}

      <div className={styles.body}>
        <div className={styles.userProfile}>

          <div className={styles.userActions}>

            <h3>About {userProfile.userId.name} </h3>

            <div onClick={handleDownloadProfile}>
              <ActionBtn message={"Download Resume"} />
            </div>

          </div>
        </div>

        <div className={styles.userContainer}>
          <div className={styles.backdropContainer}>
            <LogoSVG />
            <h2>Network</h2>

            <div className={styles.userImgContainer}>
              <img src={`${BASE_URL}/uploads/profile_pictures/${userProfile.userId.profilePicture}`} alt="user" />
            </div>

          </div>

          <section className={styles.userDetails}>

            <div className={styles.userDetailsHeader}>
              <h3>{userProfile.userId.name} </h3>
              <span>@{userProfile.userId.username}</span>

              {
                (authState.user && authState.user._id !== userProfile.userId._id) &&
                <UsernameConnectionStatus queryUserId={userProfile.userId._id} />
              }

            </div>

            <UserProfile userProfile={userProfile} />

          </section>

          <div className={styles.userPostContainer}>
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
        </div>
      </div>
    </UserLayout>
  );
}

// Server Side Rendering
export async function getServerSideProps(context) {

  const request = await clientServer.post("/profile/user_profile", {
    username: context.query.username
  });

  const response = await request.data.userProfile;

  return { props: { userProfile: response } };
}
