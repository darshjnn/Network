import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import { getConnectionReq } from '@/config/redux/action/authAction/getConnectionReq';

import UserLayout from '@/layouts/UserLayout';
import PanelLayout from '@/layouts/PanelLayout';
import UserCard from '../../../components/UserCard';

import styles from "./style.module.css";

export default function index() {
  const authState = useSelector((state) => state.auth);

  const route = useRouter();
  const dispatch = useDispatch();

  const [error, setError] = useState();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      route.push("/");
    }
  }, []);

  useEffect(() => {
    try {
      dispatch(getConnectionReq());

    } catch (error) {
      console.error(error);
      setError(error);
    }
  }, []);

  return (
    <UserLayout>

      <title>
        Requests | Network
      </title>

      <PanelLayout>

        <div className={styles.requestsContainer}>
          {
            (authState.connectionRequest) && (authState.connectionRequest.length > 0 ?
              <>
                {
                  authState.connectionRequest.map((c) => {
                    return (
                      <UserCard key={c._id} connection={c} userDetails={c.userId} />
                    );
                  })
                }
              </>
              :
              <h3>No Connection Requests...</h3>

            )
          }
        </div>

      </PanelLayout>

    </UserLayout>
  );
}
