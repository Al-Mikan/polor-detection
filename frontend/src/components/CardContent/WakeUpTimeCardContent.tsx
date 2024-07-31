import React, { useState } from "react";
import { WakeUpTimeProps } from "../type";
import Modal from "../Modals/WakeUpTimeModal";
import { Button } from "@mui/material";

type WakeUpTimeCardContentProps = {
  wakeUpTime: WakeUpTimeProps[];
  fetchData: () => void;
};

const WakeUpTimeCardContent = ({
  wakeUpTime,
  fetchData,
}: WakeUpTimeCardContentProps) => {
  const [openModal, setOpenModal] = useState(false);

  const hasContent = wakeUpTime.length > 0;
  const content = hasContent ? wakeUpTime[0].time.slice(0, 5) : "";
  return (
    <div>
      <Button onClick={() => setOpenModal(true)}>
        <p>{content}</p>
      </Button>
      {hasContent && (
        <Modal
          content={wakeUpTime[0]}
          open={openModal}
          handleClose={() => {
            setOpenModal(false);
          }}
          isEdit={true}
          fetchData={fetchData}
        />
      )}
    </div>
  );
};
export default WakeUpTimeCardContent;
