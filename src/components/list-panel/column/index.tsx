import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./style.module.css";
import { Graph } from "../../../models";
import { Line } from "../../../shared/ui/Line";
interface IColumn {
  list: Graph;
  col: any[];
  appRef: any;
}
export const ListPanel: React.FC<IColumn> = ({ list, col, appRef }) => {
  const [columns, setColumns] = useState<any>([]);
  const [edges, setEdges] = useState<any>([]);

  // let offsetX = 0;
  let offsetY = 0;
  const ref = useRef<any>(null);

  const move = useCallback((e: any) => {
    const el = ref.current.target;
    if (document.getElementsByClassName(`fromId${el.id}`).length) {
      const fromArr: any = document.getElementsByClassName(`fromId${el.id}`);
      for (let i = 0; i < fromArr.length; i++) {
        fromArr[i].setAttribute("y1", `${e.pageY - offsetY - 25}px`);
      }
    }
    if (document.getElementsByClassName(`toId${el.id}`)) {
      const toArr: any = document.getElementsByClassName(`toId${el.id}`);
      for (let i = 0; i < toArr.length; i++) {
        toArr[i].setAttribute("y2", `${e.pageY - offsetY - 25}px`);
      }
    }
    el.style.top = `${e.pageY - offsetY - 50}px`;
    el.style.zIndex = `10`;
    el.style.position = `absolute`;
    el.style.transform = `rotate(10deg) scale(1.1)`;
    window.addEventListener("mouseup", remove);
  }, []);

  const handleElementRef = (element: any, index: number) => {
    appRef.current[index] = element;
  };

  const add = useCallback(
    (e: any) => {
      const el = e.target;
      ref.current = e;
      offsetY = e.clientY - el.getBoundingClientRect().top;
      window.addEventListener("mousemove", move);
    },
    [move]
  );

  const remove = useCallback(
    (e: any) => {
      const el = ref.current.target;
      window.removeEventListener("mousemove", move);
      el.style.zIndex = `5`;
      el.style.transform = `scale(1)`;
      // offsetX = 0;
      offsetY = 0;
    },
    [move]
  );

  useEffect(() => {
    console.log(col, list.nodes.filter((el: any) => col.includes(el.id)));
    setColumns(list.nodes.filter((el: any) => col.includes(el.id)).sort((a, b) => col.indexOf(a.id) - col.indexOf(b.id)));
  }, []);

  const getCoordinates = () => {
    setTimeout(() => {
      const newEdges = list.edges.map((el) => {
        const fromElement = appRef.current[el.fromId];
        const toElement = appRef.current[el.toId];

        if (fromElement && toElement && col.includes(el.fromId)) {
          const fromRect = fromElement.getBoundingClientRect();
          const toRect = toElement.getBoundingClientRect();
          const fromId = el.fromId;
          const toId = el.toId;
          const { x: x1, y: y1 } = {
            x: fromRect.x + 200,
            y: fromRect.y - 25,
          };
          const { x: x2, y: y2 } = {
            x: toRect.x,
            y: toRect.y - 25,
          };
          return { x1, y1, x2, y2, fromId, toId };
        }
        return null;
      });
      setEdges(newEdges.filter((edge) => edge !== null));
    }, 0);
  };
  useEffect(() => {
    getCoordinates();
    return () => {};
  }, [list, appRef.current]);

  return (
    <div className={styles.wrapper}>
      {columns.map((el: any, i: number) => (
        <div
          ref={(element) => handleElementRef(element, el.id)}
          id={el.id}
          key={el.id}
          onMouseDown={add}
          onMouseUp={remove}
          className={styles.node}
          style={{ userSelect: "none", top:`${i*200}px` }}
        >
          {el.id}
        </div>
      ))}
      {edges &&
        edges.map((el: any) => (
          <Line id={el} key={JSON.stringify(el)} coordinates={el} />
        ))}
    </div>
  );
};
