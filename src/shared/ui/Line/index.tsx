import React, { FC } from "react";
import style from "./style.module.css";

export const Line: FC<any> = ({ coordinates }) => {
  return (
    <svg className={style.arrow} width="100%" height="100%">
      <line
        className={`fromId${coordinates.fromId} toId${coordinates.toId} `}
        x1={200}
        y1={coordinates.y1}
        x2={400}
        y2={coordinates.y2}
        stroke="rgb(81, 192, 209)"
        strokeWidth={2}
      />
    </svg>
  );
};
