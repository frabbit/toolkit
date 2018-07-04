"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.component = component;
/**
 * get vue component of any value if possible
 *
 * @param any element or vue component
 */
function isVue(any) {
  return any && any._isVue;
}

function getComponent(any) {
  return any && any.__vue__ ? any.__vue__ : null;
}

function hasComponent(any) {
  return getComponent(any) !== null;
}

function isElement(any) {
  return any && any.tagName;
}

/**
 * resolve vue component by elements
 *
 * @param any
 * @returns {*}
 */
function component(any) {
  if (isVue(any)) {
    return any;
  } else if (isElement(any)) {
    // this node is an component
    if (hasComponent(any)) {
      return getComponent(any);
    }

    // deep detection
    var parent = any;
    do {
      if (hasComponent(parent)) {
        return getComponent(parent);
      }

      parent = parent.parentNode;
    } while (parent && parent !== window);
  }

  return null;
}