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
import { TemperatureProps } from "../type";
import TemperatureModal from "../Modals/TemperatureModal";

type TemperatureCardContentProps = {
  temperature: TemperatureProps[];
  fetchData: () => void;
};

const TemperatureCardContent = ({
  temperature,
  fetchData,
}: TemperatureCardContentProps) => {
  const temperatureHead = ["時刻", "気温(℃)"];
  const [editModalOpenIndex, setEditModalOpenIndex] = useState(-1);
  return (
    <TableContainer component={Paper} variant="outlined">
      <Table aria-label="simple table">
        <TableHead>
          <TableRow sx={{ backgroundColor: "#F5F4F7" }}>
            {temperatureHead.map((head, index) => {
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
          {temperature.map((content, index) => (
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
                  {content.time}
                </TableCell>
                <TableCell component="th" scope="row" width={"200px"}>
                  {content.temperature}
                </TableCell>
              </TableRow>
              <TemperatureModal
                title={"気温"}
                content={content}
                open={editModalOpenIndex === index}
                handleClose={() => {
                  setEditModalOpenIndex(-1);
                }}
                isEdit={true}
                fetchData={fetchData}
              />
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default TemperatureCardContent;
