import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import styles from "./style.module.css";
import buttonStyle from "../../../components/Buttons/ActionBtn/style.module.css";

import UserLayout from '@/layouts/UserLayout';

import ActionBtn from '../../../components/Buttons/ActionBtn';
import TextDanger from "../../../components/TextDanger";

import { loginUser } from '@/config/redux/action/authAction/loginUser';
import { registerUser } from '@/config/redux/action/authAction/registerUser';
import { clearAuthMessage } from '@/config/redux/reducer/authReducer';

export default function SignUpComponent() {
  const authState = useSelector((state) => state.auth);
  const route = useRouter();
  const dispatch = useDispatch();

  // Clear auth message on mount
  useEffect(() => {
    dispatch(clearAuthMessage());
  }, []);

  // Handle Form Input
  let [formInp, setFormInp] = useState({
    inpName: '',
    inpUsername: '',
    inpEmail: '',
    password: ''
  });

  let handleFormInp = (event) => {
    let fieldName = event.target.name;
    let newVal = event.target.value;

    setFormInp((currData) => {
      return { ...currData, [fieldName]: newVal }
    });
  }

  const [error, setError] = useState();

  // Handling Register
  const handleRegister = () => {
    if (Object.values(formInp).some(value => value === "" || value === null || !value)) {
      setError("All fields are must!");
    } else {
      dispatch(registerUser({
        name: formInp.inpName,
        username: formInp.inpUsername,
        email: formInp.inpEmail,
        password: formInp.password
      }));
    }
  }

  // Handle Login after User is registered successfully
  useEffect(() => {
    if (authState.isSuccess || localStorage.getItem("token")) {
      dispatch(loginUser({
        email: formInp.inpEmail,
        password: formInp.password
      })).unwrap();

      route.push("/feed")
    }
  }, [authState.isSuccess, formInp.inpEmail, formInp.inpUsername, formInp.password]);

  return (
    <UserLayout>
      <title>
        Sign Up | Network
      </title>

      <div className={styles.body}>
        {error && <TextDanger onClose={() => setError()} message={error} />}

        {
          authState.message.message ?
            <TextDanger message={authState.message.message} />
            :
            <></>
        }

        <div className={styles.container}>

          <div className={styles.containerLeft}>
            <img src="/images/signup.png" alt="signup" className={styles.containerLeftImg} />
          </div>

          <div className={styles.containerRight}>

            <br />

            <label htmlFor="inpName">What is your Name? &nbsp;</label>
            <input type="text" id="inpName" placeholder="Enter Your Name..." name="inpName" value={formInp.inpName} onChange={handleFormInp} />

            <br />

            <label htmlFor="inpUsername">Choose your Username: &nbsp;</label>
            <input type="text" id="inpUsername" placeholder="Enter Username..." name="inpUsername" value={formInp.inpUsername} onChange={handleFormInp} />

            <br />

            <label htmlFor="inpEmail">Enter your Email Address: &nbsp;</label>
            <input type="text" id="inpEmail" placeholder="Enter Email..." name="inpEmail" value={formInp.inpEmail} onChange={handleFormInp} />

            <br />

            <label htmlFor="inpPassword">Create a Strong Password: &nbsp;</label>
            <input type="password" id="inpPassword" placeholder="Enter Password..." name="password" value={formInp.password} onChange={handleFormInp} />

            <br />

            <div>
              <button className={buttonStyle.button} onClick={handleRegister}>
                Create your room!
              </button>

              <Link href={"/login"}>
                <ActionBtn message={"Knock the door? Login!"} />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </UserLayout>
  )
}
