import UserLayout from "@/layouts/UserLayout";

import Button from "../../components/Buttons/ActionBtn";

import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <UserLayout>

      <div className={styles.body}>
        <main className={styles.mainContainer}>

          <div className={styles.mainContainerLeft}>
            <p>Make Friends Without Exaggeration...</p>

            <p>A true social platform with no bluffs!</p>

            <div className={styles.buttonActions}>
              <Button message={"Create a room for Yourself by Registering!"} route="/signup" />

              <Button message={"Knock the door to Log in..."} route="/login" />
            </div>
          </div>

          <div className={styles.mainContainerRight}>
            <img src="images/home_main.png" alt="connect with people" className={styles.mainContainerRightImg} />
          </div>

        </main>
      </div>
    </UserLayout>
  );
}
