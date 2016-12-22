(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["jQuery"] = factory();
	else
		root["jQuery"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.camelCase = camelCase;
exports.isString = isString;
exports.isDefined = isDefined;
exports.isUndefined = isUndefined;
exports.isWindow = isWindow;
exports.toJson = toJson;
exports.isFunction = isFunction;
exports.forEach = forEach;
exports.isObject = isObject;
exports.arrayRemove = arrayRemove;
exports.extend = extend;
exports.noop = noop;
exports.shallowCopy = shallowCopy;
var SPECIAL_CHARS_REGEXP = /([:-_]+(.))/g;
var MOZ_HACK_REGEXP = /^moz([A-Z])/;
var toString = Object.prototype.toString;
/**
 * @kind function
 *
 * @description Converts the specified string to lowercase.
 * @param {string} string String to be converted to lowercase.
 * @returns {string} Lowercased string.
 */
var lowercase = exports.lowercase = function lowercase(string) {
  return isString(string) ? string.toLowerCase() : string;
};

var hasOwnProperty = exports.hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Converts snake_case to camelCase.
 * Also there is special case for Moz prefix starting with upper case letter.
 * @param name Name to normalize
 */
function camelCase(name) {
  return name.replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
    return offset ? letter.toUpperCase() : letter;
  }).replace(MOZ_HACK_REGEXP, 'Moz$1');
}

/**
 * @description
 * Determines if a reference is a `String`.
 *
 * @param {*} value Reference to check.
 * @returns {boolean} True if `value` is a `String`.
 */
function isString(value) {
  return typeof value === 'string';
}

var trim = exports.trim = function () {
  if (!String.prototype.trim) {
    return function (value) {
      return isString(value) ? value.replace(/^\s\s*/, '').replace(/\s\s*$/, '') : value;
    };
  }
  return function (value) {
    return isString(value) ? value.trim() : value;
  };
}();

/**
 * @kind function
 *
 * @description
 * Determines if a reference is defined.
 *
 * @param {*} value Reference to check.
 * @returns {boolean} True if `value` is defined.
 */
function isDefined(value) {
  return typeof value !== 'undefined';
}

/**
 * @kind function
 *
 * @description
 * Determines if a reference is undefined.
 *
 * @param {*} value Reference to check.
 * @returns {boolean} True if `value` is undefined.
 */
function isUndefined(value) {
  return typeof value === 'undefined';
}

/**
 * Checks if `obj` is a window object.
 *
 * @private
 * @param {*} obj Object to check
 * @returns {boolean} True if `obj` is a window obj.
 */
function isWindow(obj) {
  return obj && obj.document && obj.location && obj.alert && obj.setInterval;
}

/**
 * @kind function
 *
 * @description
 * Serializes input into a JSON-formatted string. Properties with leading $ characters will be
 * stripped since angular uses this notation internally.
 *
 * @param {Object|Array|Date|string|number} obj Input to be serialized into JSON.
 * @param {boolean=} pretty If set to true, the JSON output will contain newlines and whitespace.
 * @returns {string|undefined} JSON-ified string representing `obj`.
 */
function toJson(obj, pretty) {
  if (typeof obj === 'undefined') return undefined;
  return JSON.stringify(obj, pretty ? '  ' : null);
}

/**
 * @kind function
 *
 * @description
 * Determines if a reference is a `Function`.
 *
 * @param {*} value Reference to check.
 * @returns {boolean} True if `value` is a `Function`.
 */
function isFunction(value) {
  return typeof value === 'function';
}

/**
 * @kind function
 *
 * @description
 * Determines if a reference is an `Array`.
 *
 * @param {*} value Reference to check.
 * @returns {boolean} True if `value` is an `Array`.
 */
var isArray = exports.isArray = function () {
  if (!isFunction(Array.isArray)) {
    return function (value) {
      return toString.call(value) === '[object Array]';
    };
  }
  return Array.isArray;
}();

/**
 * @private
 * @param {*} obj
 * @return {boolean} Returns true if `obj` is an array or array-like object (NodeList, Arguments,
 *                   String ...)
 */
function isArrayLike(obj) {
  if (obj == null || isWindow(obj)) {
    return false;
  }

  var length = obj.length;

  if (obj.nodeType === 1 && length) {
    return true;
  }

  return isString(obj) || isArray(obj) || length === 0 || typeof length === 'number' && length > 0 && length - 1 in obj;
}

