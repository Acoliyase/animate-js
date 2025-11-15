import type { Node } from "prosemirror-model";
import type { JSONNode } from "../types/prosemirror";
export default function findNodeIn(doc: Node, node: Node): (string | number)[] | undefined;
export declare function findNodeJSON(fullPath: Array<string | number>, currentNode: JSONNode, nodeToFind: JSONNode | Array<JSONNode>): Array<string | number>;
export declare function findPMNode(domNode: HTMLElement): HTMLElement | undefined;
