"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jqNextId = jqNextId;
var jqId = 1;

function jqNextId() {
  return ++jqId;
}