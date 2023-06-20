import { Graph } from "../models";

export const unravelGraph = (graph: Graph, column: any, iterations: number) => {
  let res = JSON.parse(JSON.stringify(column));

  const createIdToToIdMap = (graph: Graph) => {
    const idToToIdMap: any = {};

    graph.edges.forEach((edge) => {
      const { fromId, toId } = edge;
      if (idToToIdMap[fromId]) {
        idToToIdMap[fromId].push(toId);
      } else {
        idToToIdMap[fromId] = [toId];
      }
    });
    // console.log(idToToIdMap);

    return idToToIdMap;
  };

  const createInverseObject = (obj: any) => {
    const inverseObj: any = {};

    Object.keys(obj).forEach((key) => {
      const values = obj[key];
      values.forEach((value: any) => {
        if (inverseObj[value]) {
          inverseObj[value].push(Number(key));
        } else {
          inverseObj[value] = [Number(key)];
        }
      });
    });

    return inverseObj;
  };

  const obj = createIdToToIdMap(graph);
  const revers = createInverseObject(obj);

  let intersection = 0;
  let minIntersections = 0;

  const maxIntersections = (j: number, col1: any, col2: any, object:any, reversObj:any) => {
    if (col1.length && col2.length) {
         col1?.forEach((cl: number, index: number) => {
        object[cl]?.forEach(() => {
            if(object[cl] && reversObj[col2[index]]){
                 const uniqueValues1 = object[cl]
          .map((el: number) => col2.indexOf(el))
          .filter((el: number) => el !== index);
        const uniqueValues2 = reversObj[col2[index]]
          .map((el: number) => col1.indexOf(el))
          .filter((el: number) => el !== index);
        const maxLength = Math.max(uniqueValues1.length, uniqueValues2.length);
        for (let i = 0; i < maxLength; i++) {
          if (
            (uniqueValues1[i] > index && uniqueValues2[i] > index) ||
            (uniqueValues1[i] < index && uniqueValues2[i] < index) ||
            uniqueValues1[i] === uniqueValues2[i]
          ) {
            intersection++;
          }
        }
            }
       
      });
    });}
  };

  const swap = (array: any, pos1: number, pos2: number) => {
    const temp = array[pos1];
    array[pos1] = array[pos2];
    array[pos2] = temp;
  };

  const combinations = (array: any) => {
    const result: any = [];

    function generate(output: any, n: number) {
      n = n || output.length;

      if (n === 1) {
        result.push(output.slice());
      } else {
        for (let i = 1; i <= n; i += 1) {
          generate(output, n - 1);

          if (n % 2) {
            var j = 1;
          } else {
            var j = i;
          }
          swap(output, j - 1, n - 1);
        }
      }
    }
    generate(array.slice(), array.length);
    return result;
  };

  const forFunc = (columns:any, object:any, reversObj:any) => {
    for (let j = 0; j < columns.length - 1; j++) {
      const colArr = combinations(columns[j + 1]);
      minIntersections = 0
      for (let currentItem = 0; currentItem < colArr.length; currentItem++) {
        intersection = 0;
        maxIntersections(j, columns[j], colArr[currentItem], object, reversObj);
        if (minIntersections > intersection) {
          minIntersections = intersection;
          columns[j + 1] = colArr[currentItem];
        }
        if (intersection === 0) {
            columns[j + 1] = colArr[currentItem];
            minIntersections = 0
          break;
        }
      }
    }
    return columns
  };
  
  for (let i = 0; i < iterations; i++) {
      res = forFunc(res, obj, revers);
      res = forFunc(res.reverse(), revers, obj);
      res.reverse()
    //   console.log(res);
  }
//   console.log(res)
  return res;
};
