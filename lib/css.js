'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasClass = hasClass;
exports.removeClass = removeClass;
exports.addClass = addClass;

var _common = require('./core/common');

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