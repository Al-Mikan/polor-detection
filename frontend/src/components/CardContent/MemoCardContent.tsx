import React, { useState } from "react";
import { MemoProps } from "../type";
import Modal from "../Modals/MemoModal";

type MemoCardContentProps = {
  memo: MemoProps[];
  fetchData: () => void;
};

const MemoCardContent = ({ memo, fetchData }: MemoCardContentProps) => {
  const [openModal, setOpenModal] = useState(false);

  // メモが存在するかどうかを確認し、条件に応じて適切な値を設定
  const hasMemos = memo.length > 0;
  const memoContent = hasMemos ? memo[0].memo : "";

  return (
    <div>
      <button onClick={() => setOpenModal(true)}>
        <p>{memoContent}</p>
      </button>

      {hasMemos && (
        <Modal
          content={memo[0]}
          open={openModal}
          handleClose={() => setOpenModal(false)}
          isEdit={true}
          fetchData={fetchData}
        />
      )}
    </div>
  );
};

export default MemoCardContent;
