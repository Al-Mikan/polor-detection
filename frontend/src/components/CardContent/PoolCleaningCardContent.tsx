import React, { useState } from "react";
import { PoolCleaningProps } from "../type";
import Modal from "../Modals/PoolCleaningModal";
import { Button } from "@mui/material";

type PoolCleaningCardContentProps = {
  poolCleaning: PoolCleaningProps[];
  fetchData: () => void;
};

const PoolCleaningCardContent = ({
  poolCleaning,
  fetchData,
}: PoolCleaningCardContentProps) => {
  const [openModal, setOpenModal] = useState(false);

  const hasContent = poolCleaning.length > 0;
  const content = hasContent ? poolCleaning[0].poolCleaning : "";

  return (
    <div className="bg-red-300 flex-grow-1 h-full">
      <Button onClick={() => setOpenModal(true)} className="w-full h-full">
        <p>{content === true ? "完了しました" : "未完了です"}</p>
      </Button>
      {hasContent && (
        <Modal
          content={poolCleaning[0]}
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
export default PoolCleaningCardContent;