/**
 * @kind function
 *
 * @description
 * Invokes the `iterator` function once for each item in `obj` collection, which can be either an
 * object or an array. The `iterator` function is invoked with `iterator(value, key)`, where `value`
 * is the value of an object property or an array element and `key` is the object property key or
 * array element index. Specifying a `context` for the function is optional.
 *
 * It is worth noting that `.forEach` does not iterate over inherited properties because it filters
 * using the `hasOwnProperty` method.
 *
 ```js
 var values = {name: 'misko', gender: 'male'};
 var log = [];
 forEach(values, function(value, key) {
       this.push(key + ': ' + value);
     }, log);
 expect(log).toEqual(['name: misko', 'gender: male']);
 ```
 *
 * @param {Object|Array} obj Object to iterate over.
 * @param {Function} iterator Iterator function.
 * @param {Object=} context Object to become context (`this`) for the iterator function.
 * @returns {Object|Array} Reference to `obj`.
 */
function forEach(obj, iterator, context) {
  var key = void 0;
  if (obj) {
    if (isFunction(obj)) {
      for (key in obj) {
        // Need to check if hasOwnProperty exists,
        // as on IE8 the result of querySelectorAll is an object without a hasOwnProperty function
        if (key !== 'prototype' && key !== 'length' && key !== 'name' && (!obj.hasOwnProperty || obj.hasOwnProperty(key))) {
          iterator.call(context, obj[key], key);
        }
      }
    } else if (isArray(obj) || isArrayLike(obj)) {
      for (key = 0; key < obj.length; key++) {
        iterator.call(context, obj[key], key);
      }
    } else if (obj.forEach && obj.forEach !== forEach) {
      obj.forEach(iterator, context);
    } else {
      for (key in obj) {
        if (obj.hasOwnProperty(key)) {
          iterator.call(context, obj[key], key);
        }
      }
    }
  }
  return obj;
}

function indexOf(array, obj) {
  if (array.indexOf) return array.indexOf(obj);

  for (var i = 0; i < array.length; i++) {
    if (obj === array[i]) return i;
  }
  return -1;
}

/**
 * @kind function
 *
 * @description
 * Determines if a reference is an `Object`. Unlike `typeof` in JavaScript, `null`s are not
 * considered to be objects. Note that JavaScript arrays are objects.
 *
 * @param {*} value Reference to check.
 * @returns {boolean} True if `value` is an `Object` but not `null`.
 */
function isObject(value) {
  return value != null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object';
}

function arrayRemove(array, value) {
  var index = indexOf(array, value);
  if (index >= 0) {
    array.splice(index, 1);
  }
  return value;
}

/**
 * @kind function
 *
 * @description
 * Extends the destination object `dst` by copying own enumerable properties from the `src` object(s)
 * to `dst`. You can specify multiple `src` objects.
 *
 * @param {Object} dst Destination object.
 * @param {...Object} src Source object(s).
 * @returns {Object} Reference to `dst`.
 */
function extend(dst) {
  forEach(arguments, function (obj) {
    if (obj !== dst) {
      forEach(obj, function (value, key) {
        dst[key] = value;
      });
    }
  });
  return dst;
}

function int(str) {
  return parseInt(str, 10);
}

/**
 * IE 11 changed the format of the UserAgent string.
 * See http://msdn.microsoft.com/en-us/library/ms537503.aspx
 */
var _msie = int((/msie (\d+)/.exec(lowercase(navigator.userAgent)) || [])[1]);
if (isNaN(_msie)) {
  _msie = int((/trident\/.*; rv:(\d+)/.exec(lowercase(navigator.userAgent)) || [])[1]);
}

var msie = exports.msie = _msie;

// 空函数
function noop() {}

/**
 * Creates a shallow copy of an object, an array or a primitive
 */
function shallowCopy(src, dst) {
  if (isArray(src)) {
    dst = dst || [];

    for (var i = 0; i < src.length; i++) {
      dst[i] = src[i];
    }
  } else if (isObject(src)) {
    dst = dst || {};

    for (var key in src) {
      if (hasOwnProperty.call(src, key) && !(key.charAt(0) === '$' && key.charAt(1) === '$')) {
        dst[key] = src[key];
      }
    }
  }

  return dst || src;
}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jqLiteErr = undefined;
exports.default = jqError;

var _common = __webpack_require__(0);

