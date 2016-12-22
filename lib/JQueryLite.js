'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _common = require('./core/common');

var _dom = require('./core/dom');

var _jqError = require('./core/jqError');

function JQueryLite(element) {
  if (element instanceof JQueryLite) {
    return element;
  }
  if ((0, _common.isString)(element)) {
    element = (0, _common.trim)(element);
  }
  if (!(this instanceof JQueryLite)) {
    if ((0, _common.isString)(element) && element.charAt(0) !== '<') {
      throw (0, _jqError.jqLiteErr)('nosel', 'Looking up elements via selectors is not supported by jqLite!');
    }
    return new JQueryLite(element);
  }

  if ((0, _common.isString)(element)) {
    (0, _dom.addNodes)(this, (0, _dom.parseHTML)(element));
    var fragment = JQueryLite(document.createDocumentFragment());
    fragment.append(this);
  } else {
    (0, _dom.addNodes)(this, element);
  }
}

exports.default = JQueryLite;

//////////////////////////////////////////
// Functions which are declared directly.
//////////////////////////////////////////

var JQueryLitePrototype = JQueryLite.prototype = {
  ready: function ready(fn) {
    var fired = false;

    function trigger() {
      if (fired) return;
      fired = true;
      fn();
    }

    // check if document already is loaded
    if (document.readyState === 'complete') {
      setTimeout(trigger);
    } else {
      this.on('DOMContentLoaded', trigger); // works for modern browsers and IE9
      JQueryLite(window).on('load', trigger); // fallback to window.onload for others
    }
  },
  toString: function toString() {
    var value = [];
    (0, _common.forEach)(this, function (e) {
      value.push('' + e);
    });
    return '[' + value.join(', ') + ']';
  },
  eq: function eq(index) {
    return index >= 0 ? JQueryLite(this[index]) : JQueryLite(this[this.length + index]);
  },


  length: 0,
  push: [].push,
  sort: [].sort,
  splice: [].splice
};