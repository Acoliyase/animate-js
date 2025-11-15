/// <reference types="react" />
import "@compiled/react";
import type { JSONNode } from "../types/prosemirror";
export declare function getItemString(doc: JSONNode, action: (args: {
    doc: JSONNode;
    node: JSONNode;
}) => void): (type: string, value: JSONNode, defaultView: unknown, keysCount: string) => JSX.Element;
export declare function shouldExpandNode(expandPath: Array<string | number>, nodePath: Array<string | number>): boolean;
export default function StateTab(): JSX.Element | null;
