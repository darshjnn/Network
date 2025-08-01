import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import { getUsernamePosts } from '@/config/redux/action/postAction/getUsernamePosts';

import styles from "./style.module.css";

import UserLayout from '@/layouts/UserLayout';

import TextSuccess from '../../../components/TextSuccess';
import TextDanger from '../../../components/TextDanger';
import ActionBtn from '../../../components/Buttons/ActionBtn';
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

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      route.push("/");
    }
  }, []);

  const [posts, setPosts] = useState();

  useEffect(() => {
    if (localStorage.getItem("token") && username) {
      dispatch(getUsernamePosts({ username: username }));
    }
  }, [username]);

  useEffect(() => {
    if (Array.isArray(postState.posts) || posts) {
      setPosts(postState.posts);
    }
  }, [postState.posts]);

  const handleDownloadProfile = async () => {
    alert("Profile download currently unavailable :(");
    console.log("Profile download currently unavailable :(")
  }

  const [connectionStatus, setConnectionStatus] = useState(false);

  return (
    <UserLayout>
      <title>
        Profile | Network
      </title>

      {
        (postState.isError && postState.message.message) &&
        <TextDanger message={postState.message.message} />
      }

      {
        (!postState.isError && postState.message.message) &&
        <TextSuccess message={postState.message.message} />
      }

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
                (authState.user && (authState.user.username !== username)) &&
                <div className="connectionStatus">
                  <ActionBtn message={"Connect"} />
                </div>
              }
            </div>

            <div className={styles.userDetailsBody}>
              <div className={styles.userAboutContainer}>

                {
                  userProfile.bio.length > 0 &&
                  <div className={styles.userBio}>
                    <h3>About</h3>
                    <ul><li><p>{userProfile.bio}</p></li></ul>
                  </div>
                }

                {
                  userProfile.currentPost.length > 0 &&
                  <div className={styles.userCurrentPost}>
                    <h3>Currently working as</h3>
                    <ul><li><p>{userProfile.currentPost}</p></li></ul>
                  </div>
                }
              </div>

              {
                userProfile.education.length > 0 &&
                <div className={styles.userEducation}>
                  <h3>Education</h3>
                  <ul>
                    {
                      userProfile.education.map(e => {
                        return (
                          <li key={e._id}>
                            <span><b>From:&nbsp;</b>{e.school}</span><br />
                            <span><b>Degree:&nbsp;</b>{e.degree}</span><br />
                            <span><b>Field:&nbsp;</b>{e.field}</span>
                          </li>
                        );
                      })
                    }
                  </ul>
                </div>
              }

              {
                userProfile.experience.length > 0 &&
                <div className={styles.userExperience}>
                  <h3>Experience</h3>
                  <ul>
                    {
                      userProfile.experience.map(e => {
                        return (
                          <li key={e._id}>
                            <span><b>Company:&nbsp;</b>{e.company}</span><br />
                            <span><b>Position:&nbsp;</b>{e.position}</span><br />
                            <span><b>Duration:&nbsp;</b>{e.duration}</span>
                          </li>
                        );
                      })
                    }
                  </ul>
                </div>
              }

            </div>
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
