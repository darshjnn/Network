import React from 'react';

import InteractBtn from '../Buttons/InteractBtn';

import styles from "./style.module.css";

import CloseSVG from "@/svg/close.svg"

export default function Popup({ children, isOpen, onClose }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.overlay}>

      <div className={styles.popup}>

        <div className={styles.closePopupButton} onClick={onClose}>
          <InteractBtn message={"Close"} svg={<CloseSVG />} />
        </div>

        {children}

      </div>

    </div>
  );
}
