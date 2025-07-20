import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import UserLayout from '@/layouts/UserLayout';

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

            <p>Discover</p>

        </UserLayout>
    )
}
