import React, { useState } from "react";
import { WakeUpTimeProps } from "../type";
import Modal from "../Modals/WakeUpTimeModal";

type WakeUpTimeCardContentProps = {
  wakeUpTime: WakeUpTimeProps;
  fetchData: () => void;
};

const WakeUpTimeCardContent = ({ wakeUpTime, fetchData }: WakeUpTimeCardContentProps) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div>
      <p> {wakeUpTime.time}</p>
      <Modal
          title={"起床時間"}
          content={wakeUpTime}
          open={openModal}
                handleClose={() => {
                  setOpenModal(false);
                }}
                isEdit={true}
                fetchData={fetchData}
        />
    </div>
  );
};
export default WakeUpTimeCardContent;

