import JQueryLite from './JQueryLite';
import {
  isDefined, forEach, isObject, extend
} from './core/common';
import {off} from './event';
import {jqNextId} from './uuid';

JQueryLite.expando = 'jqlite339';

export const jqCache = JQueryLite.cache = {};

export function removeData(element, name) {
  const expandoId = element.jqlite339,
    expandoStore = jqCache[expandoId];

  if (expandoStore) {
    if (name) {
      delete jqCache[expandoId].data[name];
      return;
    }

    if (expandoStore.handle) {
      off(element);
    }
    delete jqCache[expandoId];
    element.ng339 = undefined; // don't delete DOM expandos. IE and Chrome don't like it
  }
}

export function expandoStore(element, key, value) {
  let expandoId = element.jqlite339,
    store = jqCache[expandoId || -1];

  if (isDefined(value)) {
    if (!expandoStore) {
      element.ng339 = expandoId = jqNextId();
      store = jqCache[expandoId] = {};
    }
    store[key] = value;
  } else {
    return store && store[key];
  }
}

export function jqueryLiteData(element, key, value) {
  let data = expandoStore(element, 'data');
  const isSetter = isDefined(value),
    keyDefined = !isSetter && isDefined(key),
    isSimpleGetter = keyDefined && !isObject(key);

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
        extend(data, key);
      }
    } else {
      return data;
    }
  }
}

forEach({
  data: jqueryLiteData,
  removeData,
}, (fn, name) => {
  JQueryLite[name] = fn;
});
