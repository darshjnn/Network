import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import styles from "./style.module.css";

import UserLayout from '@/layouts/UserLayout';
import PanelLayout from '@/layouts/PanelLayout';

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
                Discover | Network
            </title>

            <PanelLayout>

                <p>Discover</p>
                
            </PanelLayout>

        </UserLayout>
    )
}
