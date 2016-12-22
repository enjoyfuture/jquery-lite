import {
  forEach, camelCase, isDefined, msie,
  lowercase, noop, isUndefined, isObject,
  extend, shallowCopy
} from './core/common';
import {BOOLEAN_ATTR, dealoc, empty, cloneDom, addNodes} from './core/dom';
import {jqueryLiteData, removeData, expandoStore} from './data';
import JQueryLite from './JQueryLite';
import {jqLiteErr} from './core/jqError';
import {addEventListenerFn, createEventHandler, off} from './event';
import {addClass, hasClass, removeClass} from './css';


/*eslint-disable prefer-arrow-callback*/
forEach({
  data: jqueryLiteData,

  removeAttr(element, name) {
    element.removeAttribute(name);
  },

  hasClass,

  css (element, name, value) {
    name = camelCase(name);

    if (isDefined(value)) {
      element.style[name] = value;
    } else {
      let val;

      if (msie <= 8) {
        // this is some IE specific weirdness that jQuery 1.6.4 does not sure why
        val = element.currentStyle && element.currentStyle[name];
        if (val === '') val = 'auto';
      }

      val = val || element.style[name];

      if (msie <= 8) {
        // jquery weirdness :-/
        val = (val === '') ? undefined : val;
      }

      return val;
    }
  },

  attr(element, name, value) {
    const lowercasedName = lowercase(name);
    if (BOOLEAN_ATTR[lowercasedName]) {
      if (isDefined(value)) {
        if (value) {
          element[name] = true;
          element.setAttribute(name, lowercasedName);
        } else {
          element[name] = false;
          element.removeAttribute(lowercasedName);
        }
      } else {
        return (element[name] ||
        (element.attributes.getNamedItem(name) || noop).specified)
          ? lowercasedName
          : undefined;
      }
    } else if (isDefined(value)) {
      element.setAttribute(name, value);
    } else if (element.getAttribute) {
      // the extra argument "2" is to get the right thing for a.href in IE, see jQuery code
      // some elements (e.g. Document) don't have get attribute, so return undefined
      const ret = element.getAttribute(name, 2);
      // normalize non-existing attributes to undefined (as jQuery)
      return ret === null ? undefined : ret;
    }
  },

  prop(element, name, value) {
    if (isDefined(value)) {
      element[name] = value;
    } else {
      return element[name];
    }
  },

  text: (function () {
    const NODE_TYPE_TEXT_PROPERTY = [];
    if (msie < 9) {
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
      const textProp = NODE_TYPE_TEXT_PROPERTY[element.nodeType];
      if (isUndefined(value)) {
        return textProp ? element[textProp] : '';
      }
      element[textProp] = value;
    }
  }()),

  val(element, value) {
    if (isUndefined(value)) {
      const nodeName = element.nodeName ? element.nodeName : element[0].nodeName;
      if (nodeName === 'SELECT' && element.multiple) {
        const result = [];
        forEach(element.options, (option) => {
          if (option.selected) {
            result.push(option.value || option.text);
          }
        });
        return result.length === 0 ? null : result;
      }
      return element.value;
    }
    element.value = value;
  },

  html(element, value) {
    if (isUndefined(value)) {
      return element.innerHTML;
    }
    for (let i = 0, childNodes = element.childNodes; i < childNodes.length; i++) {
      dealoc(childNodes[i]);
    }
    element.innerHTML = value;
  },
  empty
}, function (fn, name) {
  /**
   * Properties: writes return selection, reads return first value
   */
  JQueryLite.prototype[name] = function (arg1, arg2) {
    let i, key;
    const nodeCount = this.length;

    // jqLiteHasClass has only two arguments, but is a getter-only fn, so we need to special-case it
    // in a way that survives minification.
    // jqLiteEmpty takes no arguments but is a setter.
    if (fn !== empty &&
      (((fn.length === 2 && fn !== hasClass) ? arg1 : arg2) === undefined)) {
      if (isObject(arg1)) {

        // we are a write, but the object properties are the key/values
        for (i = 0; i < nodeCount; i++) {
          if (fn === jqueryLiteData) {
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
forEach({
  removeData,

  dealoc,

  on: function onFn(element, type, fn, unsupported) {
    if (isDefined(unsupported)) {
      throw jqLiteErr('onargs', 'jqLite#on() does not support the `selector` or `eventData` parameters');
    }

    let events = expandoStore(element, 'events'),
      handle = expandoStore(element, 'handle');

    if (!events) expandoStore(element, 'events', events = {});
    if (!handle) expandoStore(element, 'handle', handle = createEventHandler(element, events));

    forEach(type.split(' '), function (type) {
      let eventFns = events[type];

      if (!eventFns) {
        if (type === 'mouseenter' || type === 'mouseleave') {
          const contains = document.body.contains || document.body.compareDocumentPosition ?
            function (a, b) {
              const adown = a.nodeType === 9 ? a.documentElement : a,
                bup = b && b.parentNode;
              /*eslint-disable no-bitwise*/
              return a === bup || Boolean(bup && bup.nodeType === 1 && (
                    adown.contains ?
                      adown.contains(bup) :
                      a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16
                  ));
            } : function (a, b) {
              if (b) {
                while ((b = b.parentNode)) {
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
          const eventmap = {mouseleave: 'mouseout', mouseenter: 'mouseover'};

          onFn(element, eventmap[type], function (event) {
            /*eslint-disable consistent-this*/
            const target = this, related = event.relatedTarget;
            // For mousenter/leave call the handler if related is outside the target.
            // NB: No relatedTarget if the mouse left/entered the browser window
            if (!related || (related !== target && !contains(target, related))) {
              handle(event, type);
            }
          });

        } else {
          addEventListenerFn(element, type, handle);
          events[type] = [];
        }
        eventFns = events[type];
      }
      eventFns.push(fn);
    });
  },

  off,

  one (element, type, fn) {
    element = JQueryLite(element);

    //add the listener twice so that when it is called
    //you can remove the original function and still be
    //able to call element.off(ev, fn) normally
    element.on(type, function onFn() {
      element.off(type, fn);
      element.off(type, onFn);
    });
    element.on(type, fn);
  },

  replaceWith (element, replaceNode) {
    let index;
    const parent = element.parentNode;
    dealoc(element);
    forEach(new JQueryLite(replaceNode), function (node) {
      if (index) {
        parent.insertBefore(node, index.nextSibling);
      } else {
        parent.replaceChild(node, element);
      }
      index = node;
    });
  },

  children (element) {
    const children = [];
    forEach(element.childNodes, function (element) {
      if (element.nodeType === 1) {
        children.push(element);
      }
    });
    return children;
  },

  contents (element) {
    return element.contentDocument || element.childNodes || [];
  },

  append (element, node) {
    forEach(new JQueryLite(node), function (child) {
      if (element.nodeType === 1 || element.nodeType === 11) {
        element.appendChild(child);
      }
    });
  },

  prepend (element, node) {
    if (element.nodeType === 1) {
      const index = element.firstChild;
      forEach(new JQueryLite(node), function (child) {
        element.insertBefore(child, index);
      });
    }
  },

  wrap (element, wrapNode) {
    wrapNode = JQueryLite(wrapNode)[0];
    const parent = element.parentNode;
    if (parent) {
      parent.replaceChild(wrapNode, element);
    }
    wrapNode.appendChild(element);
  },

  remove (element) {
    dealoc(element);
    const parent = element.parentNode;
    if (parent) {
      parent.removeChild(element);
    }
  },

  after (element, newElement) {
    let index = element;
    const parent = element.parentNode;
    forEach(new JQueryLite(newElement), function (node) {
      parent.insertBefore(node, index.nextSibling);
      index = node;
    });
  },

  addClass,
  removeClass,

  toggleClass (element, selector, condition) {
    if (selector) {
      forEach(selector.split(' '), function (className) {
        let classCondition = condition;
        if (isUndefined(classCondition)) {
          classCondition = !hasClass(element, className);
        }
        (classCondition ? addClass : removeClass)(element, className);
      });
    }
  },

  parent (element) {
    const parent = element.parentNode;
    return parent && parent.nodeType !== 11 ? parent : null;
  },

  next (element) {
    if (element.nextElementSibling) {
      return element.nextElementSibling;
    }

    // IE8 doesn't have nextElementSibling
    let elm = element.nextSibling;
    while (elm != null && elm.nodeType !== 1) {
      elm = elm.nextSibling;
    }
    return elm;
  },

  find (element, selector) {
    if (element.getElementsByTagName) {
      return element.getElementsByTagName(selector);
    } else {
      return [];
    }
  },

  clone: cloneDom,

  triggerHandler (element, event, extraParameters) {

    let dummyEvent, eventFnsCopy, handlerArgs;
    const eventName = event.type || event;
    const eventFns = (expandoStore(element, 'events') || {})[eventName];

    if (eventFns) {

      // Create a dummy event to pass to the handlers
      dummyEvent = {
        preventDefault () {
          this.defaultPrevented = true;
        },
        isDefaultPrevented () {
          return this.defaultPrevented === true;
        },
        stopPropagation: noop,
        type: eventName,
        target: element
      };

      // If a custom event was provided then extend our dummy event with it
      if (event.type) {
        dummyEvent = extend(dummyEvent, event);
      }

      // Copy event handlers in case event handlers array is modified during execution.
      eventFnsCopy = shallowCopy(eventFns);
      handlerArgs = extraParameters ? [dummyEvent].concat(extraParameters) : [dummyEvent];

      forEach(eventFnsCopy, function (fn) {
        fn.apply(element, handlerArgs);
      });

    }
  }
}, function (fn, name) {
  /**
   * chaining functions
   */
  JQueryLite.prototype[name] = function (arg1, arg2, arg3) {
    let value;
    for (let i = 0; i < this.length; i++) {
      if (isUndefined(value)) {
        value = fn(this[i], arg1, arg2, arg3);
        if (isDefined(value)) {
          // any function which returns a value needs to be wrapped
          value = JQueryLite(value);
        }
      } else {
        addNodes(value, fn(this[i], arg1, arg2, arg3));
      }
    }
    return isDefined(value) ? value : this;
  };

  // bind legacy bind/unbind to on/off
  JQueryLite.prototype.bind = JQueryLite.prototype.on;
  JQueryLite.prototype.unbind = JQueryLite.prototype.off;
});

//对外暴露为 jQuery
const jQuery = JQueryLite;
export default jQuery;