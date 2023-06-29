import { Card, CardActionArea } from "@mui/material";
import { useState } from "react";
import EditModal from "../EditModal";
import { eventProps, enrichmentProps } from "../type";
import { FaLeaf, FaCalendarDay } from "react-icons/fa";
type RecordCardProps = {
  title: string;
  content: eventProps[] | enrichmentProps[];
};
import React from "react";

const EventCard = ({ title, content }: RecordCardProps) => {
  const [isEditModalOpenIndex, setEditModalOpenIndex] = useState(-1);
  return (
    <div className="bg-white px-8 py-8 rounded-lg h-fit">
      <p className=" text-xl  text-gray-700 font-bold mb-2 flex items-center">
        {title === "エンリッチメント" ? <FaLeaf /> : <FaCalendarDay />}
        {title}
      </p>
      <div className="flex flex-col space-y-2">
        {content.map((el, i) => (
          <React.Fragment key={i}>
            {"enrichment" in el ? (
              <>
                {el.enrichment === "" ? (
                  <p style={{ width: "200px" }} key={i}>
                    登録なし
                  </p>
                ) : (
                  <Card variant="outlined" key={i}>
                    <CardActionArea
                      sx={{
                        minWidth: "200px",
                        minHeight: "80px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "20px",
                      }}
                      onClick={() => {
                        setEditModalOpenIndex(i);
                      }}
                    >
                      <p className="text-gray-700">{el.enrichment}</p>
                    </CardActionArea>
                  </Card>
                )}
              </>
            ) : (
              <>
                {el.event === "" ? (
                  <p className="w-[200px] flex justify-center" key={i}>
                    登録なし
                  </p>
                ) : (
                  <Card variant="outlined" key={i}>
                    <CardActionArea
                      sx={{
                        minWidth: "200px",
                        minHeight: "80px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "20px",
                      }}
                      onClick={() => {
                        setEditModalOpenIndex(i);
                      }}
                    >
                      <p className="text-gray-700">{el.event}</p>
                    </CardActionArea>
                  </Card>
                )}
              </>
            )}

            <EditModal
              title={title}
              content={el}
              open={isEditModalOpenIndex === i}
              handleClose={() => {
                setEditModalOpenIndex(-1);
              }}
            />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
export default EventCard;
