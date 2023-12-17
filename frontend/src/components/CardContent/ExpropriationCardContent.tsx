import React, { useState } from "react";
import { ExpropriationProps } from "../type";
import Modal from "../Modals/ExpropriationModal";

type ExpropriationCardContentProps = {
  expropriation: ExpropriationProps;
  fetchData: () => void;
};

const ExpropriationCardContent = ({ expropriation, fetchData }: ExpropriationCardContentProps) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div>
      <p>{expropriation.expropriation}</p>
      <Modal
          title={"収用回数"}
          content={expropriation}
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
export default ExpropriationCardContent;

