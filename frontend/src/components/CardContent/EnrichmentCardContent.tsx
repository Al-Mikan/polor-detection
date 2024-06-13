import React, { useState } from "react";
import { EnrichmentProps } from "../type";
import Modal from "../Modals/EnrichmentModal";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
type EnrichmentCardContentProps = {
  enrichments: EnrichmentProps[];
  fetchData: () => void;
};

const EnrichmentCardContent = ({ enrichments, fetchData }: EnrichmentCardContentProps) => {
  const [editModalOpenIndex, setEditModalOpenIndex] = useState(-1);
  return (
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableBody>
              {enrichments.map((content, index) => (
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
                          {content.enrichment}
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
export default EnrichmentCardContent;

