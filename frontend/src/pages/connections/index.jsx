import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import { currentUser } from '@/config/redux/action/authAction/currentUser';

import UserLayout from '@/layouts/UserLayout';

export default function index() {
  const route = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      route.push("/");
    }
  }, []);

  return (
    <UserLayout>

      <title>
        Connections | Network
      </title>

      <div>
        <p>My Connections</p>
      </div>

    </UserLayout>
  )
}
