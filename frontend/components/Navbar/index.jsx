import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { logout } from '@/config/redux/action/authAction/logout';

import styles from "./styles.module.css";

import ActionBtn from '../Buttons/ActionBtn';
import InteractBtn from '../Buttons/InteractBtn';

import LogoSVG from "@/svg/logo.svg"
import HomeSVG from "@/svg/home.svg";
import ConnectionSVG from "@/svg/connection.svg";
import SearchSVG from "@/svg/search.svg";
import ConfigureSVG from "@/svg/configure.svg";
import AddSVG from "@/svg/add.svg";

import { BASE_URL } from '@/config';

export default function Navbar() {
  const authState = useSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();

  // Log out
  const handleLogout = async () => {
    try {
      await dispatch(logout({ token: localStorage.getItem("token") })).unwrap();
      localStorage.removeItem("token");
      router.push("/");
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={styles.navContainer}>

      {!(authState.userFetched) &&
        <nav className={styles.noUser}>
          <div className={styles.navbarLeft}>
            <div onClick={() => { router.push("/") }} className={styles.routeHome}>
              <LogoSVG />
              <span className={styles.logoText}>Network</span>
            </div>
          </div>

          <div className={styles.navbarRight}>
            <ActionBtn message={"Sign Up!"} route="/signup" />

            <ActionBtn message={"Log In"} route="/login" />
          </div>
        </nav>
      }

      {(authState.userFetched) &&
        <nav className={styles.validUser}>
          <div className={styles.navbarLeft}>
            <div onClick={() => { router.push("/feed") }} className={styles.routeHome}>
              <LogoSVG />
              <span className={styles.logoText}>Network</span></div>
          </div>

          <div className={styles.navbarMiddle}>
            <InteractBtn message={"Home"} route={"/feed"} svg={<HomeSVG />} />

            <InteractBtn message={"Connections"} route={"/connections"} svg={<ConnectionSVG />} />

            <InteractBtn message={"Discover"} route={"/discover"} svg={<SearchSVG />} />

            <InteractBtn message={"My Profile"} route={"/profile"} svg={<ConfigureSVG />} />

            <InteractBtn message={"Create Post"} route={"/post"} svg={<AddSVG />} />

          </div>

          <div className={styles.navbarRight}>

            <div className={styles.userImgDiv} onClick={() => { router.push("/profile") }}>
              <img src={`${BASE_URL}/uploads/profile_pictures/${authState.user.profilePicture}`} alt="profile_pic" className={styles.userImg} />
            </div>

            <div className={styles.logoutBtn} onClick={handleLogout}>
              <ActionBtn message={`Log out`} />
            </div>

          </div>
        </nav>
      }

    </div>
  )
}
