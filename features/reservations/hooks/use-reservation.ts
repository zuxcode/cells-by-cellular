import React from "react";
import { useReservationStore } from "../stores/reservation-store";

type HandleFiledFunc = (e: React.ChangeEvent<HTMLInputElement>) => void;

interface useReservationReturn {
  handleOnChangeFile: (props: React.ChangeEvent<HTMLInputElement>) => void;
}

function useReservation(): useReservationReturn {
  const { setFile, removeFile } = useReservationStore();

  const handleOnChangeFile = React.useCallback<HandleFiledFunc>(
    (e) => {
      removeFile();
      const file = e.target.files?.[0];
      if (file) setFile(file);
    },
    []
  );

  return { handleOnChangeFile };
}

export { useReservation };
