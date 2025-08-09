import React, { useEffect, useState } from 'react';

import styles from "./style.module.css";

import CloseSVG from "@/svg/close.svg";

export default function TextSuccess({ message, onClose }) {
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    if (message) {
      setShowText(true);
      const timer = setTimeout(() => {
        setShowText(false);
        if (onClose) {
          onClose();
        }
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  const handleCloseText = () => {
    setShowText(false);
    if (onClose) {
      onClose();
    }
  }

  return (
    <>
      {
        showText &&
        < div className={styles.textWrapper} >
          <span className={styles.text}>{message}</span>

          <button type="button" className={styles.closeButton} onClick={handleCloseText}>
            <CloseSVG />
          </button>

        </div >
      }
    </>
  );
}
