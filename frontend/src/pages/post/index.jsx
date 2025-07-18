import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import { currentUser } from '@/config/redux/action/authAction/currentUser';
import { createPost } from '@/config/redux/action/postAction/createPost';

import UserLayout from '@/layouts/UserLayout';

import styles from "./style.module.css";
import btnStyle from "../../../components/Buttons/ActionBtn/style.module.css";

import ActionBtn from "../../../components/Buttons/ActionBtn";
import TextArea from "../../../components/AutoResizeTextArea";
import TextSuccess from "../../../components/TextSuccess";
import TextDanger from "../../../components/TextDanger";

import { BASE_URL } from '@/config';

export default function index() {
  const authState = useSelector((state) => state.auth);
  const postState = useSelector((state) => state.post);
  const dispatch = useDispatch();

  const [postContent, setPostContent] = useState("");
  const [fileContent, setFileContent] = useState();

  const handleCreatePost = async () => {
      await dispatch(createPost({ file: fileContent, body: postContent })).unwrap();
      setPostContent("");
      setFileContent(null);
  }

  return (

    <UserLayout>
      <title>
        New Post | Network
      </title>

      <div className={styles.createPostContainer}>

        {authState.user && <img src={`${BASE_URL}/uploads/profile_pictures/${authState.user.profilePicture}`} alt="profile_pic" className={styles.userImg} />}

        {postState.isError && <TextDanger message={postState.message.message} />}
        {postState.message.message && <TextSuccess message={postState.message.message} />}

        <div className={styles.createPost}>

          <div className={styles.textAreaDiv}>
            <TextArea name={"postContent"} id={"postContent"} value={postContent} onChange={e => setPostContent(e.target.value)} placeholder={"Share Your Thoughts! Create a new Post?"} />
          </div>

        </div>

        <div className={styles.actionBtn}>

          {
            (postContent.length > 0) &&
            <>
              <input type="file" name="fileUpload" id="fileUpload" hidden onChange={(e) => setFileContent(e.target.files[0])} />
              <label htmlFor="fileUpload" className={btnStyle.button}>
                {!fileContent ?
                  "Support Idea with a Document? Upload!"
                  :
                  `Upload ${fileContent.name}?`
                }
              </label>
            </>
          }

          <div className={styles.createPostBtn} onClick={handleCreatePost}>
            {(postContent.length > 0) && <ActionBtn message={"Post Your Idea!"} />}
          </div>

          <ActionBtn message={"Lost Your Thoughts. Go Back?"} route={"/feed"} />
        </div>

      </div>

    </UserLayout>
  );
}
