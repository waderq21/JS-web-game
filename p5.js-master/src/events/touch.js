/**
 * @module Events
 * @submodule Touch
 * @for p5
 * @requires core
 */

'use strict';

var p5 = require('../core/core');

/**
 * The system variable touches[] contains an array of the positions of all
 * current touch points, relative to (0, 0) of the canvas, and IDs identifying a
 * unique touch as it moves. Each element in the array is an object with x, y,
 * and id properties.
 *
 * The touches[] array is not supported on Safari and IE on touch-based
 * desktops (laptops).
 *
 * @property {Object[]} touches
 * @readOnly
 */
p5.prototype.touches = [];

p5.prototype._updateTouchCoords = function(e) {
  if (this._curElement !== null) {
    var touches = [];
    for(var i = 0; i < e.touches.length; i++){
      touches[i] = getTouchInfo(this._curElement.elt,
        this.width, this.height, e, i);
    }
    this._setProperty('touches', touches);
  }
};


function getTouchInfo(canvas, w, h, e, i) {
  i = i || 0;
  var rect = canvas.getBoundingClientRect();
  var sx = canvas.scrollWidth / w;
  var sy = canvas.scrollHeight / h;
  var touch = e.touches[i] || e.changedTouches[i];
  return {
    x: (touch.clientX - rect.left) / sx,
    y: (touch.clientY - rect.top) / sy,
    winX: touch.clientX,
    winY: touch.clientY,
    id: touch.identifier
  };
}

/**
 * The touchStarted() function is called once after every time a touch is
 * registered. If no touchStarted() function is defined, the mousePressed()
 * function will be called instead if it is defined.<br><br>
 * Browsers may have different default behaviors attached to various touch
 * events. To prevent any default behavior for this event, add "return false"
 * to the end of the method.
 *
 * @method touchStarted
 * @example
 * <div>
 * <code>
 * // Touch within the image to change
 * // the value of the rectangle
 *
 * var value = 0;
 * function draw() {
 *   fill(value);
 *   rect(25, 25, 50, 50);
 * }
 * function touchStarted() {
 *   if (value == 0) {
 *     value = 255;
 *   } else {
 *     value = 0;
 *   }
 * }
 * </code>
 * </div>
 *
 * <div class="norender">
 * <code>
 * function touchStarted() {
 *   ellipse(mouseX, mouseY, 5, 5);
 *   // prevent default
 *   return false;
 * }
 * </code>
 * </div>
 *
 * @alt
 * 50x50 black rect turns white with touch event.
 * no image displayed
 */
p5.prototype._ontouchstart = function(e) {
  var context = this._isGlobal ? window : this;
  var executeDefault;
  this._setProperty('mouseIsPressed', true);
  this._updateTouchCoords(e);
  this._updateNextMouseCoords(e);
  if(typeof context.touchStarted === 'function') {
    executeDefault = context.touchStarted(e);
    if(executeDefault === false) {
      e.preventDefault();
    }
  } else if (typeof context.mousePressed === 'function') {
    executeDefault = context.mousePressed(e);
    if(executeDefault === false) {
      e.preventDefault();
    }
  }
};

/**
 * The touchMoved() function is called every time a touch move is registered.
 * If no touchMoved() function is defined, the mouseDragged() function will
 * be called instead if it is defined.<br><br>
 * Browsers may have different default behaviors attached to various touch
 * events. To prevent any default behavior for this event, add "return false"
 * to the end of the method.
 *
 * @method touchMoved
 * @example
 * <div>
 * <code>
 * // Move your finger across the page
 * // to change its value
 *
 * var value = 0;
 * function draw() {
 *   fill(value);
 *   rect(25, 25, 50, 50);
 * }
 * function touchMoved() {
 *   value = value + 5;
 *   if (value > 255) {
 *     value = 0;
 *   }
 * }
 * </code>
 * </div>
 *
 * <div class="norender">
 * <code>
 * function touchMoved() {
 *   ellipse(mouseX, mouseY, 5, 5);
 *   // prevent default
 *   return false;
 * }
 * </code>
 * </div>
 *
 * @alt
 * 50x50 black rect turns lighter with touch until white. resets
 * no image displayed
 *
 */
p5.prototype._ontouchmove = function(e) {
  var context = this._isGlobal ? window : this;
  var executeDefault;
  this._updateTouchCoords(e);
  this._updateNextMouseCoords(e);
  if (typeof context.touchMoved === 'function') {
    executeDefault = context.touchMoved(e);
    if(executeDefault === false) {
      e.preventDefault();
    }
  } else if (typeof context.mouseDragged === 'function') {
    executeDefault = context.mouseDragged(e);
    if(executeDefault === false) {
      e.preventDefault();
    }
  }
};

/**
 * The touchEnded() function is called every time a touch ends. If no
 * touchEnded() function is defined, the mouseReleased() function will be
 * called instead if it is defined.<br><br>
 * Browsers may have different default behaviors attached to various touch
 * events. To prevent any default behavior for this event, add "return false"
 * to the end of the method.
 *
 * @method touchEnded
 * @example
 * <div>
 * <code>
 * // Release touch within the image to
 * // change the value of the rectangle
 *
 * var value = 0;
 * function draw() {
 *   fill(value);
 *   rect(25, 25, 50, 50);
 * }
 * function touchEnded() {
 *   if (value == 0) {
 *     value = 255;
 *   } else {
 *     value = 0;
 *   }
 * }
 * </code>
 * </div>
 *
 * <div class="norender">
 * <code>
 * function touchEnded() {
 *   ellipse(mouseX, mouseY, 5, 5);
 *   // prevent default
 *   return false;
 * }
 * </code>
 * </div>
 *
 * @alt
 * 50x50 black rect turns white with touch.
 * no image displayed
 *
 */
p5.prototype._ontouchend = function(e) {
  this._setProperty('mouseIsPressed', false);
  this._updateTouchCoords(e);
  this._updateNextMouseCoords(e);
  var context = this._isGlobal ? window : this;
  var executeDefault;
  if (typeof context.touchEnded === 'function') {
    executeDefault = context.touchEnded(e);
    if(executeDefault === false) {
      e.preventDefault();
    }
  } else if (typeof context.mouseReleased === 'function') {
    executeDefault = context.mouseReleased(e);
    if(executeDefault === false) {
      e.preventDefault();
    }
  }
};

module.exports = p5;
