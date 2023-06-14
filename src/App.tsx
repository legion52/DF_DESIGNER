import { useEffect, useRef, useState } from "react";
import { transformCol } from "./hooks/func";
import { ListPanel } from "./components/list-panel/column";
import { Graph } from "./models";
import { Select } from "./components/select";
import axios from "axios";

function App() {
  const [columns, setColumns] = useState<any>([]);
  const [graphs, setGraphs] = useState<Graph>({ nodes: [], edges: [] });
  const [select, setSelect] = useState([]);
  const [value, setValue] = useState<number | null>();

  const appRef = useRef<any>([]);

  useEffect(() => {
    try {
      axios("http://localhost:3001/api/graphs").then((res: any) =>
        setSelect(res.data)
      );
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const start = async () => {
      try {
        // if (value) {
          axios(`http://localhost:3001/api/graphs/${value}`).then(
            (res: any) => {
              setGraphs(res.data);
              setColumns(transformCol(JSON.parse(JSON.stringify(res.data))));
            }
          );
        // }
      } catch (error) {
        console.log(error);
      }
      if (appRef.current) {
        appRef.current = [];
      }
    };
    if (value !== null) {
      start();
    }
  }, [value]);

  return (
    <div className="wrapper">
      <div className="graphs">
        {columns.length && graphs.nodes.length ? (
          columns.map((el: any, i: number) => (
            <ListPanel
              appRef={appRef}
              key={JSON.stringify(el)}
              col={el}
              list={graphs}
            />
          ))
        ) : (
          <h1>Выберите график</h1>
        )}
      </div>
      <div className="navbar">
        <Select value={value} onChange={setValue} data={select} />
      </div>
    </div>
  );
}

export default App;
