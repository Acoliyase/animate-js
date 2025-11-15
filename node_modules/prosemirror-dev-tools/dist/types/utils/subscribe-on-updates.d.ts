import type { EditorState, Transaction } from "prosemirror-state";
import type { EditorView } from "prosemirror-view";
type subsctibeCallback = (tr: Transaction, oldState: EditorState, newState: EditorState) => void;
export default function subscribeOnUpdates(editorView: EditorView, callback: subsctibeCallback): void;
export {};
