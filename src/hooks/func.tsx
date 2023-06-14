import { Graph } from "../models";

interface Result {
  [key: number]: number[];
}

export const transformCol = (obj: Graph) => {
  let res: Result = {};
  let col = 1;
  const graph: Graph = JSON.parse(JSON.stringify(obj));

  const func = (obj: Graph) => {
    if (obj.edges.length) {
      obj.edges.forEach((el, i, arr) => {
        if (arr.map((el) => el.toId).indexOf(el.fromId) < 0) {
          res[col] ? res[col].push(el.fromId) : (res[col] = [el.fromId]);
        }
      });
      col++;
      obj.edges = obj.edges.filter(
        (edge) => !res[col - 1].includes(edge.fromId)
      );
      func(obj);
    } else {
      graph.edges.forEach((el, i, arr) => {
        if (arr.map((el) => el.fromId).indexOf(el.toId) < 0) {
          res[col] ? res[col].push(el.toId) : (res[col] = [el.toId]);
        }
      });
    }
  };
  func(obj);
  Object.keys(res).map((el: any) => (res[el] = [...new Set(res[el])]));
  return Object.keys(res).map((el: any) => [...res[el]]);
};
