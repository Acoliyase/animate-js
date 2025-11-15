import React from "react";
import { useSetAtom } from "jotai";
import { Selection } from "prosemirror-state";
import { editorStateAtom } from "../state/editor-state";
import { historyRolledBackToAtom } from "../state/history";
import getEditorStateClass from "../state/get-editor-state";
export function useRollbackHistory(editorView) {
  var setHistoryRolledBackTo = useSetAtom(historyRolledBackToAtom);
  var setEditorState = useSetAtom(editorStateAtom);
  var rollbackHistory = React.useCallback(function (historyItem, historyItemIndex) {
    var EditorState = getEditorStateClass();
    var state = historyItem.state;
    var newState = EditorState.create({
      schema: state.schema,
      plugins: state.plugins,
      doc: state.schema.nodeFromJSON(state.doc.toJSON())
    });
    editorView.updateState(newState);
    editorView.dom.focus();
    var selection = Selection.fromJSON(editorView.state.doc, state.selection.toJSON());
    var tr = editorView.state.tr.setSelection(selection).setMeta("addToHistory", false).setMeta("_skip-dev-tools-history_", true);
    editorView.dispatch(tr);
    setEditorState(editorView.state);
    setHistoryRolledBackTo(historyItemIndex);
  }, [editorView]);
  return rollbackHistory;
}