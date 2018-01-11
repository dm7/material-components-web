/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export function getAll(query, parentNode) {
  parentNode = parentNode || document;
  return [].slice.call(parentNode.querySelectorAll(query));
}

export function matches(elem, selector) {
  const nativeMatches = elem.matches
    || elem.webkitMatchesSelector
    || elem.mozMatchesSelector
    || elem.msMatchesSelector
    || elem.oMatchesSelector;
  return nativeMatches.call(elem, selector);
}

export function closest(elem, selector) {
  if (elem.closest) {
    return elem.closest(selector);
  }
  while (elem) {
    if (matches(elem, selector)) {
      return elem;
    }
    elem = elem.parentElement;
  }
  return null;
}

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
// From https://davidwalsh.name/javascript-debounce-function
export function debounce(func, wait, immediate) {
  let timeout;

  return function(...args) {
    const callNow = immediate && !timeout;

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      if (!immediate) {
        func.apply(this, args);
      }
    }, wait);

    if (callNow) {
      func.apply(this, args);
    }
  };
}
