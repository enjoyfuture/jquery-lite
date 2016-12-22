'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jqCache = undefined;
exports.removeData = removeData;
exports.expandoStore = expandoStore;
exports.jqueryLiteData = jqueryLiteData;

var _JQueryLite = require('./JQueryLite');

var _JQueryLite2 = _interopRequireDefault(_JQueryLite);

var _common = require('./core/common');

var _event = require('./event');

var _uuid = require('./uuid');

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