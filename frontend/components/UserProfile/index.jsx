import React from 'react';

import styles from "./style.module.css";

export default function UserProfile({ userProfile }) {
  return (
    <div className={styles.userDetailsBody}>
      <div className={styles.userAboutContainer}>

        {
          userProfile.bio.length > 0 &&
          <div className={styles.userBio}>
            <h3>About</h3>
            <ul><li><p>{userProfile.bio}</p></li></ul>
          </div>
        }

        {
          userProfile.currentPost.length > 0 &&
          <div className={styles.userCurrentPost}>
            <h3>Currently working as</h3>
            <ul><li><p>{userProfile.currentPost}</p></li></ul>
          </div>
        }
      </div>

      {
        userProfile.education.length > 0 &&
        <div className={styles.userEducation}>
          <h3>Education</h3>
          <ul>
            {
              userProfile.education.map(e => {
                return (
                  <li key={e._id}>
                    <span><b>From:&nbsp;</b>{e.school}</span><br />
                    <span><b>Degree:&nbsp;</b>{e.degree}</span><br />
                    <span><b>Field:&nbsp;</b>{e.field}</span>
                  </li>
                );
              })
            }
          </ul>
        </div>
      }

      {
        userProfile.experience.length > 0 &&
        <div className={styles.userExperience}>
          <h3>Experience</h3>
          <ul>
            {
              userProfile.experience.map(e => {
                return (
                  <li key={e._id}>
                    <span><b>Company:&nbsp;</b>{e.company}</span><br />
                    <span><b>Position:&nbsp;</b>{e.position}</span><br />
                    <span><b>Duration:&nbsp;</b>{e.duration}</span>
                  </li>
                );
              })
            }
          </ul>
        </div>
      }

    </div>
  )
}
