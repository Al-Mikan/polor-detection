import React, { useState } from "react";
import { WaterProps } from "../type";
import Modal from "../Modals/WaterModal";
import { Button } from "@mui/material";

type WaterCardContentProps = {
  water: WaterProps[];
  fetchData: () => void;
};

const WaterCardContent = ({ water, fetchData }: WaterCardContentProps) => {
  const [openModal, setOpenModal] = useState(false);
  const hasContent = water.length > 0;
  const content = hasContent ? water[0].value : "";

  return (
    <div>
      <Button onClick={() => setOpenModal(true)}>
        <p>{content}</p>
      </Button>
      {hasContent && (
        <Modal
          content={water[0]}
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
export default WaterCardContent;
