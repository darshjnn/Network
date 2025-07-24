import React, { useEffect, useState } from 'react';

import styles from "./style.module.css";

import CloseSVG from "@/svg/close.svg";

export default function TextDanger({ message }) {
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    if (message) {
      setShowText(true);
    }
  }, [message]);

  const handleCloseText = () => {
    setShowText(false);
  }

  return (
    <>
      {
        showText &&
        < div className={styles.textWrapper} >
          <p className={styles.text}>{message}</p>

          {
            <button type="button" className={styles.closeButton} onClick={handleCloseText}>

              <CloseSVG />
            </button>
          }
        </div >
      }
    </>
  );
}
