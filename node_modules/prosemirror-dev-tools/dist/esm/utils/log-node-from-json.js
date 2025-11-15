import { findNodeJSON } from "./find-node";
export var logNodeFromJSON = function logNodeFromJSON(state) {
  return function (_ref) {
    var doc = _ref.doc,
      node = _ref.node;
    var fullDoc = state.doc;
    var path = findNodeJSON([], doc, node);
    if (path) {
      console.log(path.reduce(function (node, pathItem) {
        return node[pathItem];
      }, fullDoc.toJSON()));
    } else {
      console.log(node);
    }
  };
};