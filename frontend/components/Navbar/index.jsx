import React from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { logout } from '@/config/redux/action/authAction/logout';

import styles from "./styles.module.css";

import UserImage from '../UserImage';
import ActionBtn from '../Buttons/ActionBtn';
import InteractBtn from '../Buttons/InteractBtn';

import LogoSVG from "@/svg/logo.svg";
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
      console.log(error);
    }
  }

  return (
    <div className={styles.navContainer}>

      {
        !(authState.userFetched) &&
        <nav className={styles.noUser}>
          <div className={styles.navbarLeft}>
            <div onClick={() => { router.push("/") }} className={styles.routeHome}>
              <LogoSVG />
              <span className={styles.logoText}>Network</span>
            </div>
          </div>

          <div className={styles.navbarRight}>
            <Link href={"/signup"}>
              <ActionBtn message={"Sign Up!"} />
            </Link>

            <Link href={"/login"}>
              <ActionBtn message={"Log In"} />
            </Link>
          </div>
        </nav>
      }

      {
        (authState.userFetched) &&
        <nav className={styles.validUser}>
          <div className={styles.navbarLeft}>
            <div onClick={() => { router.push("/feed") }} className={styles.routeHome}>
              <LogoSVG />
              <span className={styles.logoText}>Network</span></div>
          </div>

          <div className={styles.navbarMiddle}>
            <Link href={"/feed"}>
              <InteractBtn message={"Home"} svg={<HomeSVG />} />
            </Link>

            <Link href={"/connections"}>
              <InteractBtn message={"Connections"} svg={<ConnectionSVG />} />
            </Link>

            <Link href={"/discover"}>
              <InteractBtn message={"Discover"} svg={<SearchSVG />} />
            </Link>

            <Link href={`/user/${authState.user.username}`}>
              <InteractBtn message={"My Profile"} svg={<ConfigureSVG />} />
            </Link>

            <Link href={"/post"}>
              <InteractBtn message={"Create Post"} svg={<AddSVG />} />
            </Link>
          </div>

          <div className={styles.navbarRight}>

            <Link href={`/user/${authState.user.username}`}>
              <div className={styles.userImgDiv}>
                <UserImage src={`${BASE_URL}/uploads/profile_pictures/${authState.user.profilePicture}`} />
              </div>
            </Link>

            <div className={styles.logoutBtn} onClick={handleLogout}>
              <ActionBtn message={`Log out`} />
            </div>

          </div>
        </nav>
      }

    </div>
  );
}
