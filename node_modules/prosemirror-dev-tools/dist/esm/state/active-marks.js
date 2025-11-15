import { atom } from "jotai";
import { editorStateAtom } from "./editor-state";
export var activeMarksAtom = atom(function (get) {
  var editorState = get(editorStateAtom);
  if (!editorState) return [];
  return getActiveMarks(editorState);
});
function getActiveMarks(editorState) {
  var selection = editorState.selection;
  var marks = [];
  if (selection.empty) {
    marks = selection.$from.marks();
  } else {
    editorState.doc.nodesBetween(selection.from, selection.to, function (node) {
      marks = marks.concat(node.marks);
    });
  }
  return marks.reduce(function (acc, mark) {
    if (acc.indexOf(mark) === -1) {
      acc.push(mark);
    }
    return acc;
  }, []).map(function (m) {
    return m.toJSON();
  });
}