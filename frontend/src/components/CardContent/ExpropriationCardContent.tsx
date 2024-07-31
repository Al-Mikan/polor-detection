import React, { useState } from "react";
import { ExpropriationProps } from "../type";
import Modal from "../Modals/ExpropriationModal";
import { Button } from "@mui/material";

type ExpropriationCardContentProps = {
  expropriation: ExpropriationProps[];
  fetchData: () => void;
};

const ExpropriationCardContent = ({
  expropriation,
  fetchData,
}: ExpropriationCardContentProps) => {
  const [openModal, setOpenModal] = useState(false);
  const hasContent = expropriation.length > 0;
  const content = hasContent ? expropriation[0].expropriation : "";
  return (
    <div>
      <Button onClick={() => setOpenModal(true)}>
        <p>{content || content === 0 ? content : "0"}</p>
      </Button>
      {hasContent && (
        <Modal
          content={expropriation[0]}
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
export default ExpropriationCardContent;
