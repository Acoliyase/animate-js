import { atom } from "jotai";
import { editorStateAtom } from "./editor-state";
export var schemaAtom = atom(function (get) {
  var editorState = get(editorStateAtom);
  if (!editorState) return null;
  return editorState.schema;
});