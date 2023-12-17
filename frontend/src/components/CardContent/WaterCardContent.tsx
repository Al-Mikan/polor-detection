import React, { useState } from "react";
import { WaterProps } from "../type";
import Modal from "../Modals/WaterModal";

type WaterCardContentProps = {
  water: WaterProps;
  fetchData: () => void;
};

const WaterCardContent = ({ water, fetchData }: WaterCardContentProps) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div>
      <p>{water.value}</p>
      <Modal
          title={"飲水量"}
          content={water}
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
export default WaterCardContent;

