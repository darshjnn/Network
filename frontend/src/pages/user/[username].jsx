import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import { getUsernamePosts } from '@/config/redux/action/postAction/getUsernamePosts';
import { getConnections } from '@/config/redux/action/authAction/getConnections';
import { sendConnectioReq } from '@/config/redux/action/authAction/sendConnectionReq';
import { manageConnectionReq } from '@/config/redux/action/authAction/manageConnectionReq';

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
      try {
        dispatch(getUsernamePosts({ username: username }));
        dispatch(getConnections());
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
    alert("Profile download currently unavailable :(");
    console.log("Profile download currently unavailable :(")
  }

  const [connectionStatus, setConnectionStatus] = useState("");
  const [connectionDetails, setConnectionDetails] = useState();

  useEffect(() => {
    if (authState.connections) {
      const connection = authState.connections.find(user => {
        return (user.connectionId._id === userProfile.userId._id || user.userId === userProfile.userId._id);
      });

      if (connection) {
        setConnectionDetails(connection);

        if (connection.status === null) {
          if (connection.connectionId._id === userProfile.userId._id) {
            setConnectionStatus("Request Sent");

          } else if (connection.userId === userProfile.userId._id) {
            setConnectionStatus("Accept Request");
            setConnectionDetails(prev => ({ ...prev, status: true }));
          }
        } else if (connection.userId === userProfile.userId._id ||
          connection.connectionId._id === userProfile.userId._id && connection.status) {
          setConnectionStatus("Remove Connection");

        }
      } else {
        setConnectionStatus("Connect");
      }
    }
  }, [authState.connections, userProfile]);

  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  const manageConnection = async (userId) => {
    try {
      if (connectionStatus === "Connect") {
        const request = await dispatch(sendConnectioReq({ userId: userId })).unwrap();
        setConnectionStatus("Request Sent");
        setSuccess("Request Sent...");
        setConnectionDetails(request.request);

      } else if (connectionStatus === "Request Sent" && connectionDetails) {
        await dispatch(manageConnectionReq({
          requestId: connectionDetails._id,
          action: "delete"
        })).unwrap();

        setConnectionStatus("Connect");
        setSuccess("Request Deleted...");

      } else if (connectionStatus === "Accept Request" && connectionDetails) {
        await dispatch(manageConnectionReq({
          requestId: connectionDetails._id,
          action: "accept"
        })).unwrap();

        setConnectionStatus("Remove Connection");
        setSuccess("Request Accepted...");

      } else if (connectionStatus === "Remove Connection" && connectionDetails) {
        await dispatch(manageConnectionReq({
          requestId: connectionDetails._id,
          action: "delete"
        })).unwrap();

        setConnectionStatus("Connect");
        setSuccess("Connection removed...");
      }

    } catch (error) {
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
                (authState.user && (authState.user.username !== username)) &&
                <div onClick={() => manageConnection(userProfile.userId._id)}>
                  <ActionBtn message={connectionStatus} />
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
