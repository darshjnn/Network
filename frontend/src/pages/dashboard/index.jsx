import React, { useEffect } from 'react';

import styles from "./style.module.css";

import { useRouter } from 'next/router';

export default function index() {
    const route = useRouter()

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            route.push("/login");
        }
    })

    return (
        <div>index</div>
    );
}