/**
 * @description
 *
 * This object provides a utility for producing rich Error messages within
 * JQuery Lite. It can be called as follows:
 *
 * var exampleJqError = jqError('example');
 * throw exampleJqError('one', 'This {0} is {1}', foo, bar);
 *
 * The above creates an instance of jqError in the example namespace. The
 * resulting error will have a namespaced error code of example.one.  The
 * resulting error will replace {0} with the value of foo, and {1} with the
 * value of bar. The object is not restricted in the number of arguments it can
 * take.
 *
 * If fewer arguments are specified than necessary for interpolation, the extra
 * interpolation markers will be preserved in the final string.
 *
 * Since data will be parsed statically during a build step, some restrictions
 * are applied with respect to how jqError instances are created and called.
 * Instances should have names of the form namespaceJqError for a jqError created
 * using jqError('namespace') . Error codes, namespaces and template strings
 * should all be static strings, not variables or general expressions.
 *
 * @param {string} module The namespace to use for the new jqError instance.
 * @returns {function(code:string, template:string, ...templateArgs): Error} jqError instance
 */

function jqError(module) {
  return function () {
    /*eslint-disable prefer-template*/
    var code = arguments[0],
        prefix = '[' + (module ? module + ':' : '') + code + '] ',
        template = arguments[1],
        templateArgs = arguments,
        stringify = function stringify(obj) {
      if (typeof obj === 'function') {
        return obj.toString().replace(/ \{[\s\S]*$/, '');
      } else if (typeof obj === 'undefined') {
        return 'undefined';
      } else if (typeof obj !== 'string') {
        return JSON.stringify(obj);
      }
      return obj;
    };

    var message = void 0,
        i = void 0;

    message = prefix + template.replace(/\{\d+\}/g, function (match) {
      var index = Number(match.slice(1, -1));
      var arg = void 0;

      if (index + 2 < templateArgs.length) {
        arg = templateArgs[index + 2];
        if (typeof arg === 'function') {
          return arg.toString().replace(/ ?\{[\s\S]*$/, '');
        } else if (typeof arg === 'undefined') {
          return 'undefined';
        } else if (typeof arg !== 'string') {
          return (0, _common.toJson)(arg);
        }
        return arg;
      }
      return match;
    });

    message = message + (module ? module + '/' : '') + code;
    for (i = 2; i < arguments.length; i++) {
      message = message + (i === 2 ? '?' : '&') + 'p' + (i - 2) + '=' + encodeURIComponent(stringify(arguments[i]));
    }

    return new Error(message);
  };
}

var jqLiteErr = exports.jqLiteErr = jqError('jqLite');

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jqCache = undefined;
exports.removeData = removeData;
exports.expandoStore = expandoStore;
exports.jqueryLiteData = jqueryLiteData;

var _JQueryLite = __webpack_require__(3);

var _JQueryLite2 = _interopRequireDefault(_JQueryLite);

var _common = __webpack_require__(0);

var _event = __webpack_require__(5);

var _uuid = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_JQueryLite2.default.expando = 'jqlite339';

var jqCache = exports.jqCache = _JQueryLite2.default.cache = {};

function removeData(element, name) {
  var expandoId = element.jqlite339,
      expandoStore = jqCache[expandoId];

  if (expandoStore) {
    if (name) {
      delete jqCache[expandoId].data[name];
      return;
    }

    if (expandoStore.handle) {
      (0, _event.off)(element);
    }
    delete jqCache[expandoId];
    element.ng339 = undefined; // don't delete DOM expandos. IE and Chrome don't like it
  }
}

function expandoStore(element, key, value) {
  var expandoId = element.jqlite339,
      store = jqCache[expandoId || -1];

  if ((0, _common.isDefined)(value)) {
    if (!expandoStore) {
      element.ng339 = expandoId = (0, _uuid.jqNextId)();
      store = jqCache[expandoId] = {};
    }
    store[key] = value;
  } else {
    return store && store[key];
  }
}

function jqueryLiteData(element, key, value) {
  var data = expandoStore(element, 'data');
  var isSetter = (0, _common.isDefined)(value),
      keyDefined = !isSetter && (0, _common.isDefined)(key),
      isSimpleGetter = keyDefined && !(0, _common.isObject)(key);

  if (!data && !isSimpleGetter) {
    expandoStore(element, 'data', data = {});
  }

  if (isSetter) {
    data[key] = value;
  } else {
    if (keyDefined) {
      if (isSimpleGetter) {
        // don't create data in this case.
        return data && data[key];
      } else {
        (0, _common.extend)(data, key);
      }
    } else {
      return data;
    }
  }
}

(0, _common.forEach)({
  data: jqueryLiteData,
  removeData: removeData
}, function (fn, name) {
  _JQueryLite2.default[name] = fn;
});

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _common = __webpack_require__(0);

var _dom = __webpack_require__(4);

var _jqError = __webpack_require__(1);

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

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BOOLEAN_ELEMENTS = exports.BOOLEAN_ATTR = undefined;
exports.parseHTML = parseHTML;
exports.addNodes = addNodes;
exports.cloneDom = cloneDom;
exports.dealoc = dealoc;
exports.empty = empty;
exports.getBooleanAttrName = getBooleanAttrName;

var _common = __webpack_require__(0);

var _data = __webpack_require__(2);

var SINGLE_TAG_REGEXP = /^<(\w+)\s*\/?>(?:<\/\1>|)$/;
var HTML_REGEXP = /<|&#?\w+;/;
var TAG_NAME_REGEXP = /<([\w:]+)/;
var XHTML_TAG_REGEXP = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi;

var wrapMap = {
  'option': [1, '<select multiple="multiple">', '</select>'],

  'thead': [1, '<table>', '</table>'],
  'col': [2, '<table><colgroup>', '</colgroup></table>'],
  'tr': [2, '<table><tbody>', '</tbody></table>'],
  'td': [3, '<table><tbody><tr>', '</tr></tbody></table>'],
  '_default': [0, '', '']
};

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

function isTextNode(html) {
  return !HTML_REGEXP.test(html);
}

function buildFragment(html, context) {
  var tmp = void 0,
      tag = void 0,
      wrap = void 0,
      i = void 0,
      j = void 0,
      jj = void 0;
  var fragment = context.createDocumentFragment(),
      nodes = [];

  if (isTextNode(html)) {
    // Convert non-html into a text node
    nodes.push(context.createTextNode(html));
  } else {
    tmp = fragment.appendChild(context.createElement('div'));
    // Convert html into DOM nodes
    tag = (TAG_NAME_REGEXP.exec(html) || ['', ''])[1].toLowerCase();
    wrap = wrapMap[tag] || wrapMap._default;
    /*eslint-disable prefer-template*/
    tmp.innerHTML = '<div>&#160;</div>' + wrap[1] + html.replace(XHTML_TAG_REGEXP, '<$1></$2>') + wrap[2];
    tmp.removeChild(tmp.firstChild);

    // Descend through wrappers to the right content
    i = wrap[0];
    while (i--) {
      tmp = tmp.lastChild;
    }

    for (j = 0, jj = tmp.childNodes.length; j < jj; ++j) {
      nodes.push(tmp.childNodes[j]);
    }tmp = fragment.firstChild;
    tmp.textContent = '';
  }

  // Remove wrapper from fragment
  fragment.textContent = '';
  fragment.innerHTML = ''; // Clear inner HTML
  return nodes;
}

// 格式化 html
function parseHTML(html, context) {
  context = context || document;
  var parsed = SINGLE_TAG_REGEXP.exec(html);

  if (parsed) {
    return [context.createElement(parsed[1])];
  }

  return buildFragment(html, context);
}

//添加 node
function addNodes(root, elements) {
  if (elements) {
    elements = !elements.nodeName && (0, _common.isDefined)(elements.length) && !(0, _common.isWindow)(elements) ? elements : [elements];
    for (var i = 0; i < elements.length; i++) {
      root.push(elements[i]);
    }
  }
}

//clone dom 节点
function cloneDom(element) {
  return element.cloneNode(true);
}

// 清理 oc
function dealoc(element) {
  (0, _data.removeData)(element);
  for (var i = 0, children = element.childNodes || []; i < children.length; i++) {
    dealoc(children[i]);
  }
}

//清空
function empty(element) {
  for (var i = 0, childNodes = element.childNodes; i < childNodes.length; i++) {
    dealoc(childNodes[i]);
  }
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

//////////////////////////////////////////
// Functions iterating getter/setters.
// these functions return self on setter and
// value on get.
//////////////////////////////////////////
var _BOOLEAN_ATTR = {};
'multiple,selected,checked,disabled,readOnly,required,open'.split(',').forEach(function (value) {
  _BOOLEAN_ATTR[(0, _common.lowercase)(value)] = value;
});

var _BOOLEAN_ELEMENTS = {};
'input,select,option,textarea,button,form,details'.split(',').forEach(function (value) {
  _BOOLEAN_ELEMENTS[(0, _common.lowercase)(value)] = value;
});

var BOOLEAN_ATTR = exports.BOOLEAN_ATTR = _BOOLEAN_ATTR;
var BOOLEAN_ELEMENTS = exports.BOOLEAN_ELEMENTS = _BOOLEAN_ELEMENTS;

function getBooleanAttrName(element, name) {
  // check dom last since we will most likely fail on name
  var booleanAttr = _BOOLEAN_ATTR[name.toLowerCase()];

  // booleanAttr is here twice to minimize DOM access
  return booleanAttr && _BOOLEAN_ELEMENTS[element.nodeName] && booleanAttr;
}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeEventListenerFn = exports.addEventListenerFn = undefined;
exports.createEventHandler = createEventHandler;
exports.off = off;

var _common = __webpack_require__(0);

var _jqError = __webpack_require__(1);

var _data = __webpack_require__(2);

//添加事件，兼容 ie 写法
var addEventListenerFn = exports.addEventListenerFn = window.document.addEventListener ? function (element, type, fn) {
  element.addEventListener(type, fn, false);
} : function (element, type, fn) {
  element.attachEvent('on' + type, fn);
};

//删除事件，兼容 ie 写法
var removeEventListenerFn = exports.removeEventListenerFn = window.document.removeEventListener ? function (element, type, fn) {
  element.removeEventListener(type, fn, false);
} : function (element, type, fn) {
  element.detachEvent('on' + type, fn);
};

function createEventHandler(element, events) {
  var eventHandler = function eventHandler(event, type) {
    if (!event.preventDefault) {
      event.preventDefault = function () {
        event.returnValue = false; //ie
      };
    }

    if (!event.stopPropagation) {
      event.stopPropagation = function () {
        event.cancelBubble = true; //ie
      };
    }

    if (!event.target) {
      event.target = event.srcElement || document;
    }

    if ((0, _common.isUndefined)(event.defaultPrevented)) {
      (function () {
        var prevent = event.preventDefault;
        event.preventDefault = function () {
          event.defaultPrevented = true;
          prevent.call(event);
        };
        event.defaultPrevented = false;
      })();
    }

    event.isDefaultPrevented = function () {
      return event.defaultPrevented || event.returnValue === false;
    };

    // Copy event handlers in case event handlers array is modified during execution.
    var eventHandlersCopy = (0, _common.shallowCopy)(events[type || event.type] || []);

    (0, _common.forEach)(eventHandlersCopy, function (fn) {
      fn.call(element, event);
    });

    // Remove monkey-patched methods (IE),
    // as they would cause memory leaks in IE8.
    if (_common.msie <= 8) {
      // IE7/8 does not allow to delete property on native object
      event.preventDefault = null;
      event.stopPropagation = null;
      event.isDefaultPrevented = null;
    } else {
      // It shouldn't affect normal browsers (native methods are defined on prototype).
      delete event.preventDefault;
      delete event.stopPropagation;
      delete event.isDefaultPrevented;
    }
  };
  eventHandler.elem = element;
  return eventHandler;
}

//删除事件
function off(element, type, fn, unsupported) {
  if ((0, _common.isDefined)(unsupported)) {
    throw (0, _jqError.jqLiteErr)('offargs', 'jqLite#off() does not support the `selector` argument');
  }

  var events = (0, _data.expandoStore)(element, 'events'),
      handle = (0, _data.expandoStore)(element, 'handle');

  if (!handle) return; //no listeners registered

  if ((0, _common.isUndefined)(type)) {
    (0, _common.forEach)(events, function (eventHandler, type) {
      removeEventListenerFn(element, type, eventHandler);
      delete events[type];
    });
  } else {
    (0, _common.forEach)(type.split(' '), function (type) {
      if ((0, _common.isUndefined)(fn)) {
        removeEventListenerFn(element, type, events[type]);
        delete events[type];
      } else {
        (0, _common.arrayRemove)(events[type] || [], fn);
      }
    });
  }
}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _common = __webpack_require__(0);

var _dom = __webpack_require__(4);

var _data = __webpack_require__(2);

var _JQueryLite = __webpack_require__(3);

var _JQueryLite2 = _interopRequireDefault(_JQueryLite);

var _jqError = __webpack_require__(1);

var _event = __webpack_require__(5);

var _css = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*eslint-disable prefer-arrow-callback*/
(0, _common.forEach)({
  data: _data.jqueryLiteData,

  removeAttr: function removeAttr(element, name) {
    element.removeAttribute(name);
  },


  hasClass: _css.hasClass,

  css: function css(element, name, value) {
    name = (0, _common.camelCase)(name);

    if ((0, _common.isDefined)(value)) {
      element.style[name] = value;
    } else {
      var val = void 0;

      if (_common.msie <= 8) {
        // this is some IE specific weirdness that jQuery 1.6.4 does not sure why
        val = element.currentStyle && element.currentStyle[name];
        if (val === '') val = 'auto';
      }

      val = val || element.style[name];

      if (_common.msie <= 8) {
        // jquery weirdness :-/
        val = val === '' ? undefined : val;
      }

      return val;
    }
  },
  attr: function attr(element, name, value) {
    var lowercasedName = (0, _common.lowercase)(name);
    if (_dom.BOOLEAN_ATTR[lowercasedName]) {
      if ((0, _common.isDefined)(value)) {
        if (value) {
          element[name] = true;
          element.setAttribute(name, lowercasedName);
        } else {
          element[name] = false;
          element.removeAttribute(lowercasedName);
        }
      } else {
        return element[name] || (element.attributes.getNamedItem(name) || _common.noop).specified ? lowercasedName : undefined;
      }
    } else if ((0, _common.isDefined)(value)) {
      element.setAttribute(name, value);
    } else if (element.getAttribute) {
      // the extra argument "2" is to get the right thing for a.href in IE, see jQuery code
      // some elements (e.g. Document) don't have get attribute, so return undefined
      var ret = element.getAttribute(name, 2);
      // normalize non-existing attributes to undefined (as jQuery)
      return ret === null ? undefined : ret;
    }
  },
  prop: function prop(element, name, value) {
    if ((0, _common.isDefined)(value)) {
      element[name] = value;
    } else {
      return element[name];
    }
  },


  text: function () {
    var NODE_TYPE_TEXT_PROPERTY = [];
    if (_common.msie < 9) {
      NODE_TYPE_TEXT_PROPERTY[1] = 'innerText';
      /** Element **/
      NODE_TYPE_TEXT_PROPERTY[3] = 'nodeValue';
      /** Text **/
    } else {
      NODE_TYPE_TEXT_PROPERTY[1] = /** Element **/
      NODE_TYPE_TEXT_PROPERTY[3] = 'textContent';
      /** Text **/
    }
    getText.$dv = '';
    return getText;

    function getText(element, value) {
      var textProp = NODE_TYPE_TEXT_PROPERTY[element.nodeType];
      if ((0, _common.isUndefined)(value)) {
        return textProp ? element[textProp] : '';
      }
      element[textProp] = value;
    }
  }(),

  val: function val(element, value) {
    if ((0, _common.isUndefined)(value)) {
      var nodeName = element.nodeName ? element.nodeName : element[0].nodeName;
      if (nodeName === 'SELECT' && element.multiple) {
        var _ret = function () {
          var result = [];
          (0, _common.forEach)(element.options, function (option) {
            if (option.selected) {
              result.push(option.value || option.text);
            }
          });
          return {
            v: result.length === 0 ? null : result
          };
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
      }
      return element.value;
    }
    element.value = value;
  },
  html: function html(element, value) {
    if ((0, _common.isUndefined)(value)) {
      return element.innerHTML;
    }
    for (var i = 0, childNodes = element.childNodes; i < childNodes.length; i++) {
      (0, _dom.dealoc)(childNodes[i]);
    }
    element.innerHTML = value;
  },

  empty: _dom.empty
}, function (fn, name) {
  /**
   * Properties: writes return selection, reads return first value
   */
  _JQueryLite2.default.prototype[name] = function (arg1, arg2) {
    var i = void 0,
        key = void 0;
    var nodeCount = this.length;

    // jqLiteHasClass has only two arguments, but is a getter-only fn, so we need to special-case it
    // in a way that survives minification.
    // jqLiteEmpty takes no arguments but is a setter.
    if (fn !== _dom.empty && (fn.length === 2 && fn !== _css.hasClass ? arg1 : arg2) === undefined) {
      if ((0, _common.isObject)(arg1)) {

        // we are a write, but the object properties are the key/values
        for (i = 0; i < nodeCount; i++) {
          if (fn === _data.jqueryLiteData) {
            // data() takes the whole object in jQuery
            fn(this[i], arg1);
          } else {
            /*eslint-disable guard-for-in*/
            for (key in arg1) {
              fn(this[i], key, arg1[key]);
            }
          }
        }
        // return self for chaining
        return this;
      } else {
        return nodeCount > 0 ? fn(this[0], arg1, arg2) : undefined;
      }
    } else {
      // we are a write, so apply to all children
      for (i = 0; i < nodeCount; i++) {
        fn(this[i], arg1, arg2);
      }
      // return self for chaining
      return this;
    }
  };
});

//////////////////////////////////////////
// Functions iterating traversal.
// These functions chain results into a single
// selector.
//////////////////////////////////////////
(0, _common.forEach)({
  removeData: _data.removeData,

  dealoc: _dom.dealoc,

  on: function onFn(element, type, fn, unsupported) {
    if ((0, _common.isDefined)(unsupported)) {
      throw (0, _jqError.jqLiteErr)('onargs', 'jqLite#on() does not support the `selector` or `eventData` parameters');
    }

    var events = (0, _data.expandoStore)(element, 'events'),
        handle = (0, _data.expandoStore)(element, 'handle');

    if (!events) (0, _data.expandoStore)(element, 'events', events = {});
    if (!handle) (0, _data.expandoStore)(element, 'handle', handle = (0, _event.createEventHandler)(element, events));

    (0, _common.forEach)(type.split(' '), function (type) {
      var eventFns = events[type];

      if (!eventFns) {
        if (type === 'mouseenter' || type === 'mouseleave') {
          (function () {
            var contains = document.body.contains || document.body.compareDocumentPosition ? function (a, b) {
              var adown = a.nodeType === 9 ? a.documentElement : a,
                  bup = b && b.parentNode;
              /*eslint-disable no-bitwise*/
              return a === bup || Boolean(bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
            } : function (a, b) {
              if (b) {
                while (b = b.parentNode) {
                  if (b === a) {
                    return true;
                  }
                }
              }
              return false;
            };

            events[type] = [];

            // Refer to jQuery's implementation of mouseenter & mouseleave
            // Read about mouseenter and mouseleave:
            // http://www.quirksmode.org/js/events_mouse.html#link8
            var eventmap = { mouseleave: 'mouseout', mouseenter: 'mouseover' };

            onFn(element, eventmap[type], function (event) {
              /*eslint-disable consistent-this*/
              var target = this,
                  related = event.relatedTarget;
              // For mousenter/leave call the handler if related is outside the target.
              // NB: No relatedTarget if the mouse left/entered the browser window
              if (!related || related !== target && !contains(target, related)) {
                handle(event, type);
              }
            });
          })();
        } else {
          (0, _event.addEventListenerFn)(element, type, handle);
          events[type] = [];
        }
        eventFns = events[type];
      }
      eventFns.push(fn);
    });
  },

  off: _event.off,

  one: function one(element, type, fn) {
    element = (0, _JQueryLite2.default)(element);

    //add the listener twice so that when it is called
    //you can remove the original function and still be
    //able to call element.off(ev, fn) normally
    element.on(type, function onFn() {
      element.off(type, fn);
      element.off(type, onFn);
    });
    element.on(type, fn);
  },
  replaceWith: function replaceWith(element, replaceNode) {
    var index = void 0;
    var parent = element.parentNode;
    (0, _dom.dealoc)(element);
    (0, _common.forEach)(new _JQueryLite2.default(replaceNode), function (node) {
      if (index) {
        parent.insertBefore(node, index.nextSibling);
      } else {
        parent.replaceChild(node, element);
      }
      index = node;
    });
  },
  children: function children(element) {
    var children = [];
    (0, _common.forEach)(element.childNodes, function (element) {
      if (element.nodeType === 1) {
        children.push(element);
      }
    });
    return children;
  },
  contents: function contents(element) {
    return element.contentDocument || element.childNodes || [];
  },
  append: function append(element, node) {
    (0, _common.forEach)(new _JQueryLite2.default(node), function (child) {
      if (element.nodeType === 1 || element.nodeType === 11) {
        element.appendChild(child);
      }
    });
  },
  prepend: function prepend(element, node) {
    if (element.nodeType === 1) {
      (function () {
        var index = element.firstChild;
        (0, _common.forEach)(new _JQueryLite2.default(node), function (child) {
          element.insertBefore(child, index);
        });
      })();
    }
  },
  wrap: function wrap(element, wrapNode) {
    wrapNode = (0, _JQueryLite2.default)(wrapNode)[0];
    var parent = element.parentNode;
    if (parent) {
      parent.replaceChild(wrapNode, element);
    }
    wrapNode.appendChild(element);
  },
  remove: function remove(element) {
    (0, _dom.dealoc)(element);
    var parent = element.parentNode;
    if (parent) {
      parent.removeChild(element);
    }
  },
  after: function after(element, newElement) {
    var index = element;
    var parent = element.parentNode;
    (0, _common.forEach)(new _JQueryLite2.default(newElement), function (node) {
      parent.insertBefore(node, index.nextSibling);
      index = node;
    });
  },


  addClass: _css.addClass,
  removeClass: _css.removeClass,

  toggleClass: function toggleClass(element, selector, condition) {
    if (selector) {
      (0, _common.forEach)(selector.split(' '), function (className) {
        var classCondition = condition;
        if ((0, _common.isUndefined)(classCondition)) {
          classCondition = !(0, _css.hasClass)(element, className);
        }
        (classCondition ? _css.addClass : _css.removeClass)(element, className);
      });
    }
  },
  parent: function parent(element) {
    var parent = element.parentNode;
    return parent && parent.nodeType !== 11 ? parent : null;
  },
  next: function next(element) {
    if (element.nextElementSibling) {
      return element.nextElementSibling;
    }

    // IE8 doesn't have nextElementSibling
    var elm = element.nextSibling;
    while (elm != null && elm.nodeType !== 1) {
      elm = elm.nextSibling;
    }
    return elm;
  },
  find: function find(element, selector) {
    if (element.getElementsByTagName) {
      return element.getElementsByTagName(selector);
    } else {
      return [];
    }
  },


  clone: _dom.cloneDom,

  triggerHandler: function triggerHandler(element, event, extraParameters) {

    var dummyEvent = void 0,
        eventFnsCopy = void 0,
        handlerArgs = void 0;
    var eventName = event.type || event;
    var eventFns = ((0, _data.expandoStore)(element, 'events') || {})[eventName];

    if (eventFns) {

      // Create a dummy event to pass to the handlers
      dummyEvent = {
        preventDefault: function preventDefault() {
          this.defaultPrevented = true;
        },
        isDefaultPrevented: function isDefaultPrevented() {
          return this.defaultPrevented === true;
        },

        stopPropagation: _common.noop,
        type: eventName,
        target: element
      };

      // If a custom event was provided then extend our dummy event with it
      if (event.type) {
        dummyEvent = (0, _common.extend)(dummyEvent, event);
      }

      // Copy event handlers in case event handlers array is modified during execution.
      eventFnsCopy = (0, _common.shallowCopy)(eventFns);
      handlerArgs = extraParameters ? [dummyEvent].concat(extraParameters) : [dummyEvent];

      (0, _common.forEach)(eventFnsCopy, function (fn) {
        fn.apply(element, handlerArgs);
      });
    }
  }
}, function (fn, name) {
  /**
   * chaining functions
   */
  _JQueryLite2.default.prototype[name] = function (arg1, arg2, arg3) {
    var value = void 0;
    for (var i = 0; i < this.length; i++) {
      if ((0, _common.isUndefined)(value)) {
        value = fn(this[i], arg1, arg2, arg3);
        if ((0, _common.isDefined)(value)) {
          // any function which returns a value needs to be wrapped
          value = (0, _JQueryLite2.default)(value);
        }
      } else {
        (0, _dom.addNodes)(value, fn(this[i], arg1, arg2, arg3));
      }
    }
    return (0, _common.isDefined)(value) ? value : this;
  };

  // bind legacy bind/unbind to on/off
  _JQueryLite2.default.prototype.bind = _JQueryLite2.default.prototype.on;
  _JQueryLite2.default.prototype.unbind = _JQueryLite2.default.prototype.off;
});

//对外暴露为 jQuery
var jQuery = _JQueryLite2.default;
exports.default = jQuery;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasClass = hasClass;
exports.removeClass = removeClass;
exports.addClass = addClass;

var _common = __webpack_require__(0);

function hasClass(element, selector) {
  if (!element.getAttribute) {
    return false;
  }
  var clazz = element.getAttribute('class') || '';
  clazz = (' ' + clazz + ' ').replace(/[\n\t]/g, ' ');
  return clazz.indexOf(' ' + selector + ' ') > -1;
}

function removeClass(element, cssClasses) {
  if (cssClasses && element.setAttribute) {
    (function () {
      var clazz = element.getAttribute('class') || '';
      clazz = (' ' + clazz + ' ').replace(/[\n\t]/g, ' ');

      cssClasses.split(' ').forEach(function (item) {
        element.setAttribute('class', (0, _common.trim)(clazz.replace(' ' + (0, _common.trim)(item) + ' ', ' ')));
      });
    })();
  }
}

function addClass(element, cssClasses) {
  if (cssClasses && element.classList) {
    cssClasses.split(' ').forEach(function (item) {
      element.classList.push(item);
    });
  } else if (cssClasses && element.setAttribute) {
    (function () {
      var clazz = element.getAttribute('class') || '';
      clazz = (' ' + clazz + ' ').replace(/[\n\t]/g, ' ');
      cssClasses.split(' ').forEach(function (item) {
        if (clazz.indexOf(' ' + (0, _common.trim)(item) + ' ') === -1) {
          clazz += item + ' ';
        }
      });

      element.setAttribute('class', (0, _common.trim)(clazz));
    })();
  }
}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jqNextId = jqNextId;
var jqId = 1;

function jqNextId() {
  return ++jqId;
}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(6);


/***/ }
/******/ ]);
});