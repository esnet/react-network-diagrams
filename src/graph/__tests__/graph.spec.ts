import _ from "lodash";
import { Graph } from "../Graph";
import { Node } from "../Node";

type MetaType = {
  name: string;
  version: string;
};

type NodeType = {
  name: string;
  code: number;
};

type EdgeType = {
  weight: number;
};

test("Make a topology with the constructor", () => {
  const g = new Graph<MetaType, NodeType, EdgeType>({
    name: "top_level",
    version: "3.1",
  });
  expect(g.getMetaValue("version")).toBe("3.1");
  expect(g.getAllNodes().length).toBe(0);
});

test("Make a new Node", () => {
  const node = new Node<NodeType>("1234", { name: "chic-cr5", code: 3 });
  expect(node.id()).toBe("1234");
  expect(node.property("name")).toBe("chic-cr5");
});

test("Add a Node to a Graph", () => {
  const g = new Graph<MetaType, NodeType, EdgeType>({
    name: "top_level",
    version: "4.1",
  });
  g.addNode(new Node("1234", { name: "chic-cr5", code: 3 }));
  expect(g.getAllNodes().length).toBe(1);
});

test("Add a node to the graph and then request it back", () => {
  const g = new Graph<MetaType, NodeType, EdgeType>({
    name: "top_level",
    version: "5.55",
  });
  g.addNode(new Node("1234", { name: "chic-cr5", code: 3 }));
  expect(g.getNode("1234")?.property("name")).toBe("chic-cr5");
  expect(g.getNode("1234")?.property("code")).toBe(3);
});

test("Add two nodes to the graph and connect them", () => {
  const g = new Graph<MetaType, NodeType, EdgeType>({
    name: "top_level",
    version: "5.55",
  });
  const chic = g.addNode(new Node("1", { name: "chic", code: 3 }));
  const wash = g.addNode(new Node("2", { name: "wash", code: 3 }));
  g.addEdge("chic--wash", chic, wash, { weight: 1.2 });
});

const data = {
  description: "Simple topo",
  name: "simple",
  nodes: [
    {
      label_dx: null,
      label_dy: null,
      label_position: "top",
      name: "Node1",
      type: "esnet_site",
      x: 100,
      y: 20,
      id: "902e2ac8-038b-44c2-95dc-94d826542a59",
    },
    {
      label_dx: null,
      label_dy: null,
      label_position: "top",
      name: "Node2",
      site: 5,
      type: "esnet_site",
      x: 50,
      y: 80,
      id: "d9c6f800-98a4-4156-a6b2-13a41bc7abc2",
    },
    {
      label_dx: null,
      label_dy: null,
      label_position: "top",
      name: "Node3",
      site: 5,
      type: "hub",
      x: 150,
      y: 80,
      id: "ee890ac0-e79c-4a30-a2be-68a71430e719",
    },
    {
      label_dx: null,
      label_dy: null,
      label_position: "top",
      name: "Node4",
      site: 5,
      type: "hub",
      x: 150,
      y: 180,
      id: "4a300ac0-e79c-0ac0-a2be-68a71430e719",
    },
  ],
  edges: [
    {
      capacity: "100G",
      source: "902e2ac8-038b-44c2-95dc-94d826542a59",
      target: "d9c6f800-98a4-4156-a6b2-13a41bc7abc2",
    },
    {
      capacity: "40G",
      source: "d9c6f800-98a4-4156-a6b2-13a41bc7abc2",
      target: "ee890ac0-e79c-4a30-a2be-68a71430e719",
    },
    {
      capacity: "10G",
      source: "d9c6f800-98a4-4156-a6b2-13a41bc7abc2",
      target: "4a300ac0-e79c-0ac0-a2be-68a71430e719",
    },
  ],
};

type NodePosition = "top" | "bottom" | "left" | "right";

type NetworkTopology = {
  name: string;
  description: string;
};

type NetworkNode = {
  labelDx: number;
  labelDy: number;
  labelPosition: NodePosition;
  label: string;
  type: string;
  x: number;
  y: number;
};

type NetworkEdge = {
  capacity: string;
};

test("Add two nodes to the graph and connect them", () => {
  const g = new Graph<NetworkTopology, NetworkNode, NetworkEdge>({
    name: "top_level",
    description: "Main network visualization",
  });
  data.nodes.forEach((n) => {
    const node = new Node<NetworkNode, NetworkEdge>(n.id, {
      labelDx: (n.label_dx ? n.label_dx : 0) as number,
      labelDy: (n.label_dy ? n.label_dy : 0) as number,
      labelPosition: (_.isNull(n.label_position)
        ? "top"
        : n.label_position) as NodePosition,
      label: n.name ? n.name : "",
      type: n.type,
      x: n.x ? n.x : 0,
      y: n.y ? n.y : 0,
    });
    g.addNode(node);
  });

  data.edges.forEach((e) => {
    const source = g.getNode(e.source);
    const target = g.getNode(e.target);
    if (source && target) {
      g.addEdge(`${e.source}--${e.target}`, source, target, {
        capacity: e.capacity,
      });
    }
  });

  expect(g.getAllNodes().length).toBe(4);

  function valueOrNull<T>(v: T | null, d: T) {
    return !_.isNull(v) ? v : d;
  }

  const visits: string[] = [];
  const root = g.getNode("902e2ac8-038b-44c2-95dc-94d826542a59");
  if (root) {
    g.traverse(root, (n) =>
      visits.push(valueOrNull<string>(n.property("label") as string, ""))
    );
  }

  expect(visits).toStrictEqual(["Node1", "Node2", "Node3", "Node4"]);
});
