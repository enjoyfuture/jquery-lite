'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeEventListenerFn = exports.addEventListenerFn = undefined;
exports.createEventHandler = createEventHandler;
exports.off = off;

var _common = require('./core/common');

var _jqError = require('./core/jqError');

var _data = require('./data');

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