import React, { useEffect } from 'react';
import Link from 'next/link';

import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useRouter } from 'next/router';

import styles from "./style.module.css";
import buttonStyle from "../../../components/Buttons/ActionBtn/style.module.css";

import UserLayout from '@/layouts/UserLayout';

import ActionBtn from '../../../components/Buttons/ActionBtn';
import TextDanger from "../../../components/TextDanger";

import { clearAuthMessage } from '@/config/redux/reducer/authReducer';
import { loginUser } from '@/config/redux/action/authAction/loginUser';

export default function LogInComponent() {
  // Fetching authentication status of the user
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const route = useRouter();

  // Handle Form Input
  let [formInp, setFormInp] = useState({
    inpUser: '',
    password: ''
  });

  // Clear auth message on mount
  useEffect(() => {
    dispatch(clearAuthMessage());
  }, []);

  let handleFormInp = (event) => {
    let fieldName = event.target.name;
    let newVal = event.target.value;

    setFormInp((currData) => {
      return { ...currData, [fieldName]: newVal }
    });
  }

  const [error, setError] = useState();

  // Handling Login
  const handleLogin = async () => {
    try {
      if (Object.values(formInp).some(value => value === "" || value === null || !value)) {
        setError("All fields are must!");
      } else {
        await dispatch(loginUser({
          username: formInp.inpUser,
          email: formInp.inpUser,
          password: formInp.password
        })).unwrap();

        route.push("/feed");
      }

    } catch (error) {
      route.push("/login")
    }
  }

  return (
    <UserLayout>
      <title>
        Log In | Network
      </title>

      <div className={styles.body}>
        {error && <TextDanger onClose={() => setError()} message={error} />}

        {
          (authState.isError && authState.message.message) &&
          <TextDanger message={authState.message.message} />

        }

        <div className={styles.container}>

          <div className={styles.containerLeft}>
            <br />

            <label htmlFor="inpUser">Enter Username or Email: &nbsp;</label>
            <input type="text" id="inpUser" placeholder="Enter Username or Email..." name="inpUser" value={formInp.inpUser} onChange={handleFormInp} />

            <br />

            <label htmlFor="inpPassword">Enter Password: &nbsp;</label>
            <input type="password" id="inpPassword" placeholder="Enter Password..." name="password" value={formInp.password} onChange={handleFormInp} />

            <br />

            <div>
              <button className={buttonStyle.button} onClick={handleLogin}>
                Knock Knock!
              </button>

              <Link href={"/signup"}>
                <ActionBtn message={"Don't have a room? Register yourself!"} />
              </Link>
            </div>

          </div>

          <div className={styles.containerRight}>
            <img src="/images/login.png" alt="login" className={styles.containerRightImg} />
          </div>

        </div>
      </div>

    </UserLayout>
  );
}
