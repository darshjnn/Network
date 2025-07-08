import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useState } from 'react';

import styles from "./style.module.css";
import buttonStyle from "../../../components/Button/style.module.css";

import UserLayout from '@/layouts/UserLayout';
import Navbar from '../../../components/Navbar';
import Button from '../../../components/Button';
import TextDanger from "../../../components/TextDanger";

import { clearMessage } from '@/config/redux/reducer/authReducer';
import { loginUser } from '@/config/redux/action/authAction';

export default function LogInComponent() {
  // Fetching authentication status of the user
  const authState = useSelector((state) => state.auth);

  const router = useRouter();
  const dispatch = useDispatch();

  // Redirect to '/dashboard' if user is already logged in
  useEffect(() => {
    if (authState.loggedIn || localStorage.getItem("token")) {
      router.push("/dashboard");
    }
  }, [authState.loggedIn]);

  // Handle Form Input
  let [formInp, setFormInp] = useState({
    inpUser: '',
    password: ''
  });

  // Clear auth message on mount
  useEffect(() => {
    dispatch(clearMessage());
  }, []);

  let handleFormInp = (event) => {
    let fieldName = event.target.name;
    let newVal = event.target.value;

    setFormInp((currData) => {
      return { ...currData, [fieldName]: newVal }
    });
  }

  // Handling Login
  const handleLogin = () => {
    console.log(formInp)
    dispatch(loginUser({
      username: formInp.inpUser,
      email: formInp.inpUser,
      password: formInp.password
    }));
  }

  return (
    <UserLayout>
      <Navbar />

      <div className={styles.body}>
        <div className={styles.container}>

          <div className={styles.containerLeft}>
            {
              authState.message.message ?
                <TextDanger message={authState.message.message} />
                :
                <></>
            }

            <br />

            <label htmlFor="inpUser">Enter Username or Email: &nbsp;</label>
            <input type="text" id="inpUser" placeholder="Enter Username or Email..." name="inpUser" value={formInp.inpUser} onChange={handleFormInp} />

            <br />

            <label htmlFor="inpPassword">Enter Password: &nbsp;</label>
            <input type="password" id="inpPassword" placeholder="Enter Password..." name="password" value={formInp.password} onChange={handleFormInp} />

            <br />

            <button className={buttonStyle.button} onClick={handleLogin}>
              Knock Knock!
            </button>

            <Button message={"Don't have a room? Register yourself!"} route={"/signup"} />

          </div>

          <div className={styles.containerRight}>
            <img src="/images/login.png" alt="login" className={styles.containerRightImg} />
          </div>

        </div>
      </div>
    </UserLayout>
  );
}
