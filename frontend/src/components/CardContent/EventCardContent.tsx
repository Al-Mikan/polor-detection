import React, { useState } from "react";
import { EventProps } from "../type";
import Modal from "../Modals/EventModal";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
type EventCardContentProps = {
  events: EventProps[];
  fetchData: () => void;
};

const EventCardContent = ({ events, fetchData }: EventCardContentProps) => {
  const [editModalOpenIndex, setEditModalOpenIndex] = useState(-1);
  return (
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableBody>
              {events.map((content, index) => (
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
                          {content.event}
                        </TableCell>
                      </TableRow>
                      <Modal
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
export default EventCardContent;

