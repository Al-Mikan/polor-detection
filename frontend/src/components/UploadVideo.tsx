import * as React from "react";

import { FaClock } from "react-icons/fa";
import { Button, Modal, Box } from "@mui/material";

type UploadVideoProps = {
  video_path?: string;
  open: boolean;
  handleClose: () => void;
  title: string;
};

const VideoModal = ({
  video_path,
  open,
  handleClose,
  title,
}: UploadVideoProps) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <div className="w-2/3 bg-white p-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg">
        <p className="text-2xl flex items-center justify-center p-2 font-semibold">
          <FaClock />　{title}
        </p>
        {video_path === "" ? (
          <p>動画が存在しません</p>
        ) : (
          <video controls className="w-full">
            <source src={video_path} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    </Modal>
  );
};

export default VideoModal;
