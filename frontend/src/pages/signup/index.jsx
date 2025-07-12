import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import styles from "./style.module.css";
import buttonStyle from "../../../components/Buttons/ActionBtn/style.module.css";

import UserLayout from '@/layouts/UserLayout';

import ActionBtn from '../../../components/Buttons/ActionBtn';
import TextDanger from "../../../components/TextDanger";

import { loginUser, registerUser } from '@/config/redux/action/authAction';
import { clearMessage } from '@/config/redux/reducer/authReducer';

export default function SignUpComponent() {
  const authState = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  // Clear auth message on mount
  useEffect(() => {
    dispatch(clearMessage());
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

  // Handling Register
  const handleRegister = () => {
    dispatch(registerUser({
      name: formInp.inpName,
      username: formInp.inpUsername,
      email: formInp.inpEmail,
      password: formInp.password
    }));
  }

  // Handle Login after User is registered successfully
  useEffect(() => {
    if (authState.isSuccess || localStorage.getItem("token")) {
      dispatch(loginUser({
        email: formInp.inpEmail,
        password: formInp.password
      }));
    }
  }, [authState.isSuccess, formInp.inpEmail, formInp.inpUsername, formInp.password]);

  return (
    <UserLayout>

      <div className={styles.body}>
        <div className={styles.container}>

          <div className={styles.containerLeft}>
            <img src="/images/signup.png" alt="signup" className={styles.containerLeftImg} />
          </div>

          <div className={styles.containerRight}>
            {
              authState.message.message ?
                <TextDanger message={authState.message.message} />
                :
                <></>
            }

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

            <button className={buttonStyle.button} onClick={handleRegister}>
              Create your room!
            </button>

            <ActionBtn message={"Knock the door? Login!"} route={"/login"} />
          </div>

        </div>
      </div>
    </UserLayout>
  )
}
