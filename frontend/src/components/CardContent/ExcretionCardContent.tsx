import React, { useState } from "react";
import { ExcretionProps } from "../type"; // 仮定のインポートパス
import Modal from "../Modals/ExcretionModel"; // モーダルのインポートパスを仮定
import { Button } from "@mui/material";

type ExcretionCardContentProps = {
  excretion: ExcretionProps[];
  fetchData: () => void;
};

const ExcretionCardContent = ({
  excretion,
  fetchData,
}: ExcretionCardContentProps) => {
  const [openModal, setOpenModal] = useState(false);

  // 排泄データが存在するかどうかを確認
  const hasExcretions = excretion.length > 0;
  const excretionNumber = hasExcretions ? excretion[0].number : "";
  const excretionStatus = hasExcretions ? excretion[0].status : ""; // 最初の排泄データを取得、またはnull
  // 最初の排泄データを取得、またはnull

  return (
    <div>
      <Button onClick={() => setOpenModal(true)}>
        <p>{excretionNumber}</p>
        <p>{excretionStatus}</p>
      </Button>
      {hasExcretions && (
        <Modal
          content={excretion[0]} // モーダルに排泄データまたはnullを渡す
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

export default ExcretionCardContent;
