/**
 * React component used to synchronize the state between
 * React Server Components (RSC) and React client-side state
 * using Zustand. This component does not render any UI
 * and returns `null`.
 *
 * The primary purpose of this component is to act as a
 * bridge for state management, ensuring that the state
 * remains consistent across the server and client.
 */

"use client";

import React from "react";
import { useRoomActions, Room } from "@/utils/store/room-store";
import toast from "react-hot-toast";

interface StateSyncProps {
  serverState: Room[];
  errorMessage: unknown;
}

/**
 * Synchronize the state between the server and client.
 *
 * @param {Room[]} serverState The state received from the server.
 */

const StateSync: React.FC<StateSyncProps> = ({ serverState, errorMessage }) => {
  const { addRooms } = useRoomActions();

  React.useEffect(() => {
    const syncState = async () => {
      addRooms(serverState);
    };

    syncState();
  }, [addRooms]);

  if (errorMessage) {
    toast.error("Failed to get rooms");
  }

  return null;
};

export { StateSync };
