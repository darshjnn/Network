import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import UserLayout from '@/layouts/UserLayout';

import styles from "./style.module.css";

export default function index() {
    const route = useRouter();

    useEffect(() => {
        if (!localStorage.getItem("token")) {
          route.push("/");
        }
      }, []);

    return (
        <UserLayout>
            <title>
                Profile | Network
            </title>

            <p>My Profile</p>

        </UserLayout>
    );
}
