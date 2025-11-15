"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSnapshots = useSnapshots;
var _utils = require("jotai/utils");
var SNAPSHOTS_KEY = "prosemirror-dev-tools-snapshots";
var snapshotsAtom = (0, _utils.atomWithStorage)(SNAPSHOTS_KEY, []);
function snapshotReducer(prev, action) {
  if (action.type === "save") {
    var snapshots = [action.payload.snapshot].concat(prev);
    return snapshots;
  } else if (action.type === "delete") {
    return prev.filter(function (item) {
      return item !== action.payload.snapshot;
    });
  }
  return prev;
}
function useSnapshots() {
  return (0, _utils.useReducerAtom)(snapshotsAtom, snapshotReducer);
}