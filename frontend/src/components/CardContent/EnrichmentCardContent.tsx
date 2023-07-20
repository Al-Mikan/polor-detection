import React, { useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { EnrichmentProps } from "../type";
import EnrichmentModal from "../Modals/EnrichmentModal";

type EnrichmentCardContentProps = {
  enrichments: EnrichmentProps[];
};

const EnrichmentCardContent = ({ enrichments }: EnrichmentCardContentProps) => {
  const enrichmentHead = ["開始時刻", "終了時刻", "内容"];
  const [editModalOpenIndex, setEditModalOpenIndex] = useState(-1);
  return (
    <TableContainer component={Paper} variant="outlined">
      <Table aria-label="simple table">
        <TableHead>
          <TableRow sx={{ backgroundColor: "#F5F4F7" }}>
            {enrichmentHead.map((head, index) => {
              return (
                <TableCell
                  align={index == 0 ? "left" : "right"}
                  key={index}
                  sx={{ width: "100px" }}
                >
                  {head}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {enrichments.map((content, index) => (
            <React.Fragment key={index}>
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
                <TableCell component="th" scope="row" width={"200px"}>
                  {content.startTime}
                </TableCell>
                <TableCell component="th" scope="row" width={"200px"}>
                  {content.endTime}
                </TableCell>
                <TableCell component="th" scope="row" width={"200px"}>
                  {content.enrichment}
                </TableCell>
              </TableRow>
              <EnrichmentModal
                title={"エンリッチメント"}
                content={content}
                open={editModalOpenIndex === index}
                handleClose={() => {
                  setEditModalOpenIndex(-1);
                }}
                isEdit={true}
              />
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default EnrichmentCardContent;
