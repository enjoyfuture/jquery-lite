'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _common = require('./core/common');

var _dom = require('./core/dom');

var _data = require('./data');

var _JQueryLite = require('./JQueryLite');

var _JQueryLite2 = _interopRequireDefault(_JQueryLite);

var _jqError = require('./core/jqError');

var _event = require('./event');

var _css = require('./css');

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