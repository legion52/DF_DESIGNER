import React, { FC, useState } from "react";
import style from "./style.module.css";

export const Select: FC<any> = ({ data, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div onClick={() => setIsOpen((prev) => !prev)} className={style.select}>
        {value || value === 0 ? `graph ${value}` : "Выберите"}
      </div>
      {isOpen && (
        <div className={style.ul}>
          {data?.map((el: any) => (
            <div
              key={el}
              onClick={() => {
                onChange(el);
                setIsOpen(false);
              }}
              className={`${style.li} ${value === el ? style.active : ""}`}
            >{`graph ${el}`}</div>
          ))}
        </div>
      )}
    </div>
  );
};
