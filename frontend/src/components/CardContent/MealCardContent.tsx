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
import { MealProps } from "../type";
import MealModal from "../Modals/MealModal";

type MealCardContentProps = {
  meals: MealProps[];
  fetchData: () => void;
};

const MealCardContent = ({ meals, fetchData }: MealCardContentProps) => {
  const mealHead = ["時刻", "食べ物", "重さ(g)"];
  const [editModalOpenIndex, setEditModalOpenIndex] = useState(-1);
  return (
    <TableContainer component={Paper} variant="outlined">
      <Table aria-label="simple table">
        <TableHead>
          <TableRow sx={{ backgroundColor: "#F5F4F7" }}>
            {mealHead.map((head, index) => {
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
          {meals.map((content, index) => (
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
                  {content.meal}
                </TableCell>
                <TableCell component="th" scope="row" width={"200px"}>
                  {content.weight}
                </TableCell>
              </TableRow>
              <MealModal
                title={"食事"}
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
export default MealCardContent;
