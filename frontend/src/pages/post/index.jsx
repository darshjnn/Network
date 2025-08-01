import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import { createPost } from '@/config/redux/action/postAction/createPost';

import UserLayout from '@/layouts/UserLayout';

import styles from "./style.module.css";
import btnStyle from "../../../components/Buttons/ActionBtn/style.module.css";

import ActionBtn from "../../../components/Buttons/ActionBtn";
import TextArea from "../../../components/AutoResizeTextArea";
import TextSuccess from "../../../components/TextSuccess";
import TextDanger from "../../../components/TextDanger";

import UploadImgSVG from "@/svg/image.svg";

export default function index() {
  const postState = useSelector((state) => state.post);
  const route = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      route.push("/");
    }
  }, []);

  const [postContent, setPostContent] = useState("");
  const [fileContent, setFileContent] = useState();
  const [filePreview, setFilePreview] = useState();

  const [error, setError] = useState();

  const handleFileChange = (e) => {
    console.log(e.target.files[0])
    const file = e.target.files[0];
    setFileContent(file);

    if (file && file.type.startsWith("image/")) {
      setFilePreview(URL.createObjectURL(file));
    } else {
      setFilePreview();
    }
  }

  const handleCreatePost = async () => {
    if (!postContent || postContent.length === 0) {
      setError("Post body cannot be empty!");
    } else {
      await dispatch(createPost({ file: fileContent, body: postContent })).unwrap();
      setPostContent("");
      setFileContent(null);
    }
  }

  return (
    <UserLayout>
      <title>
        New Post | Network
      </title>

      {error && <TextDanger onClose={() => setError()} message={error} />}

      {
        postState.message.message && !postState.isError &&
        <TextSuccess message={postState.message.message} />
      }

      <div className={styles.createPostContainer}>

        <input type="file" name="fileUpload" id="fileUpload" hidden onChange={handleFileChange} />

        <label className={styles.uploadImg} htmlFor="fileUpload">
          {
            !fileContent ?
              <>
                <UploadImgSVG />
                <span>Upload an Image?</span>
              </>
              :
              filePreview ? <img src={filePreview} alt="preview" />
                :
                <>
                  {
                    fileContent && <a href={URL.createObjectURL(fileContent)} target="_blank" rel="noopener noreferrer"><ActionBtn message={"Preview/Download"} /></a>
                  }
                </>
          }
        </label>

        <div className={styles.postBody}>
          <TextArea name={"postContent"} id={"postContent"} value={postContent} onChange={e => setPostContent(e.target.value)} placeholder={"Share Your Thoughts! Create a new Post?"} />
        </div>

        <div className={styles.actionBtn}>
          <label htmlFor="fileUpload" className={btnStyle.button}>
            {
              !fileContent ?
                "Support Idea with a Document? Upload!"
                :
                `Remove "${fileContent.name}"?`
            }
          </label>

          <div className={styles.createPostBtn} onClick={handleCreatePost}>
            <ActionBtn message={"Post Your Idea!"} />
          </div>
        </div>

      </div>

    </UserLayout>
  );
}
