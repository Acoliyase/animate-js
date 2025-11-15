import { atomWithStorage, useReducerAtom } from "jotai/utils";
var SNAPSHOTS_KEY = "prosemirror-dev-tools-snapshots";
var snapshotsAtom = atomWithStorage(SNAPSHOTS_KEY, []);
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
export function useSnapshots() {
  return useReducerAtom(snapshotsAtom, snapshotReducer);
}