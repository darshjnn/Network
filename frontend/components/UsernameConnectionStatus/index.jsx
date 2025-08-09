import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { sendConnectionReq } from '@/config/redux/action/authAction/sendConnectionReq';
import { manageConnectionReq } from '@/config/redux/action/authAction/manageConnectionReq';

import ActionBtn from '../Buttons/ActionBtn';
import TextSuccess from '../TextSuccess';
import TextDanger from '../TextDanger';

export default function UsernameConnectionStatus({ queryUserId }) {
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [connectionStatus, setConnectionStatus] = useState();
  const [connectionDetails, setConnectionDetails] = useState();

  useEffect(() => {
    if (authState.connections) {
      const connection = authState.connections.find(user => {
        return (user.connectionId._id === queryUserId || user.userId === queryUserId);
      });

      if (connection) {
        setConnectionDetails(connection);

        if (!connection.status) {
          if (connection.connectionId._id === queryUserId) {
            setConnectionStatus("Request Sent");

          } else if (connection.userId === queryUserId) {
            setConnectionStatus("Accept Request");
          }

        } else if (connection.userId === queryUserId ||
          connection.connectionId._id === queryUserId && connection.status) {
          setConnectionStatus("Remove Connection");

        }
      } else {
        setConnectionStatus("Connect");
      }

    }
  }, [authState.connections, queryUserId]);

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
    <>
      {error && <TextDanger onClose={() => setError()} message={error} />}

      {success && <TextSuccess onClose={() => setSuccess()} message={success} />}

      {
        (authState.user && (authState.user._id !== queryUserId)) &&
        <div onClick={() => manageConnection(queryUserId)}>
          <ActionBtn message={connectionStatus} />
        </div>
      }

      {
        (connectionDetails && !connectionDetails.status &&
          connectionDetails.userId === queryUserId) &&
        <div onClick={handleRejectReq}>
          <ActionBtn message={"Reject Request"} />
        </div>
      }
    </>
  );
}
