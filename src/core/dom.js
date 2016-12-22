import {isDefined, isWindow, lowercase} from './common';
import {removeData} from '../data';

const SINGLE_TAG_REGEXP = /^<(\w+)\s*\/?>(?:<\/\1>|)$/;
const HTML_REGEXP = /<|&#?\w+;/;
const TAG_NAME_REGEXP = /<([\w:]+)/;
const XHTML_TAG_REGEXP = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi;

const wrapMap = {
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
  let tmp, tag, wrap, i, j, jj;
  const fragment = context.createDocumentFragment(),
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
    tmp.innerHTML = '<div>&#160;</div>' +
      wrap[1] + html.replace(XHTML_TAG_REGEXP, '<$1></$2>') + wrap[2];
    tmp.removeChild(tmp.firstChild);

    // Descend through wrappers to the right content
    i = wrap[0];
    while (i--) {
      tmp = tmp.lastChild;
    }

    for (j = 0, jj = tmp.childNodes.length; j < jj; ++j) nodes.push(tmp.childNodes[j]);

    tmp = fragment.firstChild;
    tmp.textContent = '';
  }

  // Remove wrapper from fragment
  fragment.textContent = '';
  fragment.innerHTML = ''; // Clear inner HTML
  return nodes;
}

// 格式化 html
export function parseHTML(html, context) {
  context = context || document;
  const parsed = SINGLE_TAG_REGEXP.exec(html);

  if (parsed) {
    return [context.createElement(parsed[1])];
  }

  return buildFragment(html, context);
}


//添加 node
export function addNodes(root, elements) {
  if (elements) {
    elements = (!elements.nodeName && isDefined(elements.length) && !isWindow(elements))
      ? elements
      : [elements];
    for (let i = 0; i < elements.length; i++) {
      root.push(elements[i]);
    }
  }
}

//clone dom 节点
export function cloneDom(element) {
  return element.cloneNode(true);
}

// 清理 oc
export function dealoc(element) {
  removeData(element);
  for (let i = 0, children = element.childNodes || []; i < children.length; i++) {
    dealoc(children[i]);
  }
}

//清空
export function empty(element) {
  for (let i = 0, childNodes = element.childNodes; i < childNodes.length; i++) {
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
const _BOOLEAN_ATTR = {};
'multiple,selected,checked,disabled,readOnly,required,open'.split(',').forEach((value) => {
  _BOOLEAN_ATTR[lowercase(value)] = value;
});

const _BOOLEAN_ELEMENTS = {};
'input,select,option,textarea,button,form,details'.split(',').forEach((value) => {
  _BOOLEAN_ELEMENTS[lowercase(value)] = value;
});

export const BOOLEAN_ATTR = _BOOLEAN_ATTR;
export const BOOLEAN_ELEMENTS = _BOOLEAN_ELEMENTS;

export function getBooleanAttrName(element, name) {
  // check dom last since we will most likely fail on name
  const booleanAttr = _BOOLEAN_ATTR[name.toLowerCase()];

  // booleanAttr is here twice to minimize DOM access
  return booleanAttr && _BOOLEAN_ELEMENTS[element.nodeName] && booleanAttr;
}
