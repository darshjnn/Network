import React from 'react';

import UserLayout from '@/layouts/UserLayout';

import styles from "./style.module.css";

export default function index() {
    return (
        <UserLayout>
            <title>
                Profile | Network
            </title>

            <p>My Profile</p>

        </UserLayout>
    );
}
