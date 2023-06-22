import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import EditModal from "./EditModal";
import { useState } from "react";
import { MealProps, temperatureProps } from "./type";
import { FaThermometerHalf, FaUtensils } from "react-icons/fa";

type RecordCardProps = {
  title: string;
  rows: (MealProps | temperatureProps)[];
  heads: string[];
};

const RecordCard = ({ title, rows, heads }: RecordCardProps) => {
  let rowsArray: (number | string)[][] = [];
  for (const row of rows) {
    rowsArray.push(Object.values(row));
  }
  const [isEditModalOpenIndex, setEditModalOpenIndex] = useState(-1);

  return (
    <div className="bg-white px-8 py-8 rounded-lg h-fit">
      <p className="text-xl  text-gray-700 font-bold mb-2 flex items-center">
        {title === "気温" ? <FaThermometerHalf /> : <FaUtensils />}
        {title}
      </p>
      <TableContainer component={Paper} variant="outlined">
        <Table aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#F5F4F7" }}>
              {heads.map((head, index) => {
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
            {rowsArray.map((rowsContent, index) => (
              <>
                <TableRow
                  hover
                  key={index}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setEditModalOpenIndex(index);
                  }}
                >
                  {rowsContent.map((row, i) => (
                    <TableCell
                      component="th"
                      scope="row"
                      key={i}
                      align={i == 0 ? "left" : "right"}
                    >
                      {row}
                    </TableCell>
                  ))}
                </TableRow>
                <EditModal
                  title={title}
                  content={rows[index]}
                  open={isEditModalOpenIndex === index}
                  handleClose={() => {
                    setEditModalOpenIndex(-1);
                  }}
                />
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default RecordCard;
