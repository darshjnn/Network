import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import { acceptedConnections } from '@/config/redux/action/authAction/acceptedConnections';

import UserLayout from '@/layouts/UserLayout';
import PanelLayout from '@/layouts/PanelLayout';
import UserCard from '../../../components/UserCard';

import styles from "./style.module.css";

import ActionBtn from '../../../components/Buttons/ActionBtn';

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
      dispatch(acceptedConnections());

    } catch (error) {
      console.error(error);
      setError(error);
    }
  }, []);

  return (
    <UserLayout>

      <title>
        Connections | Network
      </title>

      <PanelLayout>

        <div className={styles.connectionsBody}>

          <div className={styles.connectionReq}>
            <Link href={"/requests"}>
              <ActionBtn message={"Manage Requests"} />
            </Link>
          </div>

          <div className={styles.connectionsContainer}>
            {
              (authState.connections) && (authState.connections.length > 0 ?
                <>
                  {
                    authState.connections.map((c) => {
                      if (c.connectionId._id === authState.user._id) {
                        return (
                          <UserCard key={c._id} connection={c} userDetails={c.userId} />
                        );
                      } else {
                        return (
                          <UserCard key={c._id} connection={c} userDetails={c.connectionId} />
                        );
                      }
                    })
                  }
                </>
                :
                <h3>No Connections to show...</h3>

              )
            }
          </div>

        </div>

      </PanelLayout>

    </UserLayout>
  );
}
