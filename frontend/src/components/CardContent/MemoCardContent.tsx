import React, { useState } from "react";
import { MemoProps } from "../type";
import Modal from "../Modals/MemoModal";

type MemoCardContentProps = {
  memo: MemoProps;
  fetchData: () => void;
};

const MemoCardContent = ({ memo, fetchData }: MemoCardContentProps) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div>
      <p>{memo.memo}</p>
      <Modal
          title={"メモ"}
          content={memo}
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
export default MemoCardContent;

