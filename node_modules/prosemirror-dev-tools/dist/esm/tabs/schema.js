import React from "react";
import { SplitView, SplitViewCol } from "../components/split-view";
import JSONTree from "../components/json-tree";
import { Heading } from "../components/heading";
import { useAtomValue } from "jotai";
import { schemaAtom } from "../state/schema";
var ignoreFields = ["schema", "contentExpr", "schema", "parseDOM", "toDOM"];
export function postprocessValue(ignore, data) {
  if (!data || Object.prototype.toString.call(data) !== "[object Object]") {
    return data;
  }
  return Object.keys(data).filter(function (key) {
    return ignore.indexOf(key) === -1;
  }).reduce(function (res, key) {
    res[key] = data[key];
    return res;
  }, {});
}
export default function SchemaTab() {
  var schema = useAtomValue(schemaAtom);
  if (!schema) return null;
  return /*#__PURE__*/React.createElement(SplitView, {
    testId: "__prosemirror_devtools_tabs_schema__"
  }, /*#__PURE__*/React.createElement(SplitViewCol, {
    grow: true
  }, /*#__PURE__*/React.createElement(Heading, null, "Nodes"), /*#__PURE__*/React.createElement(JSONTree, {
    data: schema.nodes,
    postprocessValue: postprocessValue.bind(null, ignoreFields)
  })), /*#__PURE__*/React.createElement(SplitViewCol, {
    grow: true,
    sep: true
  }, /*#__PURE__*/React.createElement(Heading, null, "Marks"), /*#__PURE__*/React.createElement(JSONTree, {
    data: schema.marks,
    postprocessValue: postprocessValue.bind(null, ignoreFields)
  })));
}