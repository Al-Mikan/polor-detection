import React, { useState } from "react";
import { ExcretionProps } from "../type";
import Modal from "../Modals/ExcretionModel";

type ExcretionCardContentProps = {
  excretion: ExcretionProps;
  fetchData: () => void;
};

const ExcretionCardContent = ({ excretion, fetchData }: ExcretionCardContentProps) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div>
      <p>{excretion.number}</p>
      <p>{excretion.status} </p>
      <Modal
          content={excretion}
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
export default ExcretionCardContent;

