import React, { useRef } from 'react';

import styles from "./style.module.css";

export default function index({ name, id, value, onChange, placeholder }) {
    const textareaRef = useRef(null);

    const handleInput = (e) => {
        const textarea = textareaRef.current;

        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = textarea.scrollHeight + 'px';
        }

        onChange && onChange(e); // Call parent onChange
    }

    return (
        <textarea ref={textareaRef} name={name} id={id} className={styles.textarea} placeholder={placeholder} value={value} onInput={handleInput} onChange={onChange} />
    );
}
