import {toJson} from './common';

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

export default function jqError(module) {
  return function () {
    /*eslint-disable prefer-template*/
    const code = arguments[0],
      prefix = '[' + (module ? module + ':' : '') + code + '] ',
      template = arguments[1],
      templateArgs = arguments,
      stringify = function (obj) {
        if (typeof obj === 'function') {
          return obj.toString().replace(/ \{[\s\S]*$/, '');
        } else if (typeof obj === 'undefined') {
          return 'undefined';
        } else if (typeof obj !== 'string') {
          return JSON.stringify(obj);
        }
        return obj;
      };

    let message, i;

    message = prefix + template.replace(/\{\d+\}/g,
        (match) => {
          const index = Number(match.slice(1, -1));
          let arg;

          if (index + 2 < templateArgs.length) {
            arg = templateArgs[index + 2];
            if (typeof arg === 'function') {
              return arg.toString().replace(/ ?\{[\s\S]*$/, '');
            } else if (typeof arg === 'undefined') {
              return 'undefined';
            } else if (typeof arg !== 'string') {
              return toJson(arg);
            }
            return arg;
          }
          return match;
        });

    message = message + (module ? module + '/' : '') + code;
    for (i = 2; i < arguments.length; i++) {
      message = message + (i === 2 ? '?' : '&') + 'p' + (i - 2) + '=' +
        encodeURIComponent(stringify(arguments[i]));
    }

    return new Error(message);
  };
}

export const jqLiteErr = jqError('jqLite');