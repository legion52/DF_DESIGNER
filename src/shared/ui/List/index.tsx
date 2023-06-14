import React, { FC, useEffect, useRef, useState } from "react";
interface IList {
    listData:any
}
export const List:FC<IList> = ({listData}) => {
    const [list, setList] = useState(listData);
  const [draggingItem, setDraggingItem] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e:any, index:any) => {
    e.dataTransfer.setData("text/plain", index);
    setDraggingItem(list[index]);
    setTimeout(() => {
      setIsDragging(true);
    }, 10);
  };

  const ref = useRef<any>();

useEffect(() => {
  const rect = ref.current.getBoundingClientRect();
  console.log(rect);
  
});

  const handleDragOver = (e:any, index:any) => {
    e.preventDefault();
  };

  const handleDrop = (e:any, index:any) => {
    const sourceIndex = e.dataTransfer.getData("text/plain");
    const newList = [...list];
    const [removed] = newList.splice(sourceIndex, 1);
    newList.splice(index, 0, removed);
    setList(newList);
    setDraggingItem(null);
    setIsDragging(false);
  };

  return (
    <div className="list">
      {list.map((item:any, index:any) => (
        <div
          key={item.id}
          ref={ref}
          className={`list-item ${
            item === draggingItem && isDragging ? "dragging hovered" : ""
          }`}
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDragEnd={() => {
            setIsDragging(false);
          }}
          onDrop={(e) => handleDrop(e, index)}
        >
          {item.text}
        </div>
      ))}
    </div>
  );
};
