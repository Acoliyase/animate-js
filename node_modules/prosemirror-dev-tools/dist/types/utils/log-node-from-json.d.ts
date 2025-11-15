import type { EditorState } from "prosemirror-state";
import { JSONNode } from "../types/prosemirror";
export declare const logNodeFromJSON: (state: EditorState) => ({ doc, node }: {
    doc: JSONNode;
    node: JSONNode;
}) => void;
