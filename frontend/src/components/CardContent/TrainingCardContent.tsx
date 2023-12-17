import React, { useState } from "react";
import { TrainingProps } from "../type";
import Modal from "../Modals/TrainingModal";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
type TrainingCardContentProps = {
  trainings: TrainingProps[];
  fetchData: () => void;
};

const TrainingCardContent = ({ trainings, fetchData }: TrainingCardContentProps) => {
  const [editModalOpenIndex, setEditModalOpenIndex] = useState(-1);
  return (
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableBody>
              {trainings.map((content, index) => (
                    <div key={index}>
                  <TableRow
                        hover
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setEditModalOpenIndex(index);
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {content.training}
                        </TableCell>
                      </TableRow>
                      <Modal
                        title={"トレーニング"}
                        content={content}
                        open={editModalOpenIndex === index}
                        handleClose={() => {
                          setEditModalOpenIndex(-1);
                        }}
                        isEdit={true}
                        fetchData={fetchData}
                  />
                  </div>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
  );
};
export default TrainingCardContent;

