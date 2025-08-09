import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { sendConnectionReq } from '@/config/redux/action/authAction/sendConnectionReq';
import { manageConnectionReq } from '@/config/redux/action/authAction/manageConnectionReq';

import Link from 'next/link';

import styles from "./style.module.css";

import ActionBtn from '../Buttons/ActionBtn';
import TextSuccess from '../TextSuccess';
import TextDanger from '../TextDanger';

import { BASE_URL } from '@/config';

export default function UserCard({ userDetails, connection }) {
  const authState = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [connectionStatus, setConnectionStatus] = useState();
  const [connectionDetails, setConnectionDetails] = useState();

  useEffect(() => {
    if (connection) {
      setConnectionDetails(connection);
      if (connection.status) {
        setConnectionStatus("Remove Connection");
      } else {
        setConnectionStatus("Accept Request")
      }
    } else {
      setConnectionStatus("Connect");
    }
  }, [connection]);

  const manageConnection = async (userId) => {
    try {
      if (connectionStatus === "Connect") {
        const request = await dispatch(sendConnectionReq({ userId: userId })).unwrap();
        setConnectionStatus("Request Sent");
        setSuccess("Request Sent...");
        setConnectionDetails(request.request);

      } else if (connectionStatus === "Request Sent" && connectionDetails) {
        await dispatch(manageConnectionReq({
          requestId: connectionDetails._id,
          action: "delete"
        })).unwrap();

        setConnectionStatus("Connect");
        setSuccess("Request Deleted...");

      } else if (connectionStatus === "Accept Request" && connectionDetails) {
        await dispatch(manageConnectionReq({
          requestId: connectionDetails._id,
          action: "accept"
        })).unwrap();

        setConnectionDetails(prev => ({ ...prev, status: true }));
        setConnectionStatus("Remove Connection");
        setSuccess("Request Accepted...");

      } else if (connectionStatus === "Remove Connection" && connectionDetails) {
        await dispatch(manageConnectionReq({
          requestId: connectionDetails._id,
          action: "delete"
        })).unwrap();

        setConnectionStatus("Connect");
        setSuccess("Connection removed...");
      }

    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  }

  const handleRejectReq = async () => {
    try {
      await dispatch(manageConnectionReq({
        requestId: connectionDetails._id,
        action: "reject"
      })).unwrap();

      setConnectionDetails();
      setConnectionStatus("Connect");
      setSuccess("Request rejected...");

    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  }

  return (
    <div className={styles.userCardContainer}>
      {error && <TextDanger onClose={() => setError()} message={error} />}

      {success && <TextSuccess onClose={() => setSuccess()} message={success} />}

      <div>
        <div className={styles.userImageContainer}>
          <img src={`${BASE_URL}/uploads/profile_pictures/${userDetails.profilePicture}`} alt="user" />
        </div>

        <div className={styles.userInfoContainer}>
          <Link href={`user/${userDetails.username}`}>
            <div className={styles.userInfo}>
              <span><b>{userDetails.name}</b></span>
              <span>@{userDetails.username}</span>
            </div>
          </Link>
        </div>
      </div>

      <div className={styles.actionButtonContainer}>
        <div onClick={() => manageConnection(userDetails._id)}>
          {
            (connectionDetails && connectionDetails.status) ?
              <ActionBtn message={connectionStatus} />
              :
              <ActionBtn message={connectionStatus} />
          }
        </div>

        {
          (connectionDetails && !connectionDetails.status &&
            connectionDetails.userId._id === userDetails._id) &&
          <div onClick={handleRejectReq}>
            <ActionBtn message={"Reject Request"} />
          </div>
        }
      </div>

    </div>
  );
}
