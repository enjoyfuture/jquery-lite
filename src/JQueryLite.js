import {isString, trim, forEach} from './core/common';
import {parseHTML, addNodes} from './core/dom';
import {jqLiteErr} from './core/jqError';

function JQueryLite(element) {
  if (element instanceof JQueryLite) {
    return element;
  }
  if (isString(element)) {
    element = trim(element);
  }
  if (!(this instanceof JQueryLite)) {
    if (isString(element) && element.charAt(0) !== '<') {
      throw jqLiteErr('nosel', 'Looking up elements via selectors is not supported by jqLite!');
    }
    return new JQueryLite(element);
  }

  if (isString(element)) {
    addNodes(this, parseHTML(element));
    const fragment = JQueryLite(document.createDocumentFragment());
    fragment.append(this);
  } else {
    addNodes(this, element);
  }
}

export default JQueryLite;


//////////////////////////////////////////
// Functions which are declared directly.
//////////////////////////////////////////
const JQueryLitePrototype = JQueryLite.prototype = {
  ready(fn) {
    let fired = false;

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

  toString () {
    const value = [];
    forEach(this, (e) => {
      value.push(`${e}`);
    });
    return `[${value.join(', ')}]`;
  },

  eq (index) {
    return (index >= 0) ? JQueryLite(this[index]) : JQueryLite(this[this.length + index]);
  },

  length: 0,
  push: [].push,
  sort: [].sort,
  splice: [].splice
};
