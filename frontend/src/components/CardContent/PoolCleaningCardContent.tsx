import React, { useState } from "react";
import { PoolCleaningProps } from "../type";
import Modal from "../Modals/PoolCleaningModal";

type PoolCleaningCardContentProps = {
  poolCleaning: PoolCleaningProps;
  fetchData: () => void;
};

const PoolCleaningCardContent = ({ poolCleaning, fetchData }: PoolCleaningCardContentProps) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div>
      <p>{poolCleaning.poolCleaning}</p>
      <Modal
          content={poolCleaning}
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
export default PoolCleaningCardContent;

