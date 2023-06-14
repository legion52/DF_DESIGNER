interface Node {
    id: number;
    name: string;
  }
  
  interface Edge {
    fromId: number;
    toId: number;
  }
  
 export interface Graph {
    nodes: Node[];
    edges: Edge[];
  }