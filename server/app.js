const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const graphs = require("./graphs");
const PORT = 3001;
const app = express();
app.use(morgan("dev"));
app.use(cors({ origin: true }));

app.get("/api/graphs", (req, res) => {
  res.json(graphs.map((_, idx) => idx));
});
app.get("/api/graphs/:id", (req, res, ctx) => {
  const { id } = req.params;
  const graph = graphs.find((_, gid) => gid === parseInt(id));
  res.json(graph);
});

app.listen(PORT, () => {
  console.log("server has started on", PORT);
});
