import {trim} from './core/common';

export function hasClass(element, selector) {
  if (!element.getAttribute) {
    return false;
  }
  let clazz = element.getAttribute('class') || '';
  clazz = ` ${clazz} `.replace(/[\n\t]/g, ' ');
  return clazz.indexOf(` ${selector} `) > -1;
}

export function removeClass(element, cssClasses) {
  if (cssClasses && element.setAttribute) {
    let clazz = element.getAttribute('class') || '';
    clazz = ` ${clazz} `.replace(/[\n\t]/g, ' ');

    cssClasses.split(' ').forEach((item) => {
      element.setAttribute('class', trim(clazz.replace(` ${trim(item)} `, ' ')));
    })
  }
}

export function addClass(element, cssClasses) {
  if (cssClasses && element.classList) {
    cssClasses.split(' ').forEach((item) => {
      element.classList.push(item);
    });
  } else if (cssClasses && element.setAttribute) {
    let clazz = element.getAttribute('class') || '';
    clazz = ` ${clazz} `.replace(/[\n\t]/g, ' ');
    cssClasses.split(' ').forEach((item) => {
      if (clazz.indexOf(` ${trim(item)} `) === -1) {
        clazz += `${item} `;
      }
    });

    element.setAttribute('class', trim(clazz));
  }
}