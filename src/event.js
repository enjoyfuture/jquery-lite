import {
  isUndefined, forEach, msie,
  shallowCopy, isDefined, arrayRemove
} from './core/common';
import {jqLiteErr} from './core/jqError';
import {expandoStore} from './data';

//添加事件，兼容 ie 写法
export const addEventListenerFn = (window.document.addEventListener
  ? function (element, type, fn) {
    element.addEventListener(type, fn, false);
  }
  : function (element, type, fn) {
    element.attachEvent(`on${type}`, fn);
  });

//删除事件，兼容 ie 写法
export const removeEventListenerFn = (window.document.removeEventListener
  ? function (element, type, fn) {
    element.removeEventListener(type, fn, false);
  }
  : function (element, type, fn) {
    element.detachEvent(`on${type}`, fn);
  });

export function createEventHandler(element, events) {
  const eventHandler = function (event, type) {
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

    if (isUndefined(event.defaultPrevented)) {
      const prevent = event.preventDefault;
      event.preventDefault = function () {
        event.defaultPrevented = true;
        prevent.call(event);
      };
      event.defaultPrevented = false;
    }

    event.isDefaultPrevented = function () {
      return event.defaultPrevented || event.returnValue === false;
    };

    // Copy event handlers in case event handlers array is modified during execution.
    const eventHandlersCopy = shallowCopy(events[type || event.type] || []);

    forEach(eventHandlersCopy, (fn) => {
      fn.call(element, event);
    });

    // Remove monkey-patched methods (IE),
    // as they would cause memory leaks in IE8.
    if (msie <= 8) {
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
export function off(element, type, fn, unsupported) {
  if (isDefined(unsupported)) {
    throw jqLiteErr('offargs', 'jqLite#off() does not support the `selector` argument');
  }

  const events = expandoStore(element, 'events'),
    handle = expandoStore(element, 'handle');

  if (!handle) return; //no listeners registered

  if (isUndefined(type)) {
    forEach(events, (eventHandler, type) => {
      removeEventListenerFn(element, type, eventHandler);
      delete events[type];
    });
  } else {
    forEach(type.split(' '), (type) => {
      if (isUndefined(fn)) {
        removeEventListenerFn(element, type, events[type]);
        delete events[type];
      } else {
        arrayRemove(events[type] || [], fn);
      }
    });
  }
}