import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import { getUsernamePosts } from '@/config/redux/action/postAction/getUsernamePosts';
import { connectionsList } from '@/config/redux/action/authAction/connectionsList';
import { updateProfilePicture } from '@/config/redux/action/authAction/updateProfilePicture';

import styles from "./style.module.css";

import UserLayout from '@/layouts/UserLayout';

import TextSuccess from '../../../components/TextSuccess';
import TextDanger from '../../../components/TextDanger';
import ActionBtn from '../../../components/Buttons/ActionBtn';
import UserProfile from '../../../components/UserProfile';
import UsernameConnectionStatus from '../../../components/UsernameConnectionStatus';
import Post from '../../../components/Post';
import PostActions from '../../../components/PostActions';
import Popup from '../../../components/Popup';

import LogoSVG from "@/svg/logo.svg";
import EditSVG from "@/svg/edit.svg";

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
  const [isInfoPopupOpen, setInfoPopupOpen] = useState(false);
  const [isProfilePopupOpen, setProfilePopupOpen] = useState(false);
  const [profilePic, setProfilePic] = useState();
  const [infoFormInp, setInfoFormInp] = useState({
    inpName: '',
    inpUsername: '',
    inpEmail: '',
  });
  const [profileFormInp, setProfileInp] = useState({
    inpBio: '',
    inpCurrentPost: '',
    inpEducation: '',
    inpExperience: ''
  });

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      route.push("/");
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("token") && username) {
      setProfilePic(`${BASE_URL}/uploads/profile_pictures/${userProfile.userId.profilePicture}`);
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

  const handleChangeProfilePic = async (profilePic) => {
    try {
      setProfilePic(URL.createObjectURL(profilePic));
      await dispatch(updateProfilePicture({
        "profilePicture": profilePic
      })).unwrap();
      setSuccess("Profile Picture Updated...");

    } catch (error) {
      console.error(error.message);
      setError(error.message)
    }
  }

  let handelInfoFormInp = (event) => {
    let fieldName = event.target.name;
    let newVal = event.target.value;

    setInfoFormInp((currData) => {
      return { ...currData, [fieldName]: newVal };
    });
  }

  let handelProfileFormInp = (event) => {
    let fieldName = event.target.name;
    let newVal = event.target.value;

    setProfileInp((currData) => {
      return { ...currData, [fieldName]: newVal };
    });
  }

  return (
    <UserLayout>
      <title>
        Profile | Network
      </title>

      {error && <TextDanger onClose={() => setError()} message={error} />}

      {success && <TextSuccess onClose={() => setSuccess()} message={success} />}

      <div className={styles.body}>

        <div className={styles.backdropContainer}>
          <LogoSVG />

          <h2>Network</h2>

          {
            (authState.user && authState.user.username === userProfile.userId.username) ?
              <>
                <input type="file" id='updateProfilePic' onChange={(e) => handleChangeProfilePic(e.target.files[0])} hidden />
                <label className={styles.userImgOverlay} htmlFor='updateProfilePic'>
                  <EditSVG />

                  <span>Change?</span>

                </label>
              </>
              :
              <></>
          }

          <div className={styles.userImgContainer}>
            <img src={profilePic} alt="user" />
          </div>

        </div>

        <div className={styles.userProfile}>
          <div className={styles.userActions}>

            <h3>About {userProfile.userId.name} </h3>

            <div onClick={handleDownloadProfile}>
              <ActionBtn message={"Download Resume"} />
            </div>

          </div>

          {
            (authState.user && authState.user._id === userProfile.userId._id) &&
            <div className={styles.userActions}>

              <h3>Update</h3>

              <div onClick={() => setInfoPopupOpen(true)}>
                <ActionBtn message={"Update Information"} />
              </div>

              <Popup isOpen={isInfoPopupOpen} onClose={() => setInfoPopupOpen(false)}>

                <div className={styles.profileUpdateForm}>

                  <div>
                    <label htmlFor="name">Change Name?</label>
                    <input type="text" id='name' placeholder={userProfile.userId.name} name='name' onChange={handelInfoFormInp} />
                  </div>

                  <div>
                    <label htmlFor="username">Change Username?</label>
                    <input type="text" id='username' placeholder={userProfile.userId.username} name='username' onChange={handelInfoFormInp} />
                  </div>

                  <div>
                    <label htmlFor='email'>Change Email?</label>
                    <input type="text" id='email' placeholder={userProfile.userId.email} name='email' onChange={handelInfoFormInp} />
                  </div>

                  <div>
                    <ActionBtn message={"Confirm Changes?"} />
                  </div>

                </div>

              </Popup>

              <div onClick={() => setProfilePopupOpen(true)}>
                <ActionBtn message={"Update Profile"} />
              </div>

              <Popup isOpen={isProfilePopupOpen} onClose={() => setProfilePopupOpen(false)} >

                <div className={styles.profileUpdateForm}>

                  <div>
                    <label htmlFor='bio'>Change Bio?</label>
                    <input type="text" id='bio' placeholder={userProfile.bio ? userProfile.bio : "Add Bio"} name='bio' onChange={handelProfileFormInp} />
                  </div>

                  <div>
                    <label htmlFor='currentPost'>Change Current Post?</label>
                    <input type="text" id='currentPost' placeholder={userProfile.currentPost ? userProfile.currentPost : "Add Current Post"} name='currentPost' onChange={handelProfileFormInp} />
                  </div>

                  <div>
                    <label htmlFor='education'>Change Education?</label>
                    <input type="text" id='education' placeholder={userProfile.education ? userProfile.education : "Add Education"} name='education' onChange={handelProfileFormInp} />
                  </div>

                  <div>
                    <label htmlFor='experience'>Change Experience?</label>
                    <input type="text" id='experience' placeholder={userProfile.experience} name='experience' onChange={handelProfileFormInp} />
                  </div>

                  <div>
                    <ActionBtn message={"Confirm Changes?"} />
                  </div>

                </div>

              </Popup>

            </div>
          }
        </div>

        <div className={styles.userContainer}>

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
