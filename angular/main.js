(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./node_modules/hammerjs/hammer.js":
/*!*****************************************!*\
  !*** ./node_modules/hammerjs/hammer.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*! Hammer.JS - v2.0.7 - 2016-04-22
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */
(function(window, document, exportName, undefined) {
  'use strict';

var VENDOR_PREFIXES = ['', 'webkit', 'Moz', 'MS', 'ms', 'o'];
var TEST_ELEMENT = document.createElement('div');

var TYPE_FUNCTION = 'function';

var round = Math.round;
var abs = Math.abs;
var now = Date.now;

/**
 * set a timeout with a given scope
 * @param {Function} fn
 * @param {Number} timeout
 * @param {Object} context
 * @returns {number}
 */
function setTimeoutContext(fn, timeout, context) {
    return setTimeout(bindFn(fn, context), timeout);
}

/**
 * if the argument is an array, we want to execute the fn on each entry
 * if it aint an array we don't want to do a thing.
 * this is used by all the methods that accept a single and array argument.
 * @param {*|Array} arg
 * @param {String} fn
 * @param {Object} [context]
 * @returns {Boolean}
 */
function invokeArrayArg(arg, fn, context) {
    if (Array.isArray(arg)) {
        each(arg, context[fn], context);
        return true;
    }
    return false;
}

/**
 * walk objects and arrays
 * @param {Object} obj
 * @param {Function} iterator
 * @param {Object} context
 */
function each(obj, iterator, context) {
    var i;

    if (!obj) {
        return;
    }

    if (obj.forEach) {
        obj.forEach(iterator, context);
    } else if (obj.length !== undefined) {
        i = 0;
        while (i < obj.length) {
            iterator.call(context, obj[i], i, obj);
            i++;
        }
    } else {
        for (i in obj) {
            obj.hasOwnProperty(i) && iterator.call(context, obj[i], i, obj);
        }
    }
}

/**
 * wrap a method with a deprecation warning and stack trace
 * @param {Function} method
 * @param {String} name
 * @param {String} message
 * @returns {Function} A new function wrapping the supplied method.
 */
function deprecate(method, name, message) {
    var deprecationMessage = 'DEPRECATED METHOD: ' + name + '\n' + message + ' AT \n';
    return function() {
        var e = new Error('get-stack-trace');
        var stack = e && e.stack ? e.stack.replace(/^[^\(]+?[\n$]/gm, '')
            .replace(/^\s+at\s+/gm, '')
            .replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@') : 'Unknown Stack Trace';

        var log = window.console && (window.console.warn || window.console.log);
        if (log) {
            log.call(window.console, deprecationMessage, stack);
        }
        return method.apply(this, arguments);
    };
}

/**
 * extend object.
 * means that properties in dest will be overwritten by the ones in src.
 * @param {Object} target
 * @param {...Object} objects_to_assign
 * @returns {Object} target
 */
var assign;
if (typeof Object.assign !== 'function') {
    assign = function assign(target) {
        if (target === undefined || target === null) {
            throw new TypeError('Cannot convert undefined or null to object');
        }

        var output = Object(target);
        for (var index = 1; index < arguments.length; index++) {
            var source = arguments[index];
            if (source !== undefined && source !== null) {
                for (var nextKey in source) {
                    if (source.hasOwnProperty(nextKey)) {
                        output[nextKey] = source[nextKey];
                    }
                }
            }
        }
        return output;
    };
} else {
    assign = Object.assign;
}

/**
 * extend object.
 * means that properties in dest will be overwritten by the ones in src.
 * @param {Object} dest
 * @param {Object} src
 * @param {Boolean} [merge=false]
 * @returns {Object} dest
 */
var extend = deprecate(function extend(dest, src, merge) {
    var keys = Object.keys(src);
    var i = 0;
    while (i < keys.length) {
        if (!merge || (merge && dest[keys[i]] === undefined)) {
            dest[keys[i]] = src[keys[i]];
        }
        i++;
    }
    return dest;
}, 'extend', 'Use `assign`.');

/**
 * merge the values from src in the dest.
 * means that properties that exist in dest will not be overwritten by src
 * @param {Object} dest
 * @param {Object} src
 * @returns {Object} dest
 */
var merge = deprecate(function merge(dest, src) {
    return extend(dest, src, true);
}, 'merge', 'Use `assign`.');

/**
 * simple class inheritance
 * @param {Function} child
 * @param {Function} base
 * @param {Object} [properties]
 */
function inherit(child, base, properties) {
    var baseP = base.prototype,
        childP;

    childP = child.prototype = Object.create(baseP);
    childP.constructor = child;
    childP._super = baseP;

    if (properties) {
        assign(childP, properties);
    }
}

/**
 * simple function bind
 * @param {Function} fn
 * @param {Object} context
 * @returns {Function}
 */
function bindFn(fn, context) {
    return function boundFn() {
        return fn.apply(context, arguments);
    };
}

/**
 * let a boolean value also be a function that must return a boolean
 * this first item in args will be used as the context
 * @param {Boolean|Function} val
 * @param {Array} [args]
 * @returns {Boolean}
 */
function boolOrFn(val, args) {
    if (typeof val == TYPE_FUNCTION) {
        return val.apply(args ? args[0] || undefined : undefined, args);
    }
    return val;
}

/**
 * use the val2 when val1 is undefined
 * @param {*} val1
 * @param {*} val2
 * @returns {*}
 */
function ifUndefined(val1, val2) {
    return (val1 === undefined) ? val2 : val1;
}

/**
 * addEventListener with multiple events at once
 * @param {EventTarget} target
 * @param {String} types
 * @param {Function} handler
 */
function addEventListeners(target, types, handler) {
    each(splitStr(types), function(type) {
        target.addEventListener(type, handler, false);
    });
}

/**
 * removeEventListener with multiple events at once
 * @param {EventTarget} target
 * @param {String} types
 * @param {Function} handler
 */
function removeEventListeners(target, types, handler) {
    each(splitStr(types), function(type) {
        target.removeEventListener(type, handler, false);
    });
}

/**
 * find if a node is in the given parent
 * @method hasParent
 * @param {HTMLElement} node
 * @param {HTMLElement} parent
 * @return {Boolean} found
 */
function hasParent(node, parent) {
    while (node) {
        if (node == parent) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
}

/**
 * small indexOf wrapper
 * @param {String} str
 * @param {String} find
 * @returns {Boolean} found
 */
function inStr(str, find) {
    return str.indexOf(find) > -1;
}

/**
 * split string on whitespace
 * @param {String} str
 * @returns {Array} words
 */
function splitStr(str) {
    return str.trim().split(/\s+/g);
}

/**
 * find if a array contains the object using indexOf or a simple polyFill
 * @param {Array} src
 * @param {String} find
 * @param {String} [findByKey]
 * @return {Boolean|Number} false when not found, or the index
 */
function inArray(src, find, findByKey) {
    if (src.indexOf && !findByKey) {
        return src.indexOf(find);
    } else {
        var i = 0;
        while (i < src.length) {
            if ((findByKey && src[i][findByKey] == find) || (!findByKey && src[i] === find)) {
                return i;
            }
            i++;
        }
        return -1;
    }
}

/**
 * convert array-like objects to real arrays
 * @param {Object} obj
 * @returns {Array}
 */
function toArray(obj) {
    return Array.prototype.slice.call(obj, 0);
}

/**
 * unique array with objects based on a key (like 'id') or just by the array's value
 * @param {Array} src [{id:1},{id:2},{id:1}]
 * @param {String} [key]
 * @param {Boolean} [sort=False]
 * @returns {Array} [{id:1},{id:2}]
 */
function uniqueArray(src, key, sort) {
    var results = [];
    var values = [];
    var i = 0;

    while (i < src.length) {
        var val = key ? src[i][key] : src[i];
        if (inArray(values, val) < 0) {
            results.push(src[i]);
        }
        values[i] = val;
        i++;
    }

    if (sort) {
        if (!key) {
            results = results.sort();
        } else {
            results = results.sort(function sortUniqueArray(a, b) {
                return a[key] > b[key];
            });
        }
    }

    return results;
}

/**
 * get the prefixed property
 * @param {Object} obj
 * @param {String} property
 * @returns {String|Undefined} prefixed
 */
function prefixed(obj, property) {
    var prefix, prop;
    var camelProp = property[0].toUpperCase() + property.slice(1);

    var i = 0;
    while (i < VENDOR_PREFIXES.length) {
        prefix = VENDOR_PREFIXES[i];
        prop = (prefix) ? prefix + camelProp : property;

        if (prop in obj) {
            return prop;
        }
        i++;
    }
    return undefined;
}

/**
 * get a unique id
 * @returns {number} uniqueId
 */
var _uniqueId = 1;
function uniqueId() {
    return _uniqueId++;
}

/**
 * get the window object of an element
 * @param {HTMLElement} element
 * @returns {DocumentView|Window}
 */
function getWindowForElement(element) {
    var doc = element.ownerDocument || element;
    return (doc.defaultView || doc.parentWindow || window);
}

var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;

var SUPPORT_TOUCH = ('ontouchstart' in window);
var SUPPORT_POINTER_EVENTS = prefixed(window, 'PointerEvent') !== undefined;
var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent);

var INPUT_TYPE_TOUCH = 'touch';
var INPUT_TYPE_PEN = 'pen';
var INPUT_TYPE_MOUSE = 'mouse';
var INPUT_TYPE_KINECT = 'kinect';

var COMPUTE_INTERVAL = 25;

var INPUT_START = 1;
var INPUT_MOVE = 2;
var INPUT_END = 4;
var INPUT_CANCEL = 8;

var DIRECTION_NONE = 1;
var DIRECTION_LEFT = 2;
var DIRECTION_RIGHT = 4;
var DIRECTION_UP = 8;
var DIRECTION_DOWN = 16;

var DIRECTION_HORIZONTAL = DIRECTION_LEFT | DIRECTION_RIGHT;
var DIRECTION_VERTICAL = DIRECTION_UP | DIRECTION_DOWN;
var DIRECTION_ALL = DIRECTION_HORIZONTAL | DIRECTION_VERTICAL;

var PROPS_XY = ['x', 'y'];
var PROPS_CLIENT_XY = ['clientX', 'clientY'];

/**
 * create new input type manager
 * @param {Manager} manager
 * @param {Function} callback
 * @returns {Input}
 * @constructor
 */
function Input(manager, callback) {
    var self = this;
    this.manager = manager;
    this.callback = callback;
    this.element = manager.element;
    this.target = manager.options.inputTarget;

    // smaller wrapper around the handler, for the scope and the enabled state of the manager,
    // so when disabled the input events are completely bypassed.
    this.domHandler = function(ev) {
        if (boolOrFn(manager.options.enable, [manager])) {
            self.handler(ev);
        }
    };

    this.init();

}

Input.prototype = {
    /**
     * should handle the inputEvent data and trigger the callback
     * @virtual
     */
    handler: function() { },

    /**
     * bind the events
     */
    init: function() {
        this.evEl && addEventListeners(this.element, this.evEl, this.domHandler);
        this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler);
        this.evWin && addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
    },

    /**
     * unbind the events
     */
    destroy: function() {
        this.evEl && removeEventListeners(this.element, this.evEl, this.domHandler);
        this.evTarget && removeEventListeners(this.target, this.evTarget, this.domHandler);
        this.evWin && removeEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
    }
};

/**
 * create new input type manager
 * called by the Manager constructor
 * @param {Hammer} manager
 * @returns {Input}
 */
function createInputInstance(manager) {
    var Type;
    var inputClass = manager.options.inputClass;

    if (inputClass) {
        Type = inputClass;
    } else if (SUPPORT_POINTER_EVENTS) {
        Type = PointerEventInput;
    } else if (SUPPORT_ONLY_TOUCH) {
        Type = TouchInput;
    } else if (!SUPPORT_TOUCH) {
        Type = MouseInput;
    } else {
        Type = TouchMouseInput;
    }
    return new (Type)(manager, inputHandler);
}

/**
 * handle input events
 * @param {Manager} manager
 * @param {String} eventType
 * @param {Object} input
 */
function inputHandler(manager, eventType, input) {
    var pointersLen = input.pointers.length;
    var changedPointersLen = input.changedPointers.length;
    var isFirst = (eventType & INPUT_START && (pointersLen - changedPointersLen === 0));
    var isFinal = (eventType & (INPUT_END | INPUT_CANCEL) && (pointersLen - changedPointersLen === 0));

    input.isFirst = !!isFirst;
    input.isFinal = !!isFinal;

    if (isFirst) {
        manager.session = {};
    }

    // source event is the normalized value of the domEvents
    // like 'touchstart, mouseup, pointerdown'
    input.eventType = eventType;

    // compute scale, rotation etc
    computeInputData(manager, input);

    // emit secret event
    manager.emit('hammer.input', input);

    manager.recognize(input);
    manager.session.prevInput = input;
}

/**
 * extend the data with some usable properties like scale, rotate, velocity etc
 * @param {Object} manager
 * @param {Object} input
 */
function computeInputData(manager, input) {
    var session = manager.session;
    var pointers = input.pointers;
    var pointersLength = pointers.length;

    // store the first input to calculate the distance and direction
    if (!session.firstInput) {
        session.firstInput = simpleCloneInputData(input);
    }

    // to compute scale and rotation we need to store the multiple touches
    if (pointersLength > 1 && !session.firstMultiple) {
        session.firstMultiple = simpleCloneInputData(input);
    } else if (pointersLength === 1) {
        session.firstMultiple = false;
    }

    var firstInput = session.firstInput;
    var firstMultiple = session.firstMultiple;
    var offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;

    var center = input.center = getCenter(pointers);
    input.timeStamp = now();
    input.deltaTime = input.timeStamp - firstInput.timeStamp;

    input.angle = getAngle(offsetCenter, center);
    input.distance = getDistance(offsetCenter, center);

    computeDeltaXY(session, input);
    input.offsetDirection = getDirection(input.deltaX, input.deltaY);

    var overallVelocity = getVelocity(input.deltaTime, input.deltaX, input.deltaY);
    input.overallVelocityX = overallVelocity.x;
    input.overallVelocityY = overallVelocity.y;
    input.overallVelocity = (abs(overallVelocity.x) > abs(overallVelocity.y)) ? overallVelocity.x : overallVelocity.y;

    input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
    input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;

    input.maxPointers = !session.prevInput ? input.pointers.length : ((input.pointers.length >
        session.prevInput.maxPointers) ? input.pointers.length : session.prevInput.maxPointers);

    computeIntervalInputData(session, input);

    // find the correct target
    var target = manager.element;
    if (hasParent(input.srcEvent.target, target)) {
        target = input.srcEvent.target;
    }
    input.target = target;
}

function computeDeltaXY(session, input) {
    var center = input.center;
    var offset = session.offsetDelta || {};
    var prevDelta = session.prevDelta || {};
    var prevInput = session.prevInput || {};

    if (input.eventType === INPUT_START || prevInput.eventType === INPUT_END) {
        prevDelta = session.prevDelta = {
            x: prevInput.deltaX || 0,
            y: prevInput.deltaY || 0
        };

        offset = session.offsetDelta = {
            x: center.x,
            y: center.y
        };
    }

    input.deltaX = prevDelta.x + (center.x - offset.x);
    input.deltaY = prevDelta.y + (center.y - offset.y);
}

/**
 * velocity is calculated every x ms
 * @param {Object} session
 * @param {Object} input
 */
function computeIntervalInputData(session, input) {
    var last = session.lastInterval || input,
        deltaTime = input.timeStamp - last.timeStamp,
        velocity, velocityX, velocityY, direction;

    if (input.eventType != INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined)) {
        var deltaX = input.deltaX - last.deltaX;
        var deltaY = input.deltaY - last.deltaY;

        var v = getVelocity(deltaTime, deltaX, deltaY);
        velocityX = v.x;
        velocityY = v.y;
        velocity = (abs(v.x) > abs(v.y)) ? v.x : v.y;
        direction = getDirection(deltaX, deltaY);

        session.lastInterval = input;
    } else {
        // use latest velocity info if it doesn't overtake a minimum period
        velocity = last.velocity;
        velocityX = last.velocityX;
        velocityY = last.velocityY;
        direction = last.direction;
    }

    input.velocity = velocity;
    input.velocityX = velocityX;
    input.velocityY = velocityY;
    input.direction = direction;
}

/**
 * create a simple clone from the input used for storage of firstInput and firstMultiple
 * @param {Object} input
 * @returns {Object} clonedInputData
 */
function simpleCloneInputData(input) {
    // make a simple copy of the pointers because we will get a reference if we don't
    // we only need clientXY for the calculations
    var pointers = [];
    var i = 0;
    while (i < input.pointers.length) {
        pointers[i] = {
            clientX: round(input.pointers[i].clientX),
            clientY: round(input.pointers[i].clientY)
        };
        i++;
    }

    return {
        timeStamp: now(),
        pointers: pointers,
        center: getCenter(pointers),
        deltaX: input.deltaX,
        deltaY: input.deltaY
    };
}

/**
 * get the center of all the pointers
 * @param {Array} pointers
 * @return {Object} center contains `x` and `y` properties
 */
function getCenter(pointers) {
    var pointersLength = pointers.length;

    // no need to loop when only one touch
    if (pointersLength === 1) {
        return {
            x: round(pointers[0].clientX),
            y: round(pointers[0].clientY)
        };
    }

    var x = 0, y = 0, i = 0;
    while (i < pointersLength) {
        x += pointers[i].clientX;
        y += pointers[i].clientY;
        i++;
    }

    return {
        x: round(x / pointersLength),
        y: round(y / pointersLength)
    };
}

/**
 * calculate the velocity between two points. unit is in px per ms.
 * @param {Number} deltaTime
 * @param {Number} x
 * @param {Number} y
 * @return {Object} velocity `x` and `y`
 */
function getVelocity(deltaTime, x, y) {
    return {
        x: x / deltaTime || 0,
        y: y / deltaTime || 0
    };
}

/**
 * get the direction between two points
 * @param {Number} x
 * @param {Number} y
 * @return {Number} direction
 */
function getDirection(x, y) {
    if (x === y) {
        return DIRECTION_NONE;
    }

    if (abs(x) >= abs(y)) {
        return x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
    }
    return y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
}

/**
 * calculate the absolute distance between two points
 * @param {Object} p1 {x, y}
 * @param {Object} p2 {x, y}
 * @param {Array} [props] containing x and y keys
 * @return {Number} distance
 */
function getDistance(p1, p2, props) {
    if (!props) {
        props = PROPS_XY;
    }
    var x = p2[props[0]] - p1[props[0]],
        y = p2[props[1]] - p1[props[1]];

    return Math.sqrt((x * x) + (y * y));
}

/**
 * calculate the angle between two coordinates
 * @param {Object} p1
 * @param {Object} p2
 * @param {Array} [props] containing x and y keys
 * @return {Number} angle
 */
function getAngle(p1, p2, props) {
    if (!props) {
        props = PROPS_XY;
    }
    var x = p2[props[0]] - p1[props[0]],
        y = p2[props[1]] - p1[props[1]];
    return Math.atan2(y, x) * 180 / Math.PI;
}

/**
 * calculate the rotation degrees between two pointersets
 * @param {Array} start array of pointers
 * @param {Array} end array of pointers
 * @return {Number} rotation
 */
function getRotation(start, end) {
    return getAngle(end[1], end[0], PROPS_CLIENT_XY) + getAngle(start[1], start[0], PROPS_CLIENT_XY);
}

/**
 * calculate the scale factor between two pointersets
 * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
 * @param {Array} start array of pointers
 * @param {Array} end array of pointers
 * @return {Number} scale
 */
function getScale(start, end) {
    return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
}

var MOUSE_INPUT_MAP = {
    mousedown: INPUT_START,
    mousemove: INPUT_MOVE,
    mouseup: INPUT_END
};

var MOUSE_ELEMENT_EVENTS = 'mousedown';
var MOUSE_WINDOW_EVENTS = 'mousemove mouseup';

/**
 * Mouse events input
 * @constructor
 * @extends Input
 */
function MouseInput() {
    this.evEl = MOUSE_ELEMENT_EVENTS;
    this.evWin = MOUSE_WINDOW_EVENTS;

    this.pressed = false; // mousedown state

    Input.apply(this, arguments);
}

inherit(MouseInput, Input, {
    /**
     * handle mouse events
     * @param {Object} ev
     */
    handler: function MEhandler(ev) {
        var eventType = MOUSE_INPUT_MAP[ev.type];

        // on start we want to have the left mouse button down
        if (eventType & INPUT_START && ev.button === 0) {
            this.pressed = true;
        }

        if (eventType & INPUT_MOVE && ev.which !== 1) {
            eventType = INPUT_END;
        }

        // mouse must be down
        if (!this.pressed) {
            return;
        }

        if (eventType & INPUT_END) {
            this.pressed = false;
        }

        this.callback(this.manager, eventType, {
            pointers: [ev],
            changedPointers: [ev],
            pointerType: INPUT_TYPE_MOUSE,
            srcEvent: ev
        });
    }
});

var POINTER_INPUT_MAP = {
    pointerdown: INPUT_START,
    pointermove: INPUT_MOVE,
    pointerup: INPUT_END,
    pointercancel: INPUT_CANCEL,
    pointerout: INPUT_CANCEL
};

// in IE10 the pointer types is defined as an enum
var IE10_POINTER_TYPE_ENUM = {
    2: INPUT_TYPE_TOUCH,
    3: INPUT_TYPE_PEN,
    4: INPUT_TYPE_MOUSE,
    5: INPUT_TYPE_KINECT // see https://twitter.com/jacobrossi/status/480596438489890816
};

var POINTER_ELEMENT_EVENTS = 'pointerdown';
var POINTER_WINDOW_EVENTS = 'pointermove pointerup pointercancel';

// IE10 has prefixed support, and case-sensitive
if (window.MSPointerEvent && !window.PointerEvent) {
    POINTER_ELEMENT_EVENTS = 'MSPointerDown';
    POINTER_WINDOW_EVENTS = 'MSPointerMove MSPointerUp MSPointerCancel';
}

/**
 * Pointer events input
 * @constructor
 * @extends Input
 */
function PointerEventInput() {
    this.evEl = POINTER_ELEMENT_EVENTS;
    this.evWin = POINTER_WINDOW_EVENTS;

    Input.apply(this, arguments);

    this.store = (this.manager.session.pointerEvents = []);
}

inherit(PointerEventInput, Input, {
    /**
     * handle mouse events
     * @param {Object} ev
     */
    handler: function PEhandler(ev) {
        var store = this.store;
        var removePointer = false;

        var eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');
        var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
        var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;

        var isTouch = (pointerType == INPUT_TYPE_TOUCH);

        // get index of the event in the store
        var storeIndex = inArray(store, ev.pointerId, 'pointerId');

        // start and mouse must be down
        if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {
            if (storeIndex < 0) {
                store.push(ev);
                storeIndex = store.length - 1;
            }
        } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
            removePointer = true;
        }

        // it not found, so the pointer hasn't been down (so it's probably a hover)
        if (storeIndex < 0) {
            return;
        }

        // update the event in the store
        store[storeIndex] = ev;

        this.callback(this.manager, eventType, {
            pointers: store,
            changedPointers: [ev],
            pointerType: pointerType,
            srcEvent: ev
        });

        if (removePointer) {
            // remove from the store
            store.splice(storeIndex, 1);
        }
    }
});

var SINGLE_TOUCH_INPUT_MAP = {
    touchstart: INPUT_START,
    touchmove: INPUT_MOVE,
    touchend: INPUT_END,
    touchcancel: INPUT_CANCEL
};

var SINGLE_TOUCH_TARGET_EVENTS = 'touchstart';
var SINGLE_TOUCH_WINDOW_EVENTS = 'touchstart touchmove touchend touchcancel';

/**
 * Touch events input
 * @constructor
 * @extends Input
 */
function SingleTouchInput() {
    this.evTarget = SINGLE_TOUCH_TARGET_EVENTS;
    this.evWin = SINGLE_TOUCH_WINDOW_EVENTS;
    this.started = false;

    Input.apply(this, arguments);
}

inherit(SingleTouchInput, Input, {
    handler: function TEhandler(ev) {
        var type = SINGLE_TOUCH_INPUT_MAP[ev.type];

        // should we handle the touch events?
        if (type === INPUT_START) {
            this.started = true;
        }

        if (!this.started) {
            return;
        }

        var touches = normalizeSingleTouches.call(this, ev, type);

        // when done, reset the started state
        if (type & (INPUT_END | INPUT_CANCEL) && touches[0].length - touches[1].length === 0) {
            this.started = false;
        }

        this.callback(this.manager, type, {
            pointers: touches[0],
            changedPointers: touches[1],
            pointerType: INPUT_TYPE_TOUCH,
            srcEvent: ev
        });
    }
});

/**
 * @this {TouchInput}
 * @param {Object} ev
 * @param {Number} type flag
 * @returns {undefined|Array} [all, changed]
 */
function normalizeSingleTouches(ev, type) {
    var all = toArray(ev.touches);
    var changed = toArray(ev.changedTouches);

    if (type & (INPUT_END | INPUT_CANCEL)) {
        all = uniqueArray(all.concat(changed), 'identifier', true);
    }

    return [all, changed];
}

var TOUCH_INPUT_MAP = {
    touchstart: INPUT_START,
    touchmove: INPUT_MOVE,
    touchend: INPUT_END,
    touchcancel: INPUT_CANCEL
};

var TOUCH_TARGET_EVENTS = 'touchstart touchmove touchend touchcancel';

/**
 * Multi-user touch events input
 * @constructor
 * @extends Input
 */
function TouchInput() {
    this.evTarget = TOUCH_TARGET_EVENTS;
    this.targetIds = {};

    Input.apply(this, arguments);
}

inherit(TouchInput, Input, {
    handler: function MTEhandler(ev) {
        var type = TOUCH_INPUT_MAP[ev.type];
        var touches = getTouches.call(this, ev, type);
        if (!touches) {
            return;
        }

        this.callback(this.manager, type, {
            pointers: touches[0],
            changedPointers: touches[1],
            pointerType: INPUT_TYPE_TOUCH,
            srcEvent: ev
        });
    }
});

/**
 * @this {TouchInput}
 * @param {Object} ev
 * @param {Number} type flag
 * @returns {undefined|Array} [all, changed]
 */
function getTouches(ev, type) {
    var allTouches = toArray(ev.touches);
    var targetIds = this.targetIds;

    // when there is only one touch, the process can be simplified
    if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
        targetIds[allTouches[0].identifier] = true;
        return [allTouches, allTouches];
    }

    var i,
        targetTouches,
        changedTouches = toArray(ev.changedTouches),
        changedTargetTouches = [],
        target = this.target;

    // get target touches from touches
    targetTouches = allTouches.filter(function(touch) {
        return hasParent(touch.target, target);
    });

    // collect touches
    if (type === INPUT_START) {
        i = 0;
        while (i < targetTouches.length) {
            targetIds[targetTouches[i].identifier] = true;
            i++;
        }
    }

    // filter changed touches to only contain touches that exist in the collected target ids
    i = 0;
    while (i < changedTouches.length) {
        if (targetIds[changedTouches[i].identifier]) {
            changedTargetTouches.push(changedTouches[i]);
        }

        // cleanup removed touches
        if (type & (INPUT_END | INPUT_CANCEL)) {
            delete targetIds[changedTouches[i].identifier];
        }
        i++;
    }

    if (!changedTargetTouches.length) {
        return;
    }

    return [
        // merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
        uniqueArray(targetTouches.concat(changedTargetTouches), 'identifier', true),
        changedTargetTouches
    ];
}

/**
 * Combined touch and mouse input
 *
 * Touch has a higher priority then mouse, and while touching no mouse events are allowed.
 * This because touch devices also emit mouse events while doing a touch.
 *
 * @constructor
 * @extends Input
 */

var DEDUP_TIMEOUT = 2500;
var DEDUP_DISTANCE = 25;

function TouchMouseInput() {
    Input.apply(this, arguments);

    var handler = bindFn(this.handler, this);
    this.touch = new TouchInput(this.manager, handler);
    this.mouse = new MouseInput(this.manager, handler);

    this.primaryTouch = null;
    this.lastTouches = [];
}

inherit(TouchMouseInput, Input, {
    /**
     * handle mouse and touch events
     * @param {Hammer} manager
     * @param {String} inputEvent
     * @param {Object} inputData
     */
    handler: function TMEhandler(manager, inputEvent, inputData) {
        var isTouch = (inputData.pointerType == INPUT_TYPE_TOUCH),
            isMouse = (inputData.pointerType == INPUT_TYPE_MOUSE);

        if (isMouse && inputData.sourceCapabilities && inputData.sourceCapabilities.firesTouchEvents) {
            return;
        }

        // when we're in a touch event, record touches to  de-dupe synthetic mouse event
        if (isTouch) {
            recordTouches.call(this, inputEvent, inputData);
        } else if (isMouse && isSyntheticEvent.call(this, inputData)) {
            return;
        }

        this.callback(manager, inputEvent, inputData);
    },

    /**
     * remove the event listeners
     */
    destroy: function destroy() {
        this.touch.destroy();
        this.mouse.destroy();
    }
});

function recordTouches(eventType, eventData) {
    if (eventType & INPUT_START) {
        this.primaryTouch = eventData.changedPointers[0].identifier;
        setLastTouch.call(this, eventData);
    } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
        setLastTouch.call(this, eventData);
    }
}

function setLastTouch(eventData) {
    var touch = eventData.changedPointers[0];

    if (touch.identifier === this.primaryTouch) {
        var lastTouch = {x: touch.clientX, y: touch.clientY};
        this.lastTouches.push(lastTouch);
        var lts = this.lastTouches;
        var removeLastTouch = function() {
            var i = lts.indexOf(lastTouch);
            if (i > -1) {
                lts.splice(i, 1);
            }
        };
        setTimeout(removeLastTouch, DEDUP_TIMEOUT);
    }
}

function isSyntheticEvent(eventData) {
    var x = eventData.srcEvent.clientX, y = eventData.srcEvent.clientY;
    for (var i = 0; i < this.lastTouches.length; i++) {
        var t = this.lastTouches[i];
        var dx = Math.abs(x - t.x), dy = Math.abs(y - t.y);
        if (dx <= DEDUP_DISTANCE && dy <= DEDUP_DISTANCE) {
            return true;
        }
    }
    return false;
}

var PREFIXED_TOUCH_ACTION = prefixed(TEST_ELEMENT.style, 'touchAction');
var NATIVE_TOUCH_ACTION = PREFIXED_TOUCH_ACTION !== undefined;

// magical touchAction value
var TOUCH_ACTION_COMPUTE = 'compute';
var TOUCH_ACTION_AUTO = 'auto';
var TOUCH_ACTION_MANIPULATION = 'manipulation'; // not implemented
var TOUCH_ACTION_NONE = 'none';
var TOUCH_ACTION_PAN_X = 'pan-x';
var TOUCH_ACTION_PAN_Y = 'pan-y';
var TOUCH_ACTION_MAP = getTouchActionProps();

/**
 * Touch Action
 * sets the touchAction property or uses the js alternative
 * @param {Manager} manager
 * @param {String} value
 * @constructor
 */
function TouchAction(manager, value) {
    this.manager = manager;
    this.set(value);
}

TouchAction.prototype = {
    /**
     * set the touchAction value on the element or enable the polyfill
     * @param {String} value
     */
    set: function(value) {
        // find out the touch-action by the event handlers
        if (value == TOUCH_ACTION_COMPUTE) {
            value = this.compute();
        }

        if (NATIVE_TOUCH_ACTION && this.manager.element.style && TOUCH_ACTION_MAP[value]) {
            this.manager.element.style[PREFIXED_TOUCH_ACTION] = value;
        }
        this.actions = value.toLowerCase().trim();
    },

    /**
     * just re-set the touchAction value
     */
    update: function() {
        this.set(this.manager.options.touchAction);
    },

    /**
     * compute the value for the touchAction property based on the recognizer's settings
     * @returns {String} value
     */
    compute: function() {
        var actions = [];
        each(this.manager.recognizers, function(recognizer) {
            if (boolOrFn(recognizer.options.enable, [recognizer])) {
                actions = actions.concat(recognizer.getTouchAction());
            }
        });
        return cleanTouchActions(actions.join(' '));
    },

    /**
     * this method is called on each input cycle and provides the preventing of the browser behavior
     * @param {Object} input
     */
    preventDefaults: function(input) {
        var srcEvent = input.srcEvent;
        var direction = input.offsetDirection;

        // if the touch action did prevented once this session
        if (this.manager.session.prevented) {
            srcEvent.preventDefault();
            return;
        }

        var actions = this.actions;
        var hasNone = inStr(actions, TOUCH_ACTION_NONE) && !TOUCH_ACTION_MAP[TOUCH_ACTION_NONE];
        var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_Y];
        var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_X];

        if (hasNone) {
            //do not prevent defaults if this is a tap gesture

            var isTapPointer = input.pointers.length === 1;
            var isTapMovement = input.distance < 2;
            var isTapTouchTime = input.deltaTime < 250;

            if (isTapPointer && isTapMovement && isTapTouchTime) {
                return;
            }
        }

        if (hasPanX && hasPanY) {
            // `pan-x pan-y` means browser handles all scrolling/panning, do not prevent
            return;
        }

        if (hasNone ||
            (hasPanY && direction & DIRECTION_HORIZONTAL) ||
            (hasPanX && direction & DIRECTION_VERTICAL)) {
            return this.preventSrc(srcEvent);
        }
    },

    /**
     * call preventDefault to prevent the browser's default behavior (scrolling in most cases)
     * @param {Object} srcEvent
     */
    preventSrc: function(srcEvent) {
        this.manager.session.prevented = true;
        srcEvent.preventDefault();
    }
};

/**
 * when the touchActions are collected they are not a valid value, so we need to clean things up. *
 * @param {String} actions
 * @returns {*}
 */
function cleanTouchActions(actions) {
    // none
    if (inStr(actions, TOUCH_ACTION_NONE)) {
        return TOUCH_ACTION_NONE;
    }

    var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
    var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);

    // if both pan-x and pan-y are set (different recognizers
    // for different directions, e.g. horizontal pan but vertical swipe?)
    // we need none (as otherwise with pan-x pan-y combined none of these
    // recognizers will work, since the browser would handle all panning
    if (hasPanX && hasPanY) {
        return TOUCH_ACTION_NONE;
    }

    // pan-x OR pan-y
    if (hasPanX || hasPanY) {
        return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y;
    }

    // manipulation
    if (inStr(actions, TOUCH_ACTION_MANIPULATION)) {
        return TOUCH_ACTION_MANIPULATION;
    }

    return TOUCH_ACTION_AUTO;
}

function getTouchActionProps() {
    if (!NATIVE_TOUCH_ACTION) {
        return false;
    }
    var touchMap = {};
    var cssSupports = window.CSS && window.CSS.supports;
    ['auto', 'manipulation', 'pan-y', 'pan-x', 'pan-x pan-y', 'none'].forEach(function(val) {

        // If css.supports is not supported but there is native touch-action assume it supports
        // all values. This is the case for IE 10 and 11.
        touchMap[val] = cssSupports ? window.CSS.supports('touch-action', val) : true;
    });
    return touchMap;
}

/**
 * Recognizer flow explained; *
 * All recognizers have the initial state of POSSIBLE when a input session starts.
 * The definition of a input session is from the first input until the last input, with all it's movement in it. *
 * Example session for mouse-input: mousedown -> mousemove -> mouseup
 *
 * On each recognizing cycle (see Manager.recognize) the .recognize() method is executed
 * which determines with state it should be.
 *
 * If the recognizer has the state FAILED, CANCELLED or RECOGNIZED (equals ENDED), it is reset to
 * POSSIBLE to give it another change on the next cycle.
 *
 *               Possible
 *                  |
 *            +-----+---------------+
 *            |                     |
 *      +-----+-----+               |
 *      |           |               |
 *   Failed      Cancelled          |
 *                          +-------+------+
 *                          |              |
 *                      Recognized       Began
 *                                         |
 *                                      Changed
 *                                         |
 *                                  Ended/Recognized
 */
var STATE_POSSIBLE = 1;
var STATE_BEGAN = 2;
var STATE_CHANGED = 4;
var STATE_ENDED = 8;
var STATE_RECOGNIZED = STATE_ENDED;
var STATE_CANCELLED = 16;
var STATE_FAILED = 32;

/**
 * Recognizer
 * Every recognizer needs to extend from this class.
 * @constructor
 * @param {Object} options
 */
function Recognizer(options) {
    this.options = assign({}, this.defaults, options || {});

    this.id = uniqueId();

    this.manager = null;

    // default is enable true
    this.options.enable = ifUndefined(this.options.enable, true);

    this.state = STATE_POSSIBLE;

    this.simultaneous = {};
    this.requireFail = [];
}

Recognizer.prototype = {
    /**
     * @virtual
     * @type {Object}
     */
    defaults: {},

    /**
     * set options
     * @param {Object} options
     * @return {Recognizer}
     */
    set: function(options) {
        assign(this.options, options);

        // also update the touchAction, in case something changed about the directions/enabled state
        this.manager && this.manager.touchAction.update();
        return this;
    },

    /**
     * recognize simultaneous with an other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    recognizeWith: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'recognizeWith', this)) {
            return this;
        }

        var simultaneous = this.simultaneous;
        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        if (!simultaneous[otherRecognizer.id]) {
            simultaneous[otherRecognizer.id] = otherRecognizer;
            otherRecognizer.recognizeWith(this);
        }
        return this;
    },

    /**
     * drop the simultaneous link. it doesnt remove the link on the other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    dropRecognizeWith: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'dropRecognizeWith', this)) {
            return this;
        }

        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        delete this.simultaneous[otherRecognizer.id];
        return this;
    },

    /**
     * recognizer can only run when an other is failing
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    requireFailure: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'requireFailure', this)) {
            return this;
        }

        var requireFail = this.requireFail;
        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        if (inArray(requireFail, otherRecognizer) === -1) {
            requireFail.push(otherRecognizer);
            otherRecognizer.requireFailure(this);
        }
        return this;
    },

    /**
     * drop the requireFailure link. it does not remove the link on the other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    dropRequireFailure: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'dropRequireFailure', this)) {
            return this;
        }

        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        var index = inArray(this.requireFail, otherRecognizer);
        if (index > -1) {
            this.requireFail.splice(index, 1);
        }
        return this;
    },

    /**
     * has require failures boolean
     * @returns {boolean}
     */
    hasRequireFailures: function() {
        return this.requireFail.length > 0;
    },

    /**
     * if the recognizer can recognize simultaneous with an other recognizer
     * @param {Recognizer} otherRecognizer
     * @returns {Boolean}
     */
    canRecognizeWith: function(otherRecognizer) {
        return !!this.simultaneous[otherRecognizer.id];
    },

    /**
     * You should use `tryEmit` instead of `emit` directly to check
     * that all the needed recognizers has failed before emitting.
     * @param {Object} input
     */
    emit: function(input) {
        var self = this;
        var state = this.state;

        function emit(event) {
            self.manager.emit(event, input);
        }

        // 'panstart' and 'panmove'
        if (state < STATE_ENDED) {
            emit(self.options.event + stateStr(state));
        }

        emit(self.options.event); // simple 'eventName' events

        if (input.additionalEvent) { // additional event(panleft, panright, pinchin, pinchout...)
            emit(input.additionalEvent);
        }

        // panend and pancancel
        if (state >= STATE_ENDED) {
            emit(self.options.event + stateStr(state));
        }
    },

    /**
     * Check that all the require failure recognizers has failed,
     * if true, it emits a gesture event,
     * otherwise, setup the state to FAILED.
     * @param {Object} input
     */
    tryEmit: function(input) {
        if (this.canEmit()) {
            return this.emit(input);
        }
        // it's failing anyway
        this.state = STATE_FAILED;
    },

    /**
     * can we emit?
     * @returns {boolean}
     */
    canEmit: function() {
        var i = 0;
        while (i < this.requireFail.length) {
            if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE))) {
                return false;
            }
            i++;
        }
        return true;
    },

    /**
     * update the recognizer
     * @param {Object} inputData
     */
    recognize: function(inputData) {
        // make a new copy of the inputData
        // so we can change the inputData without messing up the other recognizers
        var inputDataClone = assign({}, inputData);

        // is is enabled and allow recognizing?
        if (!boolOrFn(this.options.enable, [this, inputDataClone])) {
            this.reset();
            this.state = STATE_FAILED;
            return;
        }

        // reset when we've reached the end
        if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
            this.state = STATE_POSSIBLE;
        }

        this.state = this.process(inputDataClone);

        // the recognizer has recognized a gesture
        // so trigger an event
        if (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)) {
            this.tryEmit(inputDataClone);
        }
    },

    /**
     * return the state of the recognizer
     * the actual recognizing happens in this method
     * @virtual
     * @param {Object} inputData
     * @returns {Const} STATE
     */
    process: function(inputData) { }, // jshint ignore:line

    /**
     * return the preferred touch-action
     * @virtual
     * @returns {Array}
     */
    getTouchAction: function() { },

    /**
     * called when the gesture isn't allowed to recognize
     * like when another is being recognized or it is disabled
     * @virtual
     */
    reset: function() { }
};

/**
 * get a usable string, used as event postfix
 * @param {Const} state
 * @returns {String} state
 */
function stateStr(state) {
    if (state & STATE_CANCELLED) {
        return 'cancel';
    } else if (state & STATE_ENDED) {
        return 'end';
    } else if (state & STATE_CHANGED) {
        return 'move';
    } else if (state & STATE_BEGAN) {
        return 'start';
    }
    return '';
}

/**
 * direction cons to string
 * @param {Const} direction
 * @returns {String}
 */
function directionStr(direction) {
    if (direction == DIRECTION_DOWN) {
        return 'down';
    } else if (direction == DIRECTION_UP) {
        return 'up';
    } else if (direction == DIRECTION_LEFT) {
        return 'left';
    } else if (direction == DIRECTION_RIGHT) {
        return 'right';
    }
    return '';
}

/**
 * get a recognizer by name if it is bound to a manager
 * @param {Recognizer|String} otherRecognizer
 * @param {Recognizer} recognizer
 * @returns {Recognizer}
 */
function getRecognizerByNameIfManager(otherRecognizer, recognizer) {
    var manager = recognizer.manager;
    if (manager) {
        return manager.get(otherRecognizer);
    }
    return otherRecognizer;
}

/**
 * This recognizer is just used as a base for the simple attribute recognizers.
 * @constructor
 * @extends Recognizer
 */
function AttrRecognizer() {
    Recognizer.apply(this, arguments);
}

inherit(AttrRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof AttrRecognizer
     */
    defaults: {
        /**
         * @type {Number}
         * @default 1
         */
        pointers: 1
    },

    /**
     * Used to check if it the recognizer receives valid input, like input.distance > 10.
     * @memberof AttrRecognizer
     * @param {Object} input
     * @returns {Boolean} recognized
     */
    attrTest: function(input) {
        var optionPointers = this.options.pointers;
        return optionPointers === 0 || input.pointers.length === optionPointers;
    },

    /**
     * Process the input and return the state for the recognizer
     * @memberof AttrRecognizer
     * @param {Object} input
     * @returns {*} State
     */
    process: function(input) {
        var state = this.state;
        var eventType = input.eventType;

        var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
        var isValid = this.attrTest(input);

        // on cancel input and we've recognized before, return STATE_CANCELLED
        if (isRecognized && (eventType & INPUT_CANCEL || !isValid)) {
            return state | STATE_CANCELLED;
        } else if (isRecognized || isValid) {
            if (eventType & INPUT_END) {
                return state | STATE_ENDED;
            } else if (!(state & STATE_BEGAN)) {
                return STATE_BEGAN;
            }
            return state | STATE_CHANGED;
        }
        return STATE_FAILED;
    }
});

/**
 * Pan
 * Recognized when the pointer is down and moved in the allowed direction.
 * @constructor
 * @extends AttrRecognizer
 */
function PanRecognizer() {
    AttrRecognizer.apply(this, arguments);

    this.pX = null;
    this.pY = null;
}

inherit(PanRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof PanRecognizer
     */
    defaults: {
        event: 'pan',
        threshold: 10,
        pointers: 1,
        direction: DIRECTION_ALL
    },

    getTouchAction: function() {
        var direction = this.options.direction;
        var actions = [];
        if (direction & DIRECTION_HORIZONTAL) {
            actions.push(TOUCH_ACTION_PAN_Y);
        }
        if (direction & DIRECTION_VERTICAL) {
            actions.push(TOUCH_ACTION_PAN_X);
        }
        return actions;
    },

    directionTest: function(input) {
        var options = this.options;
        var hasMoved = true;
        var distance = input.distance;
        var direction = input.direction;
        var x = input.deltaX;
        var y = input.deltaY;

        // lock to axis?
        if (!(direction & options.direction)) {
            if (options.direction & DIRECTION_HORIZONTAL) {
                direction = (x === 0) ? DIRECTION_NONE : (x < 0) ? DIRECTION_LEFT : DIRECTION_RIGHT;
                hasMoved = x != this.pX;
                distance = Math.abs(input.deltaX);
            } else {
                direction = (y === 0) ? DIRECTION_NONE : (y < 0) ? DIRECTION_UP : DIRECTION_DOWN;
                hasMoved = y != this.pY;
                distance = Math.abs(input.deltaY);
            }
        }
        input.direction = direction;
        return hasMoved && distance > options.threshold && direction & options.direction;
    },

    attrTest: function(input) {
        return AttrRecognizer.prototype.attrTest.call(this, input) &&
            (this.state & STATE_BEGAN || (!(this.state & STATE_BEGAN) && this.directionTest(input)));
    },

    emit: function(input) {

        this.pX = input.deltaX;
        this.pY = input.deltaY;

        var direction = directionStr(input.direction);

        if (direction) {
            input.additionalEvent = this.options.event + direction;
        }
        this._super.emit.call(this, input);
    }
});

/**
 * Pinch
 * Recognized when two or more pointers are moving toward (zoom-in) or away from each other (zoom-out).
 * @constructor
 * @extends AttrRecognizer
 */
function PinchRecognizer() {
    AttrRecognizer.apply(this, arguments);
}

inherit(PinchRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof PinchRecognizer
     */
    defaults: {
        event: 'pinch',
        threshold: 0,
        pointers: 2
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_NONE];
    },

    attrTest: function(input) {
        return this._super.attrTest.call(this, input) &&
            (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN);
    },

    emit: function(input) {
        if (input.scale !== 1) {
            var inOut = input.scale < 1 ? 'in' : 'out';
            input.additionalEvent = this.options.event + inOut;
        }
        this._super.emit.call(this, input);
    }
});

/**
 * Press
 * Recognized when the pointer is down for x ms without any movement.
 * @constructor
 * @extends Recognizer
 */
function PressRecognizer() {
    Recognizer.apply(this, arguments);

    this._timer = null;
    this._input = null;
}

inherit(PressRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof PressRecognizer
     */
    defaults: {
        event: 'press',
        pointers: 1,
        time: 251, // minimal time of the pointer to be pressed
        threshold: 9 // a minimal movement is ok, but keep it low
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_AUTO];
    },

    process: function(input) {
        var options = this.options;
        var validPointers = input.pointers.length === options.pointers;
        var validMovement = input.distance < options.threshold;
        var validTime = input.deltaTime > options.time;

        this._input = input;

        // we only allow little movement
        // and we've reached an end event, so a tap is possible
        if (!validMovement || !validPointers || (input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime)) {
            this.reset();
        } else if (input.eventType & INPUT_START) {
            this.reset();
            this._timer = setTimeoutContext(function() {
                this.state = STATE_RECOGNIZED;
                this.tryEmit();
            }, options.time, this);
        } else if (input.eventType & INPUT_END) {
            return STATE_RECOGNIZED;
        }
        return STATE_FAILED;
    },

    reset: function() {
        clearTimeout(this._timer);
    },

    emit: function(input) {
        if (this.state !== STATE_RECOGNIZED) {
            return;
        }

        if (input && (input.eventType & INPUT_END)) {
            this.manager.emit(this.options.event + 'up', input);
        } else {
            this._input.timeStamp = now();
            this.manager.emit(this.options.event, this._input);
        }
    }
});

/**
 * Rotate
 * Recognized when two or more pointer are moving in a circular motion.
 * @constructor
 * @extends AttrRecognizer
 */
function RotateRecognizer() {
    AttrRecognizer.apply(this, arguments);
}

inherit(RotateRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof RotateRecognizer
     */
    defaults: {
        event: 'rotate',
        threshold: 0,
        pointers: 2
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_NONE];
    },

    attrTest: function(input) {
        return this._super.attrTest.call(this, input) &&
            (Math.abs(input.rotation) > this.options.threshold || this.state & STATE_BEGAN);
    }
});

/**
 * Swipe
 * Recognized when the pointer is moving fast (velocity), with enough distance in the allowed direction.
 * @constructor
 * @extends AttrRecognizer
 */
function SwipeRecognizer() {
    AttrRecognizer.apply(this, arguments);
}

inherit(SwipeRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof SwipeRecognizer
     */
    defaults: {
        event: 'swipe',
        threshold: 10,
        velocity: 0.3,
        direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL,
        pointers: 1
    },

    getTouchAction: function() {
        return PanRecognizer.prototype.getTouchAction.call(this);
    },

    attrTest: function(input) {
        var direction = this.options.direction;
        var velocity;

        if (direction & (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL)) {
            velocity = input.overallVelocity;
        } else if (direction & DIRECTION_HORIZONTAL) {
            velocity = input.overallVelocityX;
        } else if (direction & DIRECTION_VERTICAL) {
            velocity = input.overallVelocityY;
        }

        return this._super.attrTest.call(this, input) &&
            direction & input.offsetDirection &&
            input.distance > this.options.threshold &&
            input.maxPointers == this.options.pointers &&
            abs(velocity) > this.options.velocity && input.eventType & INPUT_END;
    },

    emit: function(input) {
        var direction = directionStr(input.offsetDirection);
        if (direction) {
            this.manager.emit(this.options.event + direction, input);
        }

        this.manager.emit(this.options.event, input);
    }
});

/**
 * A tap is ecognized when the pointer is doing a small tap/click. Multiple taps are recognized if they occur
 * between the given interval and position. The delay option can be used to recognize multi-taps without firing
 * a single tap.
 *
 * The eventData from the emitted event contains the property `tapCount`, which contains the amount of
 * multi-taps being recognized.
 * @constructor
 * @extends Recognizer
 */
function TapRecognizer() {
    Recognizer.apply(this, arguments);

    // previous time and center,
    // used for tap counting
    this.pTime = false;
    this.pCenter = false;

    this._timer = null;
    this._input = null;
    this.count = 0;
}

inherit(TapRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof PinchRecognizer
     */
    defaults: {
        event: 'tap',
        pointers: 1,
        taps: 1,
        interval: 300, // max time between the multi-tap taps
        time: 250, // max time of the pointer to be down (like finger on the screen)
        threshold: 9, // a minimal movement is ok, but keep it low
        posThreshold: 10 // a multi-tap can be a bit off the initial position
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_MANIPULATION];
    },

    process: function(input) {
        var options = this.options;

        var validPointers = input.pointers.length === options.pointers;
        var validMovement = input.distance < options.threshold;
        var validTouchTime = input.deltaTime < options.time;

        this.reset();

        if ((input.eventType & INPUT_START) && (this.count === 0)) {
            return this.failTimeout();
        }

        // we only allow little movement
        // and we've reached an end event, so a tap is possible
        if (validMovement && validTouchTime && validPointers) {
            if (input.eventType != INPUT_END) {
                return this.failTimeout();
            }

            var validInterval = this.pTime ? (input.timeStamp - this.pTime < options.interval) : true;
            var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;

            this.pTime = input.timeStamp;
            this.pCenter = input.center;

            if (!validMultiTap || !validInterval) {
                this.count = 1;
            } else {
                this.count += 1;
            }

            this._input = input;

            // if tap count matches we have recognized it,
            // else it has began recognizing...
            var tapCount = this.count % options.taps;
            if (tapCount === 0) {
                // no failing requirements, immediately trigger the tap event
                // or wait as long as the multitap interval to trigger
                if (!this.hasRequireFailures()) {
                    return STATE_RECOGNIZED;
                } else {
                    this._timer = setTimeoutContext(function() {
                        this.state = STATE_RECOGNIZED;
                        this.tryEmit();
                    }, options.interval, this);
                    return STATE_BEGAN;
                }
            }
        }
        return STATE_FAILED;
    },

    failTimeout: function() {
        this._timer = setTimeoutContext(function() {
            this.state = STATE_FAILED;
        }, this.options.interval, this);
        return STATE_FAILED;
    },

    reset: function() {
        clearTimeout(this._timer);
    },

    emit: function() {
        if (this.state == STATE_RECOGNIZED) {
            this._input.tapCount = this.count;
            this.manager.emit(this.options.event, this._input);
        }
    }
});

/**
 * Simple way to create a manager with a default set of recognizers.
 * @param {HTMLElement} element
 * @param {Object} [options]
 * @constructor
 */
function Hammer(element, options) {
    options = options || {};
    options.recognizers = ifUndefined(options.recognizers, Hammer.defaults.preset);
    return new Manager(element, options);
}

/**
 * @const {string}
 */
Hammer.VERSION = '2.0.7';

/**
 * default settings
 * @namespace
 */
Hammer.defaults = {
    /**
     * set if DOM events are being triggered.
     * But this is slower and unused by simple implementations, so disabled by default.
     * @type {Boolean}
     * @default false
     */
    domEvents: false,

    /**
     * The value for the touchAction property/fallback.
     * When set to `compute` it will magically set the correct value based on the added recognizers.
     * @type {String}
     * @default compute
     */
    touchAction: TOUCH_ACTION_COMPUTE,

    /**
     * @type {Boolean}
     * @default true
     */
    enable: true,

    /**
     * EXPERIMENTAL FEATURE -- can be removed/changed
     * Change the parent input target element.
     * If Null, then it is being set the to main element.
     * @type {Null|EventTarget}
     * @default null
     */
    inputTarget: null,

    /**
     * force an input class
     * @type {Null|Function}
     * @default null
     */
    inputClass: null,

    /**
     * Default recognizer setup when calling `Hammer()`
     * When creating a new Manager these will be skipped.
     * @type {Array}
     */
    preset: [
        // RecognizerClass, options, [recognizeWith, ...], [requireFailure, ...]
        [RotateRecognizer, {enable: false}],
        [PinchRecognizer, {enable: false}, ['rotate']],
        [SwipeRecognizer, {direction: DIRECTION_HORIZONTAL}],
        [PanRecognizer, {direction: DIRECTION_HORIZONTAL}, ['swipe']],
        [TapRecognizer],
        [TapRecognizer, {event: 'doubletap', taps: 2}, ['tap']],
        [PressRecognizer]
    ],

    /**
     * Some CSS properties can be used to improve the working of Hammer.
     * Add them to this method and they will be set when creating a new Manager.
     * @namespace
     */
    cssProps: {
        /**
         * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
         * @type {String}
         * @default 'none'
         */
        userSelect: 'none',

        /**
         * Disable the Windows Phone grippers when pressing an element.
         * @type {String}
         * @default 'none'
         */
        touchSelect: 'none',

        /**
         * Disables the default callout shown when you touch and hold a touch target.
         * On iOS, when you touch and hold a touch target such as a link, Safari displays
         * a callout containing information about the link. This property allows you to disable that callout.
         * @type {String}
         * @default 'none'
         */
        touchCallout: 'none',

        /**
         * Specifies whether zooming is enabled. Used by IE10>
         * @type {String}
         * @default 'none'
         */
        contentZooming: 'none',

        /**
         * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers.
         * @type {String}
         * @default 'none'
         */
        userDrag: 'none',

        /**
         * Overrides the highlight color shown when the user taps a link or a JavaScript
         * clickable element in iOS. This property obeys the alpha value, if specified.
         * @type {String}
         * @default 'rgba(0,0,0,0)'
         */
        tapHighlightColor: 'rgba(0,0,0,0)'
    }
};

var STOP = 1;
var FORCED_STOP = 2;

/**
 * Manager
 * @param {HTMLElement} element
 * @param {Object} [options]
 * @constructor
 */
function Manager(element, options) {
    this.options = assign({}, Hammer.defaults, options || {});

    this.options.inputTarget = this.options.inputTarget || element;

    this.handlers = {};
    this.session = {};
    this.recognizers = [];
    this.oldCssProps = {};

    this.element = element;
    this.input = createInputInstance(this);
    this.touchAction = new TouchAction(this, this.options.touchAction);

    toggleCssProps(this, true);

    each(this.options.recognizers, function(item) {
        var recognizer = this.add(new (item[0])(item[1]));
        item[2] && recognizer.recognizeWith(item[2]);
        item[3] && recognizer.requireFailure(item[3]);
    }, this);
}

Manager.prototype = {
    /**
     * set options
     * @param {Object} options
     * @returns {Manager}
     */
    set: function(options) {
        assign(this.options, options);

        // Options that need a little more setup
        if (options.touchAction) {
            this.touchAction.update();
        }
        if (options.inputTarget) {
            // Clean up existing event listeners and reinitialize
            this.input.destroy();
            this.input.target = options.inputTarget;
            this.input.init();
        }
        return this;
    },

    /**
     * stop recognizing for this session.
     * This session will be discarded, when a new [input]start event is fired.
     * When forced, the recognizer cycle is stopped immediately.
     * @param {Boolean} [force]
     */
    stop: function(force) {
        this.session.stopped = force ? FORCED_STOP : STOP;
    },

    /**
     * run the recognizers!
     * called by the inputHandler function on every movement of the pointers (touches)
     * it walks through all the recognizers and tries to detect the gesture that is being made
     * @param {Object} inputData
     */
    recognize: function(inputData) {
        var session = this.session;
        if (session.stopped) {
            return;
        }

        // run the touch-action polyfill
        this.touchAction.preventDefaults(inputData);

        var recognizer;
        var recognizers = this.recognizers;

        // this holds the recognizer that is being recognized.
        // so the recognizer's state needs to be BEGAN, CHANGED, ENDED or RECOGNIZED
        // if no recognizer is detecting a thing, it is set to `null`
        var curRecognizer = session.curRecognizer;

        // reset when the last recognizer is recognized
        // or when we're in a new session
        if (!curRecognizer || (curRecognizer && curRecognizer.state & STATE_RECOGNIZED)) {
            curRecognizer = session.curRecognizer = null;
        }

        var i = 0;
        while (i < recognizers.length) {
            recognizer = recognizers[i];

            // find out if we are allowed try to recognize the input for this one.
            // 1.   allow if the session is NOT forced stopped (see the .stop() method)
            // 2.   allow if we still haven't recognized a gesture in this session, or the this recognizer is the one
            //      that is being recognized.
            // 3.   allow if the recognizer is allowed to run simultaneous with the current recognized recognizer.
            //      this can be setup with the `recognizeWith()` method on the recognizer.
            if (session.stopped !== FORCED_STOP && ( // 1
                    !curRecognizer || recognizer == curRecognizer || // 2
                    recognizer.canRecognizeWith(curRecognizer))) { // 3
                recognizer.recognize(inputData);
            } else {
                recognizer.reset();
            }

            // if the recognizer has been recognizing the input as a valid gesture, we want to store this one as the
            // current active recognizer. but only if we don't already have an active recognizer
            if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
                curRecognizer = session.curRecognizer = recognizer;
            }
            i++;
        }
    },

    /**
     * get a recognizer by its event name.
     * @param {Recognizer|String} recognizer
     * @returns {Recognizer|Null}
     */
    get: function(recognizer) {
        if (recognizer instanceof Recognizer) {
            return recognizer;
        }

        var recognizers = this.recognizers;
        for (var i = 0; i < recognizers.length; i++) {
            if (recognizers[i].options.event == recognizer) {
                return recognizers[i];
            }
        }
        return null;
    },

    /**
     * add a recognizer to the manager
     * existing recognizers with the same event name will be removed
     * @param {Recognizer} recognizer
     * @returns {Recognizer|Manager}
     */
    add: function(recognizer) {
        if (invokeArrayArg(recognizer, 'add', this)) {
            return this;
        }

        // remove existing
        var existing = this.get(recognizer.options.event);
        if (existing) {
            this.remove(existing);
        }

        this.recognizers.push(recognizer);
        recognizer.manager = this;

        this.touchAction.update();
        return recognizer;
    },

    /**
     * remove a recognizer by name or instance
     * @param {Recognizer|String} recognizer
     * @returns {Manager}
     */
    remove: function(recognizer) {
        if (invokeArrayArg(recognizer, 'remove', this)) {
            return this;
        }

        recognizer = this.get(recognizer);

        // let's make sure this recognizer exists
        if (recognizer) {
            var recognizers = this.recognizers;
            var index = inArray(recognizers, recognizer);

            if (index !== -1) {
                recognizers.splice(index, 1);
                this.touchAction.update();
            }
        }

        return this;
    },

    /**
     * bind event
     * @param {String} events
     * @param {Function} handler
     * @returns {EventEmitter} this
     */
    on: function(events, handler) {
        if (events === undefined) {
            return;
        }
        if (handler === undefined) {
            return;
        }

        var handlers = this.handlers;
        each(splitStr(events), function(event) {
            handlers[event] = handlers[event] || [];
            handlers[event].push(handler);
        });
        return this;
    },

    /**
     * unbind event, leave emit blank to remove all handlers
     * @param {String} events
     * @param {Function} [handler]
     * @returns {EventEmitter} this
     */
    off: function(events, handler) {
        if (events === undefined) {
            return;
        }

        var handlers = this.handlers;
        each(splitStr(events), function(event) {
            if (!handler) {
                delete handlers[event];
            } else {
                handlers[event] && handlers[event].splice(inArray(handlers[event], handler), 1);
            }
        });
        return this;
    },

    /**
     * emit event to the listeners
     * @param {String} event
     * @param {Object} data
     */
    emit: function(event, data) {
        // we also want to trigger dom events
        if (this.options.domEvents) {
            triggerDomEvent(event, data);
        }

        // no handlers, so skip it all
        var handlers = this.handlers[event] && this.handlers[event].slice();
        if (!handlers || !handlers.length) {
            return;
        }

        data.type = event;
        data.preventDefault = function() {
            data.srcEvent.preventDefault();
        };

        var i = 0;
        while (i < handlers.length) {
            handlers[i](data);
            i++;
        }
    },

    /**
     * destroy the manager and unbinds all events
     * it doesn't unbind dom events, that is the user own responsibility
     */
    destroy: function() {
        this.element && toggleCssProps(this, false);

        this.handlers = {};
        this.session = {};
        this.input.destroy();
        this.element = null;
    }
};

/**
 * add/remove the css properties as defined in manager.options.cssProps
 * @param {Manager} manager
 * @param {Boolean} add
 */
function toggleCssProps(manager, add) {
    var element = manager.element;
    if (!element.style) {
        return;
    }
    var prop;
    each(manager.options.cssProps, function(value, name) {
        prop = prefixed(element.style, name);
        if (add) {
            manager.oldCssProps[prop] = element.style[prop];
            element.style[prop] = value;
        } else {
            element.style[prop] = manager.oldCssProps[prop] || '';
        }
    });
    if (!add) {
        manager.oldCssProps = {};
    }
}

/**
 * trigger dom event
 * @param {String} event
 * @param {Object} data
 */
function triggerDomEvent(event, data) {
    var gestureEvent = document.createEvent('Event');
    gestureEvent.initEvent(event, true, true);
    gestureEvent.gesture = data;
    data.target.dispatchEvent(gestureEvent);
}

assign(Hammer, {
    INPUT_START: INPUT_START,
    INPUT_MOVE: INPUT_MOVE,
    INPUT_END: INPUT_END,
    INPUT_CANCEL: INPUT_CANCEL,

    STATE_POSSIBLE: STATE_POSSIBLE,
    STATE_BEGAN: STATE_BEGAN,
    STATE_CHANGED: STATE_CHANGED,
    STATE_ENDED: STATE_ENDED,
    STATE_RECOGNIZED: STATE_RECOGNIZED,
    STATE_CANCELLED: STATE_CANCELLED,
    STATE_FAILED: STATE_FAILED,

    DIRECTION_NONE: DIRECTION_NONE,
    DIRECTION_LEFT: DIRECTION_LEFT,
    DIRECTION_RIGHT: DIRECTION_RIGHT,
    DIRECTION_UP: DIRECTION_UP,
    DIRECTION_DOWN: DIRECTION_DOWN,
    DIRECTION_HORIZONTAL: DIRECTION_HORIZONTAL,
    DIRECTION_VERTICAL: DIRECTION_VERTICAL,
    DIRECTION_ALL: DIRECTION_ALL,

    Manager: Manager,
    Input: Input,
    TouchAction: TouchAction,

    TouchInput: TouchInput,
    MouseInput: MouseInput,
    PointerEventInput: PointerEventInput,
    TouchMouseInput: TouchMouseInput,
    SingleTouchInput: SingleTouchInput,

    Recognizer: Recognizer,
    AttrRecognizer: AttrRecognizer,
    Tap: TapRecognizer,
    Pan: PanRecognizer,
    Swipe: SwipeRecognizer,
    Pinch: PinchRecognizer,
    Rotate: RotateRecognizer,
    Press: PressRecognizer,

    on: addEventListeners,
    off: removeEventListeners,
    each: each,
    merge: merge,
    extend: extend,
    assign: assign,
    inherit: inherit,
    bindFn: bindFn,
    prefixed: prefixed
});

// this prevents errors when Hammer is loaded in the presence of an AMD
//  style loader but by script tag, not by the loader.
var freeGlobal = (typeof window !== 'undefined' ? window : (typeof self !== 'undefined' ? self : {})); // jshint ignore:line
freeGlobal.Hammer = Hammer;

if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
        return Hammer;
    }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {}

})(window, document, 'Hammer');


/***/ }),

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./admin/admin.module": [
		"./src/app/admin/admin.module.ts",
		"admin-admin-module"
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids) {
		return Promise.resolve().then(function() {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}
	return __webpack_require__.e(ids[1]).then(function() {
		var id = ids[0];
		return __webpack_require__(id);
	});
}
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";
module.exports = webpackAsyncContext;

/***/ }),

/***/ "./src/app/admin/auth-interseptor.ts":
/*!*******************************************!*\
  !*** ./src/app/admin/auth-interseptor.ts ***!
  \*******************************************/
/*! exports provided: AuthInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthInterceptor", function() { return AuthInterceptor; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _model_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../model/auth.service */ "./src/app/model/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AuthInterceptor = /** @class */ (function () {
    function AuthInterceptor(authService) {
        this.authService = authService;
    }
    AuthInterceptor.prototype.intercept = function (req, next) {
        var authToken = this.authService.getToken();
        var authRequest = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + authToken)
        });
        return next.handle(authRequest);
    };
    AuthInterceptor = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_model_auth_service__WEBPACK_IMPORTED_MODULE_1__["AuthService"]])
    ], AuthInterceptor);
    return AuthInterceptor;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-header></app-header>\n<router-outlet></router-outlet>\n<app-footer></app-footer>\n\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _model_cart_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./model/cart.model */ "./src/app/model/cart.model.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppComponent = /** @class */ (function () {
    function AppComponent(http, _cart) {
        this.http = http;
        this._cart = _cart;
    }
    AppComponent.prototype.ngOnInit = function () {
        if (localStorage['cart'] && this._cart.itemCount <= 0) {
            this._cart.setFromStorage(JSON.parse(localStorage.getItem('cart')));
        }
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"], _model_cart_model__WEBPACK_IMPORTED_MODULE_2__["Cart"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _header_header_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./header/header.component */ "./src/app/header/header.component.ts");
/* harmony import */ var _footer_footer_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./footer/footer.component */ "./src/app/footer/footer.component.ts");
/* harmony import */ var _main_main_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./main/main.component */ "./src/app/main/main.component.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./routes */ "./src/app/routes.ts");
/* harmony import */ var _model_product_repository__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./model/product.repository */ "./src/app/model/product.repository.ts");
/* harmony import */ var _model_rest_datasource__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./model/rest.datasource */ "./src/app/model/rest.datasource.ts");
/* harmony import */ var _model_model_module__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./model/model.module */ "./src/app/model/model.module.ts");
/* harmony import */ var _content_shop_shop_module__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./content/shop/shop.module */ "./src/app/content/shop/shop.module.ts");
/* harmony import */ var _content_visual_visual_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./content/visual/visual.component */ "./src/app/content/visual/visual.component.ts");
/* harmony import */ var _content_contact_contact_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./content/contact/contact.component */ "./src/app/content/contact/contact.component.ts");
/* harmony import */ var _ngx_gallery_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @ngx-gallery/core */ "./node_modules/@ngx-gallery/core/fesm5/ngx-gallery-core.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _agm_core__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @agm/core */ "./node_modules/@agm/core/fesm5/agm-core.js");
/* harmony import */ var _content_cooperation_cooperation_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./content/cooperation/cooperation.component */ "./src/app/content/cooperation/cooperation.component.ts");
/* harmony import */ var _content_about_about_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./content/about/about.component */ "./src/app/content/about/about.component.ts");
/* harmony import */ var _content_delivery_delivery_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./content/delivery/delivery.component */ "./src/app/content/delivery/delivery.component.ts");
/* harmony import */ var _common_common_app_module__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./common/common-app.module */ "./src/app/common/common-app.module.ts");
/* harmony import */ var _admin_auth_interseptor__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./admin/auth-interseptor */ "./src/app/admin/auth-interseptor.ts");
/* harmony import */ var _model_auth_service__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./model/auth.service */ "./src/app/model/auth.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_responsive__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ngx-responsive */ "./node_modules/ngx-responsive/fesm5/ngx-responsive.js");
/* harmony import */ var _common_services_metrika_service__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./common/services/metrika.service */ "./src/app/common/services/metrika.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



























var AppModule = /** @class */ (function () {
    function AppModule(_auth) {
        this._auth = _auth;
    }
    AppModule.prototype.ngOnInit = function () {
        this._auth.autoAuthUser();
    };
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"],
                _header_header_component__WEBPACK_IMPORTED_MODULE_3__["HeaderComponent"],
                _content_visual_visual_component__WEBPACK_IMPORTED_MODULE_13__["VisualComponent"],
                _footer_footer_component__WEBPACK_IMPORTED_MODULE_4__["FooterComponent"],
                _main_main_component__WEBPACK_IMPORTED_MODULE_5__["MainComponent"],
                _content_contact_contact_component__WEBPACK_IMPORTED_MODULE_14__["ContactComponent"],
                _content_cooperation_cooperation_component__WEBPACK_IMPORTED_MODULE_18__["CooperationComponent"],
                _content_about_about_component__WEBPACK_IMPORTED_MODULE_19__["AboutComponent"],
                _content_delivery_delivery_component__WEBPACK_IMPORTED_MODULE_20__["DeliveryComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_16__["BrowserAnimationsModule"],
                _model_model_module__WEBPACK_IMPORTED_MODULE_11__["ModelModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpClientModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_24__["FormsModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_7__["RouterModule"].forRoot(_routes__WEBPACK_IMPORTED_MODULE_8__["routes"]),
                _content_shop_shop_module__WEBPACK_IMPORTED_MODULE_12__["ShopModule"],
                _ngx_gallery_core__WEBPACK_IMPORTED_MODULE_15__["GalleryModule"].withConfig({
                    loadingMode: 'indeterminate',
                    thumbMode: 'free',
                    thumbPosition: 'bottom',
                    imageSize: 'cover'
                }),
                _agm_core__WEBPACK_IMPORTED_MODULE_17__["AgmCoreModule"].forRoot({
                    apiKey: 'AIzaSyA5xKkA8Df4hBmqTbhNzTgbVPkWE7Y2b4o'
                }),
                _common_common_app_module__WEBPACK_IMPORTED_MODULE_21__["CommonAppModule"],
                ngx_responsive__WEBPACK_IMPORTED_MODULE_25__["ResponsiveModule"].forRoot(),
            ],
            providers: [_model_product_repository__WEBPACK_IMPORTED_MODULE_9__["ProductRepository"], _common_services_metrika_service__WEBPACK_IMPORTED_MODULE_26__["MetrikaService"], _model_rest_datasource__WEBPACK_IMPORTED_MODULE_10__["RestDataSource"], [{ provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HTTP_INTERCEPTORS"], useClass: _admin_auth_interseptor__WEBPACK_IMPORTED_MODULE_22__["AuthInterceptor"], multi: true }]],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]]
        }),
        __metadata("design:paramtypes", [_model_auth_service__WEBPACK_IMPORTED_MODULE_23__["AuthService"]])
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/common/common-app.module.ts":
/*!*********************************************!*\
  !*** ./src/app/common/common-app.module.ts ***!
  \*********************************************/
/*! exports provided: CommonAppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommonAppModule", function() { return CommonAppModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_toCartModal_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services/toCartModal.service */ "./src/app/common/services/toCartModal.service.ts");
/* harmony import */ var _services_toCartModal_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services/toCartModal.component */ "./src/app/common/services/toCartModal.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CommonAppModule = /** @class */ (function () {
    function CommonAppModule() {
    }
    CommonAppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [_services_toCartModal_component__WEBPACK_IMPORTED_MODULE_2__["ToCartModalComponent"]],
            providers: [_services_toCartModal_service__WEBPACK_IMPORTED_MODULE_1__["ToCartModalService"]],
            exports: [_services_toCartModal_component__WEBPACK_IMPORTED_MODULE_2__["ToCartModalComponent"]]
        })
    ], CommonAppModule);
    return CommonAppModule;
}());



/***/ }),

/***/ "./src/app/common/pipes/order-by.pipe.ts":
/*!***********************************************!*\
  !*** ./src/app/common/pipes/order-by.pipe.ts ***!
  \***********************************************/
/*! exports provided: OrderByPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderByPipe", function() { return OrderByPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var OrderByPipe = /** @class */ (function () {
    function OrderByPipe() {
    }
    OrderByPipe.prototype.transform = function (products, orderText) {
        var sortedProducts = [];
        switch (orderText) {
            case 'expensive':
                sortedProducts = products.sort(function (a, b) {
                    return +b.price - +a.price;
                });
                break;
            case 'cheap':
                sortedProducts = products.sort(function (a, b) {
                    return +a.price - +b.price;
                });
                break;
            case 'novelty':
                sortedProducts = products.sort(function (a, b) {
                    return new Date(b.create_ts) - new Date(a.create_ts);
                });
                break;
            default:
                return products;
        }
        if (sortedProducts.length > 0) {
            return sortedProducts;
        }
    };
    OrderByPipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({
            name: 'orderBy'
        })
    ], OrderByPipe);
    return OrderByPipe;
}());



/***/ }),

/***/ "./src/app/common/services/metrika.service.ts":
/*!****************************************************!*\
  !*** ./src/app/common/services/metrika.service.ts ***!
  \****************************************************/
/*! exports provided: MetrikaService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MetrikaService", function() { return MetrikaService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

// declare let yaCounter60702883;
var MetrikaService = /** @class */ (function () {
    function MetrikaService(
    // private yMetrika: Metrika
    ) {
    }
    MetrikaService.prototype.metrika = function (value) {
        // this.yMetrika.fireEvent(value);
        // yaCounter60702883.reachGoal(value);
        gtag('event', 'sendemail', { 'event_category': value, 'event_action': 'send' });
    };
    MetrikaService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], MetrikaService);
    return MetrikaService;
}());



/***/ }),

/***/ "./src/app/common/services/toCartModal.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/common/services/toCartModal.component.ts ***!
  \**********************************************************/
/*! exports provided: ToCartModalComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToCartModalComponent", function() { return ToCartModalComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _toCartModal_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toCartModal.service */ "./src/app/common/services/toCartModal.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _metrika_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./metrika.service */ "./src/app/common/services/metrika.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ToCartModalComponent = /** @class */ (function () {
    function ToCartModalComponent(modalService, el, _router, metrikaService) {
        this.modalService = modalService;
        this.el = el;
        this._router = _router;
        this.metrikaService = metrikaService;
        this.element = el.nativeElement;
    }
    ToCartModalComponent.prototype.navToCart = function () {
        this.close();
        this.metrikaService.metrika('cart');
        this._router.navigateByUrl('category/cart');
    };
    ToCartModalComponent.prototype.ngOnInit = function () {
        var modal = this;
        // ensure id attribute exists
        if (!this.id) {
            console.error('modal must have an id');
            return;
        }
        // move element to bottom of page (just before </body>) so it can be displayed above everything else
        document.body.appendChild(this.element);
        // close modal on background click
        this.element.addEventListener('click', function (e) {
            if (e.target.className === 'to-cart-modal') {
                modal.close();
            }
        });
        // add self (this modal instance) to the modal service so it's accessible from controllers
        this.modalService.add(this);
    };
    // remove self from modal service when directive is destroyed
    ToCartModalComponent.prototype.ngOnDestroy = function () {
        this.modalService.remove(this.id);
        this.element.remove();
    };
    // open modal
    ToCartModalComponent.prototype.open = function () {
        this.element.style.display = 'block';
        document.body.classList.add('to-cart-modal-open');
    };
    // close modal
    ToCartModalComponent.prototype.close = function () {
        this.element.style.display = 'none';
        document.body.classList.remove('to-cart-modal-open');
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], ToCartModalComponent.prototype, "id", void 0);
    ToCartModalComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-cart-modal',
            template: "\n        <div class=\"to-cart-modal\">\n            <div class=\"to-cart-modal-body\">\n                <div class=\"to-cart-modal-text\">\n                <ng-content></ng-content>\n                <span> \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D \u0432 \u043A\u043E\u0440\u0437\u0438\u043D\u0443</span>\n                </div>\n                <div class=\"to-cart-modal-buttons-box\">\n                    <button type=\"submit\" class=\"cart-button\" (click)=\"close()\">\n                        \u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C \u043F\u043E\u043A\u0443\u043F\u043A\u0438\n                    </button>\n                    <button type=\"submit\" class=\"cart-button orange_btn\" (click)=\"navToCart()\" >\n                        \u041E\u0444\u043E\u0440\u043C\u0438\u0442\u044C \u0437\u0430\u043A\u0430\u0437\n                    </button>\n                </div>\n            </div>\n        </div>\n        <div class=\"to-cart-modal-background\"></div>"
        }),
        __metadata("design:paramtypes", [_toCartModal_service__WEBPACK_IMPORTED_MODULE_1__["ToCartModalService"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _metrika_service__WEBPACK_IMPORTED_MODULE_3__["MetrikaService"]])
    ], ToCartModalComponent);
    return ToCartModalComponent;
}());



/***/ }),

/***/ "./src/app/common/services/toCartModal.service.ts":
/*!********************************************************!*\
  !*** ./src/app/common/services/toCartModal.service.ts ***!
  \********************************************************/
/*! exports provided: ToCartModalService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToCartModalService", function() { return ToCartModalService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var ToCartModalService = /** @class */ (function () {
    function ToCartModalService() {
        this.modals = [];
    }
    ToCartModalService.prototype.add = function (modal) {
        // add modal to array of active modals
        this.modals.push(modal);
    };
    ToCartModalService.prototype.remove = function (id) {
        // remove modal from array of active modals
        this.modals = this.modals.filter(function (x) { return x.id !== id; });
    };
    ToCartModalService.prototype.open = function (id) {
        // open modal specified by id
        var modal = this.modals.filter(function (x) { return x.id === id; })[0];
        modal.open();
    };
    ToCartModalService.prototype.close = function (id) {
        // close modal specified by id
        var modal = this.modals.filter(function (x) { return x.id === id; })[0];
        modal.close();
    };
    ToCartModalService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])()
    ], ToCartModalService);
    return ToCartModalService;
}());



/***/ }),

/***/ "./src/app/content/about/about.component.css":
/*!***************************************************!*\
  !*** ./src/app/content/about/about.component.css ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "agm-map{\r\n    width: 75vw;\r\n}\r\n@media only screen and (max-device-width: 1400px) {\r\n    .google-maps_wrapper, agm-map{\r\n        width: 95vw;\r\n    }\r\n}"

/***/ }),

/***/ "./src/app/content/about/about.component.html":
/*!****************************************************!*\
  !*** ./src/app/content/about/about.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<section class=\"textMobileMenuSection\">\n    <div class=\"textMobileMenu_wrapper\">\n        <div class=\"contact__wrapper\">\n            <div class=\"textMobileMenu about_mobile\">\n                <h3>Цветочный</h3>\n                <span>Прекрасный магазин в удобном месте. Всегда свежие цветы, оригинальные букеты.</span>\n                <span>Огромный выбор декора, свечей и комнатных растеней.</span>\n            </div>\n            <div class=\"contact-info\">\n                <div class=\"contact-info_box\"><p>Телефон:</p>\n                    <p><a class=\"navbar-phone navLink\" href=\"tel:+380956979520\" (click)=\"metrika('nomer')\">095-697-95-20</a></p></div>\n                <div class=\"contact-info_box\"><p>Режим работы:</p>\n                    <p>10:00 - 20:00</p></div>\n                <div class=\"contact-info_box\"><p>Адрес:</p>\n                    <p>Сумская 77/79</p></div>\n                <div class=\"contact-info_box\"><p>Инстаграм:</p>\n                    <a href=\"https://www.instagram.com/_cvetochniy/\" target=\"_blank\">_cvetochniy</a></div>\n            </div>\n            <div class=\"google-maps_wrapper about-map\">\n                <agm-map [styles]=\"styles\" [latitude]=\"lat\" [zoom]=\"zoom\" [longitude]=\"lng\">\n                    <agm-marker [latitude]=\"lat\" [longitude]=\"lng\" [title]=\"text\" [iconUrl]=\"icon\"></agm-marker>\n                </agm-map>\n            </div>\n        </div>\n    </div>\n</section>\n"

/***/ }),

/***/ "./src/app/content/about/about.component.ts":
/*!**************************************************!*\
  !*** ./src/app/content/about/about.component.ts ***!
  \**************************************************/
/*! exports provided: AboutComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AboutComponent", function() { return AboutComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _common_services_metrika_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../common/services/metrika.service */ "./src/app/common/services/metrika.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AboutComponent = /** @class */ (function () {
    function AboutComponent(metrikaService) {
        this.metrikaService = metrikaService;
        this.text = 'Магазин Цветочный';
        this.lat = 50.0151007;
        this.lng = 36.2438004;
        this.zoom = 17;
        this.icon = {
            url: './/assets/images/glmarker.png',
            scaledSize: {
                width: 50,
                height: 50
            }
        };
        // myLatLng = {lat: this.lat, lng: this.lng};
        // marker = new google.maps.Marker({
        //     position: this.myLatLng,
        //     title: 'Магазин Цветочный',
        //     disableDefaultUI: true,
        // });
        this.styles = [
            {
                'stylers': [
                    {
                        'visibility': 'on'
                    },
                    {
                        'saturation': -100
                    },
                    {
                        'gamma': 0.54
                    }
                ]
            },
            {
                'featureType': 'road',
                'elementType': 'labels.icon',
                'stylers': [
                    {
                        'visibility': 'off'
                    }
                ]
            },
            {
                'featureType': 'water',
                'stylers': [
                    {
                        'color': '#4d4946'
                    }
                ]
            },
            {
                'featureType': 'poi',
                'elementType': 'labels.icon',
                'stylers': [
                    {
                        'visibility': 'off'
                    }
                ]
            },
            {
                'featureType': 'poi',
                'elementType': 'labels.text',
                'stylers': [
                    {
                        'visibility': 'simplified'
                    }
                ]
            },
            {
                'featureType': 'road',
                'elementType': 'geometry.fill',
                'stylers': [
                    {
                        'color': '#ffffff'
                    }
                ]
            },
            {
                'featureType': 'road.local',
                'elementType': 'labels.text',
                'stylers': [
                    {
                        'visibility': 'simplified'
                    }
                ]
            },
            {
                'featureType': 'water',
                'elementType': 'labels.text.fill',
                'stylers': [
                    {
                        'color': '#ffffff'
                    }
                ]
            },
            {
                'featureType': 'transit.line',
                'elementType': 'geometry',
                'stylers': [
                    {
                        'gamma': 0.48
                    }
                ]
            },
            {
                'featureType': 'transit.station',
                'elementType': 'labels.icon',
                'stylers': [
                    {
                        'visibility': 'off'
                    }
                ]
            },
            {
                'featureType': 'road',
                'elementType': 'geometry.stroke',
                'stylers': [
                    {
                        'gamma': 7.18
                    }
                ]
            }
        ];
    }
    AboutComponent.prototype.metrika = function (value) {
        this.metrikaService.metrika(value);
    };
    AboutComponent.prototype.ngOnInit = function () {
    };
    AboutComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-about',
            template: __webpack_require__(/*! ./about.component.html */ "./src/app/content/about/about.component.html"),
            styles: [__webpack_require__(/*! ./about.component.css */ "./src/app/content/about/about.component.css")]
        }),
        __metadata("design:paramtypes", [_common_services_metrika_service__WEBPACK_IMPORTED_MODULE_1__["MetrikaService"]])
    ], AboutComponent);
    return AboutComponent;
}());



/***/ }),

/***/ "./src/app/content/contact/contact.component.css":
/*!*******************************************************!*\
  !*** ./src/app/content/contact/contact.component.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/content/contact/contact.component.html":
/*!********************************************************!*\
  !*** ./src/app/content/contact/contact.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"sidebar-right\">\n    <div class=\"back-link_wrapper\" onclick=\"history.back(); return false;\">\n        <a class=\"back-link\">\n            назад\n        </a>\n        <svg class=\"arrow-svg\" width=\"60\" height=\"8\" viewBox=\"0 0 60 8\" fill=\"black\"\n             xmlns=\"http://www.w3.org/2000/svg\">\n            <path opacity=\"0.75\"\n                  d=\"M0.646446 3.64644C0.451183 3.8417 0.451183 4.15829 0.646446 4.35355L3.82843 7.53553C4.02369 7.73079 4.34027 7.73079 4.53553 7.53553C4.7308 7.34027 4.7308 7.02368 4.53553 6.82842L1.70711 3.99999L4.53553 1.17157C4.7308 0.976306 4.7308 0.659723 4.53553 0.464461C4.34027 0.269199 4.02369 0.269199 3.82843 0.464461L0.646446 3.64644ZM60 3.5L1 3.49999L1 4.49999L60 4.5L60 3.5Z\"\n                  fill=\"white\"/>\n        </svg>\n    </div>\n    <div class=\"contact__wrapper\">\n        <div class=\"contact-info\">\n            <div class=\"contact-info_box\"><p>Телефон:</p><a class=\"navbar-phone\"\n                                                            href=\"tel:+380956979520\" (click)=\"metrika('nomer')\">095-697-95-20</a>\n            </div>\n            <div class=\"contact-info_box\"><p>Режим работы:</p>\n                <p>10:00 - 20:00</p></div>\n            <div class=\"contact-info_box\"><p>Адрес:</p>\n                <p>Сумская 77/79</p></div>\n            <div class=\"contact-info_box\" ><p>Инстаграм:</p>\n                <a class=\"contact-info_box_instagram\" href=\"https://www.instagram.com/_cvetochniy/\" target=\"_blank\">_cvetochniy</a></div>\n        </div>\n        <div class=\"google-maps_wrapper\">\n            <agm-map  [styles]=\"styles\" [latitude]=\"lat\" [zoom]=\"zoom\" [longitude]=\"lng\">\n                <agm-marker  [latitude]=\"lat\" [longitude]=\"lng\" [title]=\"text\" [iconUrl]=\"icon\"></agm-marker>\n            </agm-map>\n        </div>\n    </div>\n</div>\n\n"

/***/ }),

/***/ "./src/app/content/contact/contact.component.ts":
/*!******************************************************!*\
  !*** ./src/app/content/contact/contact.component.ts ***!
  \******************************************************/
/*! exports provided: ContactComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContactComponent", function() { return ContactComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _common_services_metrika_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../common/services/metrika.service */ "./src/app/common/services/metrika.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ContactComponent = /** @class */ (function () {
    function ContactComponent(metrikaService) {
        this.metrikaService = metrikaService;
        this.markerUrl = './/assets/images/glmarker.png';
        this.text = 'Магазин Цветочный';
        this.lat = 50.0151007;
        this.lng = 36.2438004;
        this.zoom = 17;
        this.icon = {
            url: './/assets/images/glmarker.png',
            scaledSize: {
                width: 50,
                height: 50
            }
        };
        this.styles = [
            {
                'stylers': [
                    {
                        'visibility': 'on'
                    },
                    {
                        'saturation': -100
                    },
                    {
                        'gamma': 0.54
                    }
                ]
            },
            {
                'featureType': 'road',
                'elementType': 'labels.icon',
                'stylers': [
                    {
                        'visibility': 'off'
                    }
                ]
            },
            {
                'featureType': 'water',
                'stylers': [
                    {
                        'color': '#4d4946'
                    }
                ]
            },
            {
                'featureType': 'poi',
                'elementType': 'labels.icon',
                'stylers': [
                    {
                        'visibility': 'off'
                    }
                ]
            },
            {
                'featureType': 'poi',
                'elementType': 'labels.text',
                'stylers': [
                    {
                        'visibility': 'simplified'
                    }
                ]
            },
            {
                'featureType': 'road',
                'elementType': 'geometry.fill',
                'stylers': [
                    {
                        'color': '#ffffff'
                    }
                ]
            },
            {
                'featureType': 'road.local',
                'elementType': 'labels.text',
                'stylers': [
                    {
                        'visibility': 'simplified'
                    }
                ]
            },
            {
                'featureType': 'water',
                'elementType': 'labels.text.fill',
                'stylers': [
                    {
                        'color': '#ffffff'
                    }
                ]
            },
            {
                'featureType': 'transit.line',
                'elementType': 'geometry',
                'stylers': [
                    {
                        'gamma': 0.48
                    }
                ]
            },
            {
                'featureType': 'transit.station',
                'elementType': 'labels.icon',
                'stylers': [
                    {
                        'visibility': 'off'
                    }
                ]
            },
            {
                'featureType': 'road',
                'elementType': 'geometry.stroke',
                'stylers': [
                    {
                        'gamma': 7.18
                    }
                ]
            }
        ];
    }
    ContactComponent.prototype.metrika = function (value) {
        this.metrikaService.metrika(value);
    };
    ContactComponent.prototype.ngOnInit = function () {
    };
    ContactComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-contact',
            template: __webpack_require__(/*! ./contact.component.html */ "./src/app/content/contact/contact.component.html"),
            styles: [__webpack_require__(/*! ./contact.component.css */ "./src/app/content/contact/contact.component.css")]
        }),
        __metadata("design:paramtypes", [_common_services_metrika_service__WEBPACK_IMPORTED_MODULE_1__["MetrikaService"]])
    ], ContactComponent);
    return ContactComponent;
}());



/***/ }),

/***/ "./src/app/content/cooperation/cooperation.component.css":
/*!***************************************************************!*\
  !*** ./src/app/content/cooperation/cooperation.component.css ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/content/cooperation/cooperation.component.html":
/*!****************************************************************!*\
  !*** ./src/app/content/cooperation/cooperation.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<section class=\"textMobileMenuSection\">\n  <div class=\"textMobileMenu cooperation_mobile\">\n    <h3>Предложения сотрудничества: </h3>\n    <a href=\"tel:+380966091255\">&nbsp;096&#8209;609&#8209;12&#8209;55</a>\n    <a href=\"mailto:lazutikovnikita@gmail.com\">lazutikovnikita@gmail.com</a>\n    <h3>Корпоративные и оптовые заказы </h3>\n    <a href=\"tel:+380956979520\">&nbsp;095&#8209;697&#8209;95&#8209;20</a>\n    <a href=\"mailto:cvetochniykharkiv@gmail.com\">cvetochniykharkiv@gmail.com</a>\n  </div>\n</section>\n"

/***/ }),

/***/ "./src/app/content/cooperation/cooperation.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/content/cooperation/cooperation.component.ts ***!
  \**************************************************************/
/*! exports provided: CooperationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CooperationComponent", function() { return CooperationComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var CooperationComponent = /** @class */ (function () {
    function CooperationComponent() {
    }
    CooperationComponent.prototype.ngOnInit = function () {
    };
    CooperationComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-cooperation',
            template: __webpack_require__(/*! ./cooperation.component.html */ "./src/app/content/cooperation/cooperation.component.html"),
            styles: [__webpack_require__(/*! ./cooperation.component.css */ "./src/app/content/cooperation/cooperation.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], CooperationComponent);
    return CooperationComponent;
}());



/***/ }),

/***/ "./src/app/content/delivery/delivery.component.css":
/*!*********************************************************!*\
  !*** ./src/app/content/delivery/delivery.component.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/content/delivery/delivery.component.html":
/*!**********************************************************!*\
  !*** ./src/app/content/delivery/delivery.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<section class=\"textMobileMenuSection\">\n  <div class=\"textMobileMenu delivery_mobile\">\n<!--    <p><span style=\"color: #ff4500; padding: 0 \">Бесплатная</span><span>доставка</span></p>-->\n<!--    <span>на время карантина</span>-->\n    <h3>Доставка курьреом</h3>\n<!--    <span>на время карантина</span>-->\n    <span>по Харькову от 50 гривен</span>\n    <span>Бесплатная доставка <strong>от 1500 гривен</strong></span>\n  </div>\n</section>\n"

/***/ }),

/***/ "./src/app/content/delivery/delivery.component.ts":
/*!********************************************************!*\
  !*** ./src/app/content/delivery/delivery.component.ts ***!
  \********************************************************/
/*! exports provided: DeliveryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeliveryComponent", function() { return DeliveryComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var DeliveryComponent = /** @class */ (function () {
    function DeliveryComponent() {
    }
    DeliveryComponent.prototype.ngOnInit = function () {
    };
    DeliveryComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-delivery',
            template: __webpack_require__(/*! ./delivery.component.html */ "./src/app/content/delivery/delivery.component.html"),
            styles: [__webpack_require__(/*! ./delivery.component.css */ "./src/app/content/delivery/delivery.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], DeliveryComponent);
    return DeliveryComponent;
}());



/***/ }),

/***/ "./src/app/content/shop/cart/cart.component.css":
/*!******************************************************!*\
  !*** ./src/app/content/shop/cart/cart.component.css ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".cart-img{\r\n    cursor: pointer;\r\n}\r\n.blocked {\r\n    cursor: no-drop;\r\n    background-color: whitesmoke;\r\n    color: #b9b5b5;\r\n}\r\n"

/***/ }),

/***/ "./src/app/content/shop/cart/cart.component.html":
/*!*******************************************************!*\
  !*** ./src/app/content/shop/cart/cart.component.html ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"sidebar-right\">\r\n    <div class=\"back-link_wrapper\" onclick=\"history.back(); return false;\">\r\n        <a class=\"back-link\">\r\n            назад\r\n        </a>\r\n        <svg class=\"arrow-svg\" width=\"60\" height=\"8\" viewBox=\"0 0 60 8\" fill=\"black\"\r\n             xmlns=\"http://www.w3.org/2000/svg\">\r\n            <path opacity=\"0.75\"\r\n                  d=\"M0.646446 3.64644C0.451183 3.8417 0.451183 4.15829 0.646446 4.35355L3.82843 7.53553C4.02369 7.73079 4.34027 7.73079 4.53553 7.53553C4.7308 7.34027 4.7308 7.02368 4.53553 6.82842L1.70711 3.99999L4.53553 1.17157C4.7308 0.976306 4.7308 0.659723 4.53553 0.464461C4.34027 0.269199 4.02369 0.269199 3.82843 0.464461L0.646446 3.64644ZM60 3.5L1 3.49999L1 4.49999L60 4.5L60 3.5Z\"\r\n                  fill=\"white\"/>\r\n        </svg>\r\n    </div>\r\n    <div class=\"cart__wrapper\">\r\n        <div class=\"cart-info\">\r\n            <div id=\"cart-table\">\r\n                <div class=\"table-cart-titles table-cart-fullSize\">\r\n                    <span class=\" cart-img-title\"></span>\r\n                    <span class=\" cart-title-title\">Наименование</span>\r\n                    <span class=\" cart-price-title\">Цена</span>\r\n                    <span class=\" cart-count-title\">Количество</span>\r\n                    <span class=\" cart-price-title\">Стоимость</span>\r\n                </div>\r\n                <div *ngIf=\"cart.itemCount == 0\" class=\"empty_cart\">корзина пуста :(</div>\r\n                <div class=\"cart-elems_wrapper\" *ngFor=\"let line of cart.lines\">\r\n                    <div class=\"cart-elems\" *ngIf=\"line.quantity > 0\">\r\n                        <div class=\"cart-elem cart-product-img cart-img-title\">\r\n                            <img class=\"cart-img\" [src]=\"line.product.img\" [alt]=\"line.product.name\"\r\n                                 [routerLink]=\"['/category',line.product.parentCategory,'id',line.product._id]\"\r\n                            ></div>\r\n                        <div class=\"cart-elem cart-product-title cart-title-title\">\r\n                            <span class=\"product-desc-mobile\"></span>\r\n                            <span class=\"cart_product_name\">{{line.product.name}}</span>\r\n                        </div>\r\n                        <div class=\"cart-elem cart-price cart-price-title\">\r\n                            <span class=\"product-desc-mobile\">Цена:</span>\r\n                            <span>{{line.product.price}} грн</span>\r\n                        </div>\r\n                        <div class=\"cart-elem cart-count-nav cart-count-title\">\r\n                            <span class=\"product-desc-mobile\">Кол-во:</span>\r\n\r\n                            <div class=\"incr_derc_wrapper\">\r\n                                <span class=\"count__decrease\"\r\n                                      (click)=\"cart.decrementQuantity(line.product)\"\r\n                                >&nbsp;-&nbsp;</span>\r\n                                <span class=\"count__decrease_m\"\r\n                                (click)=\"cart.decrementQuantity(line.product)\">\r\n                                    <i class=\"fas fa-minus\"></i>&nbsp;&nbsp;</span>\r\n                                <span class=\"count__sum\">{{line.quantity}}</span>\r\n                                <span class=\"count__increase\"\r\n                                (click)=\"cart.incrementQuantity(line.product)\"\r\n                                >&nbsp;+&nbsp;\r\n                                </span>\r\n                                <span class=\"count__increase_m\"\r\n                                (click)=\"cart.incrementQuantity(line.product)\"\r\n                                >&nbsp;&nbsp;<i class=\"fas fa-plus\"></i>\r\n                                </span>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"cart-elem price-num cart-price-title\">\r\n                            <span class=\"product-desc-mobile\">Ст-ть:</span>\r\n                            <span>{{line.quantity * line.product.price}} грн</span>\r\n                        </div>\r\n                        <div class=\"cart-remove\">\r\n                            <i (click)=\"cart.removeLine(line.product._id)\"></i>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"cart-total-price\">\r\n                    <span class=\"totalCelText\">Итого: </span>\r\n                    <span class=\"totalCel\">{{cart.cartPrice}} грн</span>\r\n                </div>\r\n            </div>\r\n            <div class=\"cart-buttons_wrapper\">\r\n                <button type=\"submit\" class=\"cart-button\" (click)=\"navToShop()\">Продолжить покупки</button>\r\n                <button type=\"submit\" class=\"cart-button orange_btn\" [class.blocked]=\"cart.itemCount == 0\" routerLink=\"/checkout\">\r\n                    Оформить заказ\r\n                </button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/content/shop/cart/cart.component.ts":
/*!*****************************************************!*\
  !*** ./src/app/content/shop/cart/cart.component.ts ***!
  \*****************************************************/
/*! exports provided: CartComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CartComponent", function() { return CartComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _model_cart_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../model/cart.model */ "./src/app/model/cart.model.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CartComponent = /** @class */ (function () {
    function CartComponent(cart, _router) {
        this.cart = cart;
        this._router = _router;
    }
    CartComponent.prototype.navToShop = function () {
        this._router.navigateByUrl('category/shop');
    };
    CartComponent.prototype.ngOnInit = function () {
        if (this.cart.itemCount === 0) {
            this.navToShop();
        }
    };
    CartComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-cart',
            template: __webpack_require__(/*! ./cart.component.html */ "./src/app/content/shop/cart/cart.component.html"),
            styles: [__webpack_require__(/*! ./cart.component.css */ "./src/app/content/shop/cart/cart.component.css")]
        }),
        __metadata("design:paramtypes", [_model_cart_model__WEBPACK_IMPORTED_MODULE_1__["Cart"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], CartComponent);
    return CartComponent;
}());



/***/ }),

/***/ "./src/app/content/shop/checkout/checkout.component.css":
/*!**************************************************************!*\
  !*** ./src/app/content/shop/checkout/checkout.component.css ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "mat-datepicker-toggle {\r\n    /*color: rgb(255, 255, 255) !important;*/\r\n}\r\ninput:-webkit-autofill,\r\ninput:-webkit-autofill:hover,\r\ninput:-webkit-autofill:focus,\r\ninput:-webkit-autofill:active  {\r\n    -webkit-box-shadow: 0 0 0 30px #ffffff inset !important;\r\n    /*-webkit-text-fill-color: #ffffff;*/\r\n}\r\n#orderForm .form_error_message li{\r\n    color: #ff4081;\r\n}"

/***/ }),

/***/ "./src/app/content/shop/checkout/checkout.component.html":
/*!***************************************************************!*\
  !*** ./src/app/content/shop/checkout/checkout.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<section class=\"checkout_section\">\r\n    <div class=\"back-link_wrapper back-link_checkout\" *ngIf=\"!orderSent\">\r\n        <i class=\"fa fa-chevron-circle-left fa-3x back-link_fa\" onclick=\"history.back(); return false;\"></i>\r\n        <a class=\"back-link\" onclick=\"history.back(); return false;\">назад в корзину</a>\r\n        <svg onclick=\"history.back(); return false;\" class=\"arrow-svg\" width=\"60\" height=\"8\" viewBox=\"0 0 60 8\"\r\n             fill=\"black\"\r\n             xmlns=\"http://www.w3.org/2000/svg\">\r\n            <path opacity=\"0.75\"\r\n                  d=\"M0.646446 3.64644C0.451183 3.8417 0.451183 4.15829 0.646446 4.35355L3.82843 7.53553C4.02369 7.73079 4.34027 7.73079 4.53553 7.53553C4.7308 7.34027 4.7308 7.02368 4.53553 6.82842L1.70711 3.99999L4.53553 1.17157C4.7308 0.976306 4.7308 0.659723 4.53553 0.464461C4.34027 0.269199 4.02369 0.269199 3.82843 0.464461L0.646446 3.64644ZM60 3.5L1 3.49999L1 4.49999L60 4.5L60 3.5Z\"\r\n                  fill=\"white\"/>\r\n        </svg>\r\n    </div>\r\n    <div *ngIf=\"orderSent\" class=\"order_sent\">\r\n        <h2>Спасибо!</h2>\r\n        <p>Спасибо за оформление заказа.</p>\r\n        <p>Мы свяжемся с вами в ближайшее время</p>\r\n        <button class=\"order-btn\" routerLink=\"/category/shop\">вернуться в магазин</button>\r\n    </div>\r\n    <div class=\"order_bottom_wrapper\" *ngIf=\"!orderSent\">\r\n        <div class=\"order-product-wrapper\">\r\n            <div class=\"order-tittle\">Ваш заказ</div>\r\n            <div class=\"order-product-info-box\">\r\n                <div class=\"order-product-info\" *ngFor=\"let line of cart.lines\">\r\n                    <div class=\"order-elem order-product-img\">\r\n                        <img [src]=\"line.product.img\" alt=\"Rose3\">\r\n                    </div>\r\n                    <div class=\"order-elem order-product-title\">\r\n                        <span>{{line.product.name}}</span>\r\n                    </div>\r\n                    <div class=\"order-elem order-count\">\r\n                        <span class=\"\">&nbsp;x&nbsp;</span>\r\n                        <span class=\"order-count-num\">&nbsp;{{line.quantity}}&nbsp;</span>\r\n                    </div>\r\n                    <div class=\"order-elem order-price-num \">\r\n                        <span>{{line.quantity * line.product.price}} грн</span>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"order-total-price\">\r\n                <span>Итого: </span><span>{{cart.cartPrice}} грн</span><span *ngIf=\"delivery\">&nbsp;+ доставка</span>\r\n            </div>\r\n        </div>\r\n        <div class=\"order-center-line\"></div>\r\n        <div class=\"order-costumer-form-wrapper\">\r\n            <div class=\"order-tittle\">Ваши данные</div>\r\n            <div class=\"order-product-form-box\">\r\n                <form id=\"orderForm\" autocomplete=\"off\" #form=\"ngForm\"\r\n                      (ngSubmit)=\"submitOrder(form)\">\r\n                    <div role=\"group\">\r\n                        <div class=\"order_field\"><label for=\"name\">Ваше Имя: <em>*</em></label>\r\n                            <input type=\"text\"\r\n                                   id=\"name\"\r\n                                   name=\"username\"\r\n                                   [(ngModel)]=\"order.clientName\"\r\n                                   #name=\"ngModel\"\r\n                                   required\r\n                            >\r\n                            <ul class=\"form_error_message\"\r\n                                *ngIf=\"name.touched && name.invalid || loading && name.invalid\">\r\n                                <li *ngIf=\"name.errors.required\">\r\n                                    введите имя\r\n                                </li>\r\n                            </ul>\r\n                        </div>\r\n                        <div class=\"order_field\"><label for=\"phone\">Ваш номер телефона: <em>*</em></label>\r\n                            <input\r\n                                    type=\"tel\"\r\n                                    id=\"phone\"\r\n                                    [(ngModel)]=\"order.clientPhone\"\r\n                                    #phone=\"ngModel\"\r\n                                    prefix=\"+38\"\r\n                                    mask=\"(000) 000 00 00\"\r\n                                    [showMaskTyped]=\"false\"\r\n                                    name=\"tel\"\r\n                                    required\r\n                                    minlength=\"10\"\r\n                            >\r\n                            <ul class=\"form_error_message\"\r\n                                 *ngIf=\"phone.touched && phone.invalid || loading && phone.invalid\">\r\n                                <li *ngIf=\"phone.errors.required || phone.errors.minlength\">\r\n                                    укажите телефон\r\n                                </li>\r\n                            </ul>\r\n                        </div>\r\n\r\n                    </div>\r\n                    <div role=\"group\">\r\n                        <div class=\"order_field\">\r\n                            <label for=\"deliveryWay\">Способ доставки: <em>*</em>\r\n                            </label>\r\n                            <select id='deliveryWay' [(ngModel)]=\"order.deliveryWay\" (change)=\"deliveryLog()\" #deliver name=\"deliver\">\r\n                                <option selected >самостоятельно из магазина</option>\r\n                                <option>доставка курьером</option>\r\n                            </select>\r\n                        </div>\r\n                        <div class=\"order_field\">\r\n                            <label for=\"paymentWay\">Способ оплаты: <em>*</em></label>\r\n                            <select id='paymentWay' [(ngModel)]=\"order.paymentWay\" name=\"payment\">\r\n                                <option>наличными</option>\r\n                                <option>перевод на карту</option>\r\n                            </select>\r\n                        </div>\r\n                    </div>\r\n                    <div role=\"group\" class=\"delivery-address\" *ngIf=\"delivery\">\r\n                        <div class=\"order_field\">\r\n                            <label for=\"deliveryAddress\">Адрес доставки: <em>*</em>\r\n                            </label>\r\n                            <input type=\"text\"\r\n                                   id=\"deliveryAddress\"\r\n                                   placeholder=\"улица, дом, кв\"\r\n                                   name=\"addressDelivery\"\r\n                                   [(ngModel)]=\"order.addressDelivery\"\r\n                                   #address=\"ngModel\"\r\n                                   required\r\n                            >\r\n                            <ul class=\"form_error_message\"\r\n                                *ngIf=\"address.touched && address.invalid || loading && address.invalid\">\r\n                                <li *ngIf=\"address.errors.required\">\r\n                                    укажите адрес\r\n                                </li>\r\n                            </ul>\r\n                        </div>\r\n                        <div class=\"order_field datePickField\">\r\n                            <label for=\"datePick\"> Дата доставки: <em>*</em>\r\n                            </label>\r\n                            <input id=\"datePick\" matInput [matDatepicker]=\"picker\"\r\n                                   type=\"text\"\r\n                                   placeholder=\"нажмите на иконку справа\"\r\n                                   name=\"datePick\"\r\n                                   [(ngModel)]=\"order.dateDelivery\"\r\n                                   #date=\"ngModel\"\r\n                                   required\r\n                            >\r\n                            <mat-datepicker-toggle matSuffix [for]=\"picker\" class=\"datePickerBtn\"></mat-datepicker-toggle>\r\n                            <mat-datepicker #picker></mat-datepicker>\r\n                            <ul class=\"form_error_message\"\r\n                                *ngIf=\"date.touched && date.invalid || loading && date.invalid\">\r\n                                <li *ngIf=\"date.errors.required\">\r\n                                    укажите дату\r\n                                </li>\r\n                            </ul>\r\n                        </div>\r\n                        <div class=\"order_field order_time\">\r\n                            <label for=\"time\">Время доставки: <em>*</em></label>\r\n                            <input type=\"text\"\r\n                                   id=\"time\"\r\n                                   name=\"timeDelivery\"\r\n                                   #timeD=\"ngModel\"\r\n                                   [(ngModel)]=\"order.timeDelivery\"\r\n                                   class=\"datepicker-here\"\r\n                                   data-timepicker=\"true\"\r\n                                   mask=\"Hh:m0\"\r\n                                   required\r\n\r\n                            >\r\n                            <ul class=\"form_error_message\"\r\n                                *ngIf=\"timeD.touched && timeD.invalid || loading && timeD.invalid\">\r\n                                <li>\r\n                                    укажите время доставки\r\n                                </li>\r\n                            </ul>\r\n                        </div>\r\n                    </div>\r\n                    <div role=\"group\" class=\"receiver-box\" *ngIf=\"delivery\">\r\n                        <div>Получатель:</div>\r\n                        <input class=\"receiver-solo\" id='receiverSolo' type=\"radio\"\r\n                               name=\"receiverSolo\"\r\n                               value=\"лично\"\r\n                               [(ngModel)]=\"order.receiveSolo\"\r\n                        >\r\n                        <label for=\"receiverSolo\">Вы лично</label>\r\n                        <input class=\"receiver-friend\" value=\"другой человек\" id='receiverFriend' type=\"radio\"\r\n                               name=\"receiverSolo\"\r\n                               [(ngModel)]=\"order.receiveSolo\"\r\n                        >\r\n                        <label for=\"receiverFriend\">Другой человек</label>\r\n                        <div class=\"friend-delivery\" *ngIf=\"order.receiveSolo !== 'лично'\">\r\n                            <div class=\"order_field\"><label for=\"friendName\">Имя Получателя: <em>*</em></label>\r\n                                <input type=\"text\"\r\n                                       id=\"friendName\"\r\n                                       name=\"friendName\"\r\n                                       [(ngModel)]=\"order.friendName\"\r\n                                       #nameFriend=\"ngModel\"\r\n                                       required\r\n                                >\r\n                                <ul class=\"form_error_message\"\r\n                                    *ngIf=\"nameFriend.touched && nameFriend.invalid || loading && nameFriend.invalid\">\r\n                                    <li *ngIf=\"nameFriend.errors.required\">\r\n                                        введите имя получателя\r\n                                    </li>\r\n                                </ul>\r\n                            </div>\r\n                            <div class=\"order_field\"><label for=\"friendPhone\">Номер телефона получателя: </label>\r\n                                <input type=\"tel\"\r\n                                       id=\"friendPhone\"\r\n                                       [(ngModel)]=\"order.friendPhone\"\r\n                                       #phoneFriend=\"ngModel\"\r\n                                       prefix=\"+38\"\r\n                                       mask=\"(000) 000 00 00\"\r\n                                       [showMaskTyped]=\"false\"\r\n                                       name=\"friendPhone\"\r\n                                       minlength=\"10\"\r\n                                >\r\n                                <ul class=\"form_error_message\"\r\n                                    *ngIf=\"phoneFriend.touched && phoneFriend.invalid || loading && phoneFriend.invalid\">\r\n                                    <li *ngIf=\"phoneFriend.errors.required\">\r\n                                        введите номер\r\n                                    </li>\r\n                                </ul>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"order-btn-wrapper\">\r\n                        <button type=\"submit\" class=\"order-btn orange_btn\" [class.blocked]=\"form.invalid\">Заказать</button>\r\n                    </div>\r\n                </form>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</section>\r\n"

/***/ }),

/***/ "./src/app/content/shop/checkout/checkout.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/content/shop/checkout/checkout.component.ts ***!
  \*************************************************************/
/*! exports provided: CheckoutComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CheckoutComponent", function() { return CheckoutComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _model_cart_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../model/cart.model */ "./src/app/model/cart.model.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/core */ "./node_modules/@angular/material/esm5/core.es5.js");
/* harmony import */ var _model_send_email_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../model/send-email.service */ "./src/app/model/send-email.service.ts");
/* harmony import */ var _model_order_repository__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../model/order.repository */ "./src/app/model/order.repository.ts");
/* harmony import */ var _model_order_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../model/order.model */ "./src/app/model/order.model.ts");
/* harmony import */ var _model_rest_datasource__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../model/rest.datasource */ "./src/app/model/rest.datasource.ts");
/* harmony import */ var _common_services_metrika_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../common/services/metrika.service */ "./src/app/common/services/metrika.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var CheckoutComponent = /** @class */ (function () {
    function CheckoutComponent(_sendService, cart, _router, _adapter, repository, metrikaService, order, _restData) {
        this._sendService = _sendService;
        this.cart = cart;
        this._router = _router;
        this._adapter = _adapter;
        this.repository = repository;
        this.metrikaService = metrikaService;
        this.order = order;
        this._restData = _restData;
        this.loading = false;
        this.delivery = false;
        this.orderSent = false;
    }
    CheckoutComponent.prototype.sendSms = function () {
        this._restData.sendSMS('с помощью корзины');
    };
    CheckoutComponent.prototype.metrika = function (value) {
        this.metrikaService.metrika(value);
    };
    CheckoutComponent.prototype.submitOrder = function (form) {
        var _this = this;
        this.sendSms();
        this.loading = true;
        if (form.valid) {
            this.metrika('zakaz');
            this.repository.saveOrder(this.order).subscribe(function (order) {
                _this.sendOder();
                _this.order.clear();
                _this.cart.clear();
                _this.orderSent = true;
                _this.loading = false;
            });
        }
    };
    CheckoutComponent.prototype.sendOder = function () {
        this._sendService.sendEmail('order', this.order.clientName, this.order.clientPhone, null, null, null, null, this.order).subscribe(function (data) {
            var res = data;
            console.log("mail has been sent");
        }, function (err) {
            console.log(err);
        });
    };
    CheckoutComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._adapter.setLocale('ua');
        if (this.cart.itemCount === 0) {
            this._router.navigateByUrl('category/shop');
        }
        this.order.deliveryWay = 'самостоятельно из магазина';
        this.order.paymentWay = 'наличными';
        this.order.receiveSolo = 'лично';
        this.order.timeDelivery = '12:00';
        this.cart.lines.forEach(function (prod) {
            _this.order.cart.push({
                productId: prod.product._id,
                productName: prod.product.name,
                productPrice: prod.product.price,
                productQuantity: prod.quantity
            });
        });
        this.order.itemCount = this.cart.itemCount;
        this.order.cartPrice = this.cart.cartPrice;
    };
    CheckoutComponent.prototype.deliveryLog = function () {
        this.delivery = !this.delivery;
    };
    CheckoutComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-checkout',
            template: __webpack_require__(/*! ./checkout.component.html */ "./src/app/content/shop/checkout/checkout.component.html"),
            styles: [__webpack_require__(/*! ./checkout.component.css */ "./src/app/content/shop/checkout/checkout.component.css")]
        }),
        __metadata("design:paramtypes", [_model_send_email_service__WEBPACK_IMPORTED_MODULE_4__["SendEmailService"],
            _model_cart_model__WEBPACK_IMPORTED_MODULE_1__["Cart"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _angular_material_core__WEBPACK_IMPORTED_MODULE_3__["DateAdapter"],
            _model_order_repository__WEBPACK_IMPORTED_MODULE_5__["OrderRepository"],
            _common_services_metrika_service__WEBPACK_IMPORTED_MODULE_8__["MetrikaService"],
            _model_order_model__WEBPACK_IMPORTED_MODULE_6__["Order"], _model_rest_datasource__WEBPACK_IMPORTED_MODULE_7__["RestDataSource"]])
    ], CheckoutComponent);
    return CheckoutComponent;
}());



/***/ }),

/***/ "./src/app/content/shop/one-product/one-product.component.css":
/*!********************************************************************!*\
  !*** ./src/app/content/shop/one-product/one-product.component.css ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/content/shop/one-product/one-product.component.html":
/*!*********************************************************************!*\
  !*** ./src/app/content/shop/one-product/one-product.component.html ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"one_product__wrapper\">\r\n    <div *ngIf=\"!isLoading\" class=\"popup\" [class.modal_open]=\"popUp\">\r\n        <img [src]=\"product.img\" [alt]=\"product.name\">\r\n        <div class=\"close-popup\" (click)=\"popUpSwitcher()\"></div>\r\n    </div>\r\n    <div class=\"overlay\" [class.modal_open]=\"popUp\" (click)=\"popUpSwitcher()\">\r\n    </div>\r\n    <div class=\"back-link_wrapper\">\r\n        <i class=\"fa fa-chevron-circle-left fa-3x back-link_fa\" onclick=\"history.back(); return false;\"></i>\r\n        <a class=\"back-link\" onclick=\"history.back(); return false;\">назад</a>\r\n        <svg onclick=\"history.back(); return false;\" class=\"arrow-svg\" width=\"60\" height=\"8\" viewBox=\"0 0 60 8\"\r\n             fill=\"black\"\r\n             xmlns=\"http://www.w3.org/2000/svg\">\r\n            <path opacity=\"0.75\"\r\n                  d=\"M0.646446 3.64644C0.451183 3.8417 0.451183 4.15829 0.646446 4.35355L3.82843 7.53553C4.02369 7.73079 4.34027 7.73079 4.53553 7.53553C4.7308 7.34027 4.7308 7.02368 4.53553 6.82842L1.70711 3.99999L4.53553 1.17157C4.7308 0.976306 4.7308 0.659723 4.53553 0.464461C4.34027 0.269199 4.02369 0.269199 3.82843 0.464461L0.646446 3.64644ZM60 3.5L1 3.49999L1 4.49999L60 4.5L60 3.5Z\"\r\n                  fill=\"white\"/>\r\n        </svg>\r\n    </div>\r\n    <div class=\"product-card__wrapper\" *ngIf=\"!isLoading\">\r\n        <div class=\"product-card__left\">\r\n            <app-cart-modal id=\"{{product._id}}\">\r\n                <span>{{product.name}}</span>\r\n            </app-cart-modal>\r\n            <div class=\"product-card__img\">\r\n                <img id=\"productImg\" [src]=\"product.img\" [alt]=\"product.name\" (click)=\"popUpSwitcher()\">\r\n            </div>\r\n        </div>\r\n        <div class=\"product-card__right\">\r\n            <div class=\"product-card__name\" id=\"productName\">{{product.name}}</div>\r\n            <div class=\"product-card__description\">\r\n            <span class=\"product-card__small-text\">Описание:\r\n&nbsp;</span>\r\n                <span id=\"productDesc\">{{product.description}}</span>\r\n            </div>\r\n            <div class=\"product-card__size\" *ngIf=\"product.diameter\">\r\n            <span class=\"product-card__small-text\">Диаметр:\r\n&nbsp;</span>\r\n                <span id=\"productSize\">{{product.diameter}}\r\n                    &nbsp;см</span>\r\n            </div>\r\n            <div class=\"product-card__prices\">\r\n            <span class=\"product-card__small-text\">Цена:\r\n&nbsp;</span>\r\n                <span id=\"productPrice\">{{product.price}}\r\n                    &nbsp;грн</span>\r\n            </div>\r\n            <div class=\"orderText-shop\">\r\n                <div class=\"card-buttons_wrapper\">\r\n                    <button type=\"submit\" class=\"cart-button orange_btn\" (click)=\"addProductToCart(product)\">Добавить в\r\n                        корзину\r\n                    </button>\r\n                    <button type=\"submit\" class=\"cart-button\" (click)=\"modalSwitcher()\">Купить в один клик</button>\r\n                    <div class=\"product-card__quantity\">\r\n                        <p *ngIf=\"productLine && productLine.quantity > 0\" class=\"product-card__quantity\">товара в\r\n                            корзине: {{productLine.quantity}}\r\n                        </p>\r\n                    </div>\r\n                </div>\r\n                <p class=\"note_wrapper\" *ngIf=\"product.note\"><span>*&nbsp;</span>\r\n                    <span class=\"note_title\">Примечание:&nbsp;</span>{{product.note}}.</p>\r\n                <div class=\"consultation consultation-wrapper\">\r\n                    <div class=\"consultation_popup-overlay\" (click)=\"modalSwitcher()\" [class.modal_open]=\"class\"></div>\r\n                <div class=\"consultation consultation-wrapper\">\r\n                    <div class=\"consultation_popup-overlay\" (click)=\"modalSwitcher()\" [class.modal_open]=\"class\"></div>\r\n                    <!-- //оверлей - отображение формы на затемненном фоне -->\r\n                    <div class=\"consultation_popWindow consultation_subscribe_window\" [class.modal_open]=\"class\">\r\n                        <!-- //основное окно формы Подписки -->\r\n                        <p class=\"consultation_subcsribe-text\">Форма обратной связи</p>\r\n                        <form novalidate #form=\"ngForm\"\r\n                              (ngSubmit)=\"sendEmail(form)\"\r\n                              class=\"consultation_subscribe-form\"\r\n                        >\r\n                            <div>\r\n                                <input type=\"text\"\r\n                                       id=\"name-contact\"\r\n                                       placeholder=\"Имя\"\r\n                                       name=\"username\"\r\n                                       [(ngModel)]=\"username\"\r\n                                       #name=\"ngModel\"\r\n                                       required>\r\n                                <span class=\"star_req_form\"> *</span>\r\n                                <ul class=\"form_error_message\"\r\n                                    *ngIf=\"name.touched && name.invalid || loading && name.invalid\">\r\n                                    <li *ngIf=\"name.errors.required\">\r\n                                        Введите имя\r\n                                    </li>\r\n                                </ul>\r\n                            </div>\r\n                            <div>\r\n                                <input [(ngModel)]=\"phonenumber\"\r\n                                       #phone=\"ngModel\"\r\n                                       type='tel'\r\n                                       prefix=\"+38\"\r\n                                       mask=\"(000) 000 00 00\"\r\n                                       [showMaskTyped]=\"true\"\r\n                                       id=\"tel-contact\"\r\n                                       name=\"tel\"\r\n                                       required\r\n                                       minlength=\"10\"\r\n                                >\r\n                                <span class=\"star_req_form\"> *</span>\r\n                                <ul class=\"form_error_message\"\r\n                                    *ngIf=\"phone.touched && phone.invalid || loading && phone.invalid\">\r\n                                    <li *ngIf=\"phone.errors.required || phone.errors.minlength\">\r\n                                        Укажите телефон\r\n                                    </li>\r\n                                </ul>\r\n                            </div>\r\n                            <div class=\"consultation_aligncenter\">\r\n                                <button [disabled]=\"form.invalid && loading\"\r\n                                        type=\"submit\"\r\n                                        class=\"consultation_btn orange_btn\">\r\n                                    <i *ngIf=\"messageSent\" class=\"fa fa-check\" aria-hidden=\"true\"\r\n                                       style=\"color: #89e100\"></i> {{buttonText}}\r\n                                </button>\r\n                            </div>\r\n                        </form>\r\n                        <div class=\"consultation_close-btn\" (click)=\"modalSwitcher()\">&times;</div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/content/shop/one-product/one-product.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/content/shop/one-product/one-product.component.ts ***!
  \*******************************************************************/
/*! exports provided: OneProductComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OneProductComponent", function() { return OneProductComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _model_rest_datasource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../model/rest.datasource */ "./src/app/model/rest.datasource.ts");
/* harmony import */ var _model_send_email_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../model/send-email.service */ "./src/app/model/send-email.service.ts");
/* harmony import */ var _model_cart_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../model/cart.model */ "./src/app/model/cart.model.ts");
/* harmony import */ var _common_services_toCartModal_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../common/services/toCartModal.service */ "./src/app/common/services/toCartModal.service.ts");
/* harmony import */ var _common_services_metrika_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../common/services/metrika.service */ "./src/app/common/services/metrika.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var OneProductComponent = /** @class */ (function () {
    function OneProductComponent(_activeRoute, _restData, _sendService, _router, cart, _modalService, metrikaService) {
        var _this = this;
        this._activeRoute = _activeRoute;
        this._restData = _restData;
        this._sendService = _sendService;
        this._router = _router;
        this.cart = cart;
        this._modalService = _modalService;
        this.metrikaService = metrikaService;
        this.class = false;
        this.popUp = false;
        this.loading = false;
        this.messageSent = false;
        this.buttonText = 'Отправить';
        this.routerEventSub =
            this._router.events.subscribe(function () {
                if (_this.productId != _this._activeRoute.snapshot.params['index']) {
                    _this.productId = _this._activeRoute.snapshot.params['index'];
                    _this.isLoading = true;
                    _this.productSub = _this._restData.getProduct(_this.productId).subscribe(function (postProduct) {
                        if (_this.product != postProduct.product) {
                            _this.product = postProduct.product;
                        }
                        _this.isLoading = false;
                    });
                }
            });
    }
    OneProductComponent.prototype.metrika = function (value) {
        this.metrikaService.metrika(value);
    };
    OneProductComponent.prototype.openModal = function (id) {
        this._modalService.open(id);
    };
    OneProductComponent.prototype.addProductToCart = function (product) {
        var _this = this;
        this.cart.addLine(product);
        this.productLine = this.cart.lines.find(function (line) { return line.product._id == _this.productId; });
        this.openModal(product._id);
    };
    OneProductComponent.prototype.modalSwitcher = function () {
        this.buttonText = 'Отправить';
        this.messageSent = false;
        this.class = !this.class;
    };
    OneProductComponent.prototype.popUpSwitcher = function () {
        this.popUp = !this.popUp;
    };
    OneProductComponent.prototype.sendSMS = function () {
        console.log('sending sms');
        this._restData.sendSMS('в один клик');
    };
    OneProductComponent.prototype.setProductQuantity = function () {
        this.productQuantity = this.cart.productQuantity(this.productId);
    };
    OneProductComponent.prototype.sendEmail = function (form) {
        var _this = this;
        this.loading = true;
        if (form.valid) {
            this.metrika('kupit');
            this.sendSMS();
            this.loading = true;
            this.buttonText = 'Отправка...';
            this._sendService.sendEmail('click', this.username, this.phonenumber, this.productId, this.product.name).subscribe(function (data) {
                var res = data;
                console.log("mail has been sent");
            }, function (err) {
                console.log(err);
                _this.loading = false;
                _this.buttonText = 'Произошла ошибка при отправке, попробуйте позже';
            }, function () {
                _this.loading = false;
                _this.messageSent = true;
                _this.buttonText = 'Отправлено';
                form.reset();
            });
        }
    };
    OneProductComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.setProductQuantity();
        this.productLine = this.cart.lines.find(function (line) { return line.product._id == _this.productId; });
    };
    OneProductComponent.prototype.ngOnDestroy = function () {
        this.productSub.unsubscribe();
        this.routerEventSub.unsubscribe();
    };
    OneProductComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-one-product',
            template: __webpack_require__(/*! ./one-product.component.html */ "./src/app/content/shop/one-product/one-product.component.html"),
            styles: [__webpack_require__(/*! ./one-product.component.css */ "./src/app/content/shop/one-product/one-product.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _model_rest_datasource__WEBPACK_IMPORTED_MODULE_2__["RestDataSource"],
            _model_send_email_service__WEBPACK_IMPORTED_MODULE_3__["SendEmailService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _model_cart_model__WEBPACK_IMPORTED_MODULE_4__["Cart"],
            _common_services_toCartModal_service__WEBPACK_IMPORTED_MODULE_5__["ToCartModalService"],
            _common_services_metrika_service__WEBPACK_IMPORTED_MODULE_6__["MetrikaService"]])
    ], OneProductComponent);
    return OneProductComponent;
}());



/***/ }),

/***/ "./src/app/content/shop/right-cards/matPaginatorIntlRuClass.ts":
/*!*********************************************************************!*\
  !*** ./src/app/content/shop/right-cards/matPaginatorIntlRuClass.ts ***!
  \*********************************************************************/
/*! exports provided: MatPaginatorIntlRu */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatPaginatorIntlRu", function() { return MatPaginatorIntlRu; });
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var MatPaginatorIntlRu = /** @class */ (function (_super) {
    __extends(MatPaginatorIntlRu, _super);
    function MatPaginatorIntlRu() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.itemsPerPageLabel = 'Ед. товара на странице';
        _this.nextPageLabel = 'След. товары';
        _this.previousPageLabel = 'Пред. товары';
        _this.getRangeLabel = function (page, pageSize, length) {
            if (length == 0 || pageSize == 0) {
                return "0 of " + length;
            }
            length = Math.max(length, 0);
            var startIndex = page * pageSize;
            var endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
            return startIndex + 1 + " \u2013 " + endIndex + " \u0438\u0437 " + length;
        };
        return _this;
    }
    return MatPaginatorIntlRu;
}(_angular_material__WEBPACK_IMPORTED_MODULE_0__["MatPaginatorIntl"]));



/***/ }),

/***/ "./src/app/content/shop/right-cards/right-cards.component.css":
/*!********************************************************************!*\
  !*** ./src/app/content/shop/right-cards/right-cards.component.css ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".mat-paginator-container {\r\n    position: absolute;\r\n    right: 0;\r\n    bottom: 85px;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: flex-end;\r\n    min-height: 80px;\r\n    padding: 0 8px;\r\n    flex-wrap: wrap-reverse;\r\n    width: 100%;\r\n}\r\n\r\n::ng-deep .mat-select-value {\r\n    border-bottom: none !important;\r\n}\r\n\r\n::ng-deep .mat-paginator-page-size-select {\r\n    min-width: 4vw !important;\r\n}\r\n\r\n::ng-deep mat-form-field {\r\n    padding: 3px 6px;\r\n    text-decoration: none;\r\n}\r\n\r\n::ng-deep .mat-form-field-appearance-legacy .mat-form-field-wrapper {\r\n    padding-bottom: 10px;\r\n}\r\n\r\n::ng-deep mat-form-field {\r\n    padding: 3px 6px;\r\n    margin: 16px 0;\r\n    color: #4d4d4d;\r\n    box-shadow: none;\r\n    background-color: #ffffff;\r\n}\r\n\r\n@media only screen and (max-device-width: 445px) {\r\n    ::ng-deep .mat-paginator-range-actions {\r\n        min-height: unset !important;\r\n        max-height: 20px !important;\r\n    }\r\n\r\n    ::ng-deep .mat-paginator-range-label {\r\n        margin: 0 !important;\r\n    }\r\n\r\n    ::ng-deep .mat-paginator-page-size-select {\r\n        margin: 0 !important;\r\n    }\r\n\r\n    ::ng-deep .mat-form-field-appearance-legacy .mat-form-field-infix {\r\n        padding: 6px 0 !important;\r\n        border-top: 1px solid transparent !important;\r\n    }\r\n    .mat-paginator-container {\r\n        min-height: 50px;\r\n    }\r\n}\r\n\r\n"

/***/ }),

/***/ "./src/app/content/shop/right-cards/right-cards.component.html":
/*!*********************************************************************!*\
  !*** ./src/app/content/shop/right-cards/right-cards.component.html ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"filter-catalog\">\r\n    <div class=\"navLink\" [class.active-link]=\"orderSelector === 'expensive'\"\r\n         (click)=\"orderSelector = 'expensive'\">сначала дороже\r\n    </div>\r\n    <div class=\"navLink\" [class.active-link]=\"orderSelector === 'cheap'\" (click)=\"orderSelector = 'cheap'\">\r\n        сначала дешевле\r\n    </div>\r\n    <div class=\"navLink\" [class.active-link]=\"orderSelector === 'novelty'\"\r\n         (click)=\"orderSelector = 'novelty'\">сначала новинки\r\n    </div>\r\n</div>\r\n<div class=\"catalog-wrapper\"\r\n     infiniteScroll\r\n     [infiniteScrollDistance]=\"2\"\r\n     [infiniteScrollThrottle]=\"300\"\r\n     (scrolled)=\"onScroll()\"\r\n     >\r\n\r\n    <div class=\"catalog-item\"\r\n         *ngFor=\" let product of products; let i = index\"\r\n    >\r\n        <app-cart-modal id=\"{{product._id}}\">\r\n            <span>{{product.name}}</span>\r\n        </app-cart-modal>\r\n        <a class=\"catalog-item__img\"\r\n           [routerLink]=\"['/category', parentCategory, 'id',  product._id]\"\r\n        >\r\n            <img [src]=\"product.img\" [alt]=\"product.name\">\r\n        </a>\r\n        <span *ngIf=\"!!product.newProd\" class=\"newProd\"> Новинка </span>\r\n        <div class=\"catalog-item__name\">{{product.name}}</div>\r\n        <div class=\"catalog-item__wrapper-price\">\r\n            <div class=\"catalog-item__prices\">{{product.price}} грн\r\n            </div>\r\n            <div class=\"catalog-item__btn\">\r\n                <a class=\"toCardBtn\"\r\n                ><span class=\"toCart\" (click)=\"addProductToCart(product)\"\r\n                       [class.hidden]=\"cart.productQuantity(product._id)\">\r\n               в корзину\r\n            </span>\r\n                    <p class=\"toCartHidden\" (click)=\"cart.decrementQuantity(product)\"\r\n                       *ngIf=\"cart.productQuantity(product._id)\">\r\n                        убрать из корзины\r\n                    </p>\r\n                </a>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n"

/***/ }),

/***/ "./src/app/content/shop/right-cards/right-cards.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/content/shop/right-cards/right-cards.component.ts ***!
  \*******************************************************************/
/*! exports provided: RightCardsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RightCardsComponent", function() { return RightCardsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _model_product_repository__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../model/product.repository */ "./src/app/model/product.repository.ts");
/* harmony import */ var _model_cart_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../model/cart.model */ "./src/app/model/cart.model.ts");
/* harmony import */ var _common_services_toCartModal_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../common/services/toCartModal.service */ "./src/app/common/services/toCartModal.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var RightCardsComponent = /** @class */ (function () {
    function RightCardsComponent(_repository, _activeRoute, cart, _modalService) {
        var _this = this;
        this._repository = _repository;
        this._activeRoute = _activeRoute;
        this.cart = cart;
        this._modalService = _modalService;
        this.parentCategory = undefined;
        this.pageSize = 12;
        if (window.innerHeight > 1500) {
            this.pageSize = 24;
        }
        if (window.innerHeight > 2880) {
            this.pageSize = 60;
        }
        _activeRoute.pathFromRoot.forEach(function (route) { return route.params.subscribe(function (params) {
            if (params['parentcategory']) {
                _this.parentCategory = params['parentcategory'];
            }
            _this.selectedCategory = params['subcategory'] || params['category'] || undefined;
            _this.orderSelector = '';
        }); });
    }
    RightCardsComponent.prototype.ngOnInit = function () {
        if (window.matchMedia('(max-width: 768px)').matches) {
            var filterList = document.querySelectorAll('.filter-catalog .navLink');
            if (filterList) {
                for (var i = 0; i < filterList.length; i++) {
                    filterList[i].innerHTML = filterList[i].innerHTML.slice(8);
                }
            }
        }
    };
    RightCardsComponent.prototype.openModal = function (id) {
        this._modalService.open(id);
    };
    RightCardsComponent.prototype.onScroll = function () {
        if (this.pageSize < this.length) {
            this.pageSize += 12;
        }
    };
    RightCardsComponent.prototype.addProductToCart = function (product) {
        this.cart.addLine(product);
        this.openModal(product._id);
    };
    Object.defineProperty(RightCardsComponent.prototype, "products", {
        // get products(): Product[] {
        //     this.length = this.getAllproducts().length;
        //     const pageIndex = this.pageSelected * this.pageSize;
        //     return  this.getAllproducts().slice(pageIndex, pageIndex + this.pageSize);
        // }
        get: function () {
            this.length = this.getAllproducts().length;
            return this.getAllproducts().slice(0, this.pageSize);
        },
        enumerable: true,
        configurable: true
    });
    RightCardsComponent.prototype.getAllproducts = function () {
        var _this = this;
        var products;
        if (this.selectedCategory === undefined) {
            products = this._repository.getProducts(this.parentCategory);
        }
        else {
            products = this._repository.getProducts(this.parentCategory)
                .filter(function (p) { return p.subcategory === _this.selectedCategory || p.category === _this.selectedCategory; });
        }
        var num = 1;
        for (var i = 0; i < 5; i++) {
            if (products[i]) {
                products[i].newProd = ++num;
            }
            else {
                break;
            }
        }
        return this.filterProducts(products);
    };
    RightCardsComponent.prototype.filterProducts = function (products) {
        var sortedProducts = [];
        switch (this.orderSelector) {
            case 'expensive':
                sortedProducts = products.sort(function (a, b) {
                    return +b.price - +a.price;
                });
                break;
            case 'cheap':
                sortedProducts = products.sort(function (a, b) {
                    return +a.price - +b.price;
                });
                break;
            case 'novelty':
                sortedProducts = products.sort(function (a, b) {
                    return new Date(b.create_ts) - new Date(a.create_ts);
                });
                break;
            default:
                return products;
        }
        if (sortedProducts.length > 0) {
            return sortedProducts;
        }
    };
    RightCardsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-right-cards',
            template: __webpack_require__(/*! ./right-cards.component.html */ "./src/app/content/shop/right-cards/right-cards.component.html"),
            styles: [__webpack_require__(/*! ./right-cards.component.css */ "./src/app/content/shop/right-cards/right-cards.component.css")]
        }),
        __metadata("design:paramtypes", [_model_product_repository__WEBPACK_IMPORTED_MODULE_2__["ProductRepository"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _model_cart_model__WEBPACK_IMPORTED_MODULE_3__["Cart"],
            _common_services_toCartModal_service__WEBPACK_IMPORTED_MODULE_4__["ToCartModalService"]])
    ], RightCardsComponent);
    return RightCardsComponent;
}());



/***/ }),

/***/ "./src/app/content/shop/shop.component.css":
/*!*************************************************!*\
  !*** ./src/app/content/shop/shop.component.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/*.subMenu_elem {*/\r\n/*    height: 0;*/\r\n/*    opacity: 0;*/\r\n/*    transition: height 1s, opacity 1s;*/\r\n/*}*/\r\n/*.navLink .active-link, .subMenu_elem{*/\r\n/*    height: inherit;*/\r\n/*    opacity: 1;*/\r\n/*}*/"

/***/ }),

/***/ "./src/app/content/shop/shop.component.html":
/*!**************************************************!*\
  !*** ./src/app/content/shop/shop.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<section>\r\n    <div class=\"sidebars_wrapper\">\r\n        <div class=\"sidebar-left\">\r\n            <div class=\"sidebar-left-wrapper\">\r\n                <a>\r\n                    <h2 [routerLink]=\"['/category', parentCategory]\" class=\"shop_title navLink\">{{title}}</h2>\r\n                </a>\r\n                <div *ngIf=\"categories as categoryArr\" class=\"sidebar-left_list\">\r\n                    <ul>\r\n                        <li class=\"mainMenu_elem\" *ngFor=\" let category of categoryArr\">\r\n                            <a class=\"navLink\"\r\n                               routerLinkActive=\"active-link\"\r\n                               [routerLink]=\"['/category', parentCategory, category]\"\r\n                               (click)=\"rotateSwitcher(category);\"\r\n                            >\r\n                                {{category}}\r\n                            </a>\r\n                            <i *ngIf=\"getSubcategories(category)\"\r\n\r\n                               [class.down]=\"category === rightMenuCategoryCheck\"\r\n                               class=\"fa fa-chevron-right nav_menu_left_butt_toggle fa-2x\"\r\n                               style=\"font-size: 0.7em\" (click)=\"rotateSwitcher(category)\"\r\n                            >\r\n                            </i>\r\n                            <ul [@openClose]=\"category === rightMenuCategoryCheck ? 'open' : 'closed'\">\r\n                                <li class=\"subMenu_elem\"\r\n                                >\r\n                                    <a class=\"navLink\"\r\n                                       *ngFor=\"let subc of getSubcategories(category)\"\r\n                                       routerLinkActive=\"active-link\"\r\n                                       [routerLink]=\"['/category', parentCategory, category, subc]\"\r\n                                    >{{subc}}</a>\r\n                                </li>\r\n                            </ul>\r\n                        </li>\r\n                    </ul>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"sidebar-right\">\r\n            <router-outlet></router-outlet>\r\n        </div>\r\n    </div>\r\n</section>\r\n"

/***/ }),

/***/ "./src/app/content/shop/shop.component.ts":
/*!************************************************!*\
  !*** ./src/app/content/shop/shop.component.ts ***!
  \************************************************/
/*! exports provided: ShopComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShopComponent", function() { return ShopComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _model_product_repository__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../model/product.repository */ "./src/app/model/product.repository.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/animations */ "./node_modules/@angular/animations/fesm5/animations.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ShopComponent = /** @class */ (function () {
    function ShopComponent(_repository, _activeRoute, _router) {
        var _this = this;
        this._repository = _repository;
        this._activeRoute = _activeRoute;
        this._router = _router;
        _router.events
            .subscribe(function (e) {
            if (_this._activeRoute.snapshot.url[1].path == 'oformlenie') {
                _this.parentCategory = 'oformlenie';
            }
            else if (_this._activeRoute.snapshot.url[1].path == 'contact') {
                _this.parentCategory = 'contact';
            }
            else if (_this._activeRoute.snapshot.url[1].path == 'cart') {
                _this.parentCategory = 'cart';
            }
            else {
                _this.parentCategory = _this._activeRoute.snapshot.params['parentcategory'] || undefined;
            }
            switch (_this.parentCategory) {
                case 'wedding':
                    _this.title = 'СВАДЕБНАЯ ФЛОРИСТИКА';
                    break;
                case 'shop':
                    _this.title = 'МАГАЗИН';
                    break;
                case 'oformlenie':
                    _this.title = 'ОФОРМЛЕНИЕ';
                    break;
                case 'contact':
                    _this.title = 'КОНТАКТЫ';
                    break;
                case 'cart':
                    _this.title = 'КОРЗИНА';
                    break;
                default:
                    _this.title = 'НЕТ СОВПАДЕНИЙ';
            }
        });
    }
    ShopComponent.prototype.rotateSwitcher = function (category) {
        if (this.rightMenuCategoryCheck == category) {
            this.rightMenuCategoryCheck = null;
        }
        else {
            this.rightMenuCategoryCheck = category;
        }
    };
    Object.defineProperty(ShopComponent.prototype, "categories", {
        get: function () {
            if (!this.parentCategory) {
                return;
            }
            if (this.parentCategory == 'oformlenie') {
                return this._repository.getCategoriesOfVisuals();
            }
            return this._repository.getCategories(this.parentCategory);
        },
        enumerable: true,
        configurable: true
    });
    ShopComponent.prototype.getSubcategories = function (category) {
        if (!category) {
            return;
        }
        if (this._repository.getSubCategories(category).length !== 0) {
            return this._repository.getSubCategories(category);
        }
        else {
            return;
        }
    };
    ShopComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._router.events.subscribe(function (evt) {
            if (evt instanceof _angular_router__WEBPACK_IMPORTED_MODULE_2__["NavigationEnd"]) {
                var url = _this._router.url;
                var regexp = /\/[a-zа-я0-9]*\/(shop|wedding)\/(?!id)[a-zа-я0-9\/]*/gi;
                var scrollAdd = regexp.test(url);
                if (!scrollAdd) {
                    window.scroll({
                        top: 0,
                        left: 0,
                    });
                }
            }
        });
    };
    ShopComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-shop',
            template: __webpack_require__(/*! ./shop.component.html */ "./src/app/content/shop/shop.component.html"),
            styles: [__webpack_require__(/*! ./shop.component.css */ "./src/app/content/shop/shop.component.css")],
            animations: [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["trigger"])('openClose', [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["state"])('open', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["style"])({
                        height: '*',
                        opacity: 1,
                        left: '*',
                        display: 'block'
                    })),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["state"])('closed', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["style"])({
                        height: '0px',
                        minHeight: '0',
                        opacity: 0,
                        display: 'none'
                    })),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["transition"])('open => closed', [
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["animate"])('0.2s')
                    ]),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["transition"])('closed => open', [
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["animate"])('0.2s')
                    ]),
                ]),
            ],
        }),
        __metadata("design:paramtypes", [_model_product_repository__WEBPACK_IMPORTED_MODULE_1__["ProductRepository"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], ShopComponent);
    return ShopComponent;
}());



/***/ }),

/***/ "./src/app/content/shop/shop.module.ts":
/*!*********************************************!*\
  !*** ./src/app/content/shop/shop.module.ts ***!
  \*********************************************/
/*! exports provided: options, ShopModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "options", function() { return options; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShopModule", function() { return ShopModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _model_model_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../model/model.module */ "./src/app/model/model.module.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _shop_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./shop.component */ "./src/app/content/shop/shop.component.ts");
/* harmony import */ var _one_product_one_product_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./one-product/one-product.component */ "./src/app/content/shop/one-product/one-product.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _common_pipes_order_by_pipe__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../common/pipes/order-by.pipe */ "./src/app/common/pipes/order-by.pipe.ts");
/* harmony import */ var _right_cards_right_cards_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./right-cards/right-cards.component */ "./src/app/content/shop/right-cards/right-cards.component.ts");
/* harmony import */ var _common_common_app_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../common/common-app.module */ "./src/app/common/common-app.module.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_mask__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ngx-mask */ "./node_modules/ngx-mask/fesm5/ngx-mask.js");
/* harmony import */ var _checkout_checkout_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./checkout/checkout.component */ "./src/app/content/shop/checkout/checkout.component.ts");
/* harmony import */ var _cart_cart_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./cart/cart.component */ "./src/app/content/shop/cart/cart.component.ts");
/* harmony import */ var _header_cart_summary_cart_summary_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../header/cart-summary/cart-summary.component */ "./src/app/header/cart-summary/cart-summary.component.ts");
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/datepicker */ "./node_modules/@angular/material/esm5/datepicker.es5.js");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/form-field */ "./node_modules/@angular/material/esm5/form-field.es5.js");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/core */ "./node_modules/@angular/material/esm5/core.es5.js");
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/paginator */ "./node_modules/@angular/material/esm5/paginator.es5.js");
/* harmony import */ var _right_cards_matPaginatorIntlRuClass__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./right-cards/matPaginatorIntlRuClass */ "./src/app/content/shop/right-cards/matPaginatorIntlRuClass.ts");
/* harmony import */ var ngx_infinite_scroll__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ngx-infinite-scroll */ "./node_modules/ngx-infinite-scroll/modules/ngx-infinite-scroll.es5.js");
/* harmony import */ var _common_services_toCartModal_service__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../common/services/toCartModal.service */ "./src/app/common/services/toCartModal.service.ts");
/* harmony import */ var _common_services_metrika_service__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../../common/services/metrika.service */ "./src/app/common/services/metrika.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
























var options = {};
var ShopModule = /** @class */ (function () {
    function ShopModule() {
    }
    ShopModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _model_model_module__WEBPACK_IMPORTED_MODULE_2__["ModelModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_6__["RouterModule"],
                _common_common_app_module__WEBPACK_IMPORTED_MODULE_9__["CommonAppModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_10__["MatProgressSpinnerModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormsModule"],
                _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_16__["MatDatepickerModule"],
                _angular_material_form_field__WEBPACK_IMPORTED_MODULE_17__["MatFormFieldModule"],
                _angular_material_core__WEBPACK_IMPORTED_MODULE_18__["MatNativeDateModule"],
                _angular_material_paginator__WEBPACK_IMPORTED_MODULE_19__["MatPaginatorModule"],
                ngx_infinite_scroll__WEBPACK_IMPORTED_MODULE_21__["InfiniteScrollModule"],
                ngx_mask__WEBPACK_IMPORTED_MODULE_12__["NgxMaskModule"].forRoot(options)
            ],
            declarations: [
                _shop_component__WEBPACK_IMPORTED_MODULE_4__["ShopComponent"], _one_product_one_product_component__WEBPACK_IMPORTED_MODULE_5__["OneProductComponent"], _common_pipes_order_by_pipe__WEBPACK_IMPORTED_MODULE_7__["OrderByPipe"], _right_cards_right_cards_component__WEBPACK_IMPORTED_MODULE_8__["RightCardsComponent"], _checkout_checkout_component__WEBPACK_IMPORTED_MODULE_13__["CheckoutComponent"], _cart_cart_component__WEBPACK_IMPORTED_MODULE_14__["CartComponent"],
                _header_cart_summary_cart_summary_component__WEBPACK_IMPORTED_MODULE_15__["CartSummaryComponent"]
            ],
            providers: [{ provide: _angular_material_paginator__WEBPACK_IMPORTED_MODULE_19__["MatPaginatorIntl"], useClass: _right_cards_matPaginatorIntlRuClass__WEBPACK_IMPORTED_MODULE_20__["MatPaginatorIntlRu"] }, _common_services_toCartModal_service__WEBPACK_IMPORTED_MODULE_22__["ToCartModalService"], _common_services_metrika_service__WEBPACK_IMPORTED_MODULE_23__["MetrikaService"]],
            exports: [ngx_mask__WEBPACK_IMPORTED_MODULE_12__["NgxMaskModule"], _cart_cart_component__WEBPACK_IMPORTED_MODULE_14__["CartComponent"], _header_cart_summary_cart_summary_component__WEBPACK_IMPORTED_MODULE_15__["CartSummaryComponent"]]
        })
    ], ShopModule);
    return ShopModule;
}());



/***/ }),

/***/ "./src/app/content/visual/visual.component.css":
/*!*****************************************************!*\
  !*** ./src/app/content/visual/visual.component.css ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\ngallery{\r\n    background-color: #ffff;\r\n}\r\n.visual__wrapper {\r\n    min-height: 75vh;\r\n}\r\n.g-nav-prev {\r\n    left: 3em!important;\r\n}\r\n.g-nav-next {\r\n    right: 3em!important;\r\n}\r\n"

/***/ }),

/***/ "./src/app/content/visual/visual.component.html":
/*!******************************************************!*\
  !*** ./src/app/content/visual/visual.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "    <div class=\"back-link_wrapper\">\r\n        <i class=\"fa fa-chevron-circle-left fa-3x back-link_fa\" onclick=\"history.back(); return false;\"></i>\r\n        <a class=\"back-link\" onclick=\"history.back(); return false;\">\r\n            назад\r\n        </a>\r\n        <svg class=\"arrow-svg\" width=\"60\" height=\"8\" viewBox=\"0 0 60 8\" fill=\"black\"\r\n             xmlns=\"http://www.w3.org/2000/svg\">\r\n            <path opacity=\"0.75\"\r\n                  d=\"M0.646446 3.64644C0.451183 3.8417 0.451183 4.15829 0.646446 4.35355L3.82843 7.53553C4.02369 7.73079 4.34027 7.73079 4.53553 7.53553C4.7308 7.34027 4.7308 7.02368 4.53553 6.82842L1.70711 3.99999L4.53553 1.17157C4.7308 0.976306 4.7308 0.659723 4.53553 0.464461C4.34027 0.269199 4.02369 0.269199 3.82843 0.464461L0.646446 3.64644ZM60 3.5L1 3.49999L1 4.49999L60 4.5L60 3.5Z\"\r\n                  fill=\"white\"/>\r\n        </svg>\r\n    </div>\r\n    <div class=\"visual__wrapper\" *ngIf=\"visual\">\r\n        <div class=\"visual__left\">\r\n            <gallery [items]=\"images$ | async\"></gallery>\r\n        </div>\r\n        <div class=\"visual__right\">\r\n            <div class=\"product-card__name \" id=\"productName\">{{visual.name}}</div>\r\n            <div class=\"product-card__description\">\r\n                <span class=\"product-card__small-text\">Описание:\r\n&nbsp;</span>\r\n                <span id=\"productDesc\">{{visual.description}}</span>\r\n            </div>\r\n            <div class=\"product-card__prices\">\r\n                <span class=\"product-card__small-text\">Цена:\r\n&nbsp;</span>\r\n                <span id=\"productPrice\">{{visual.price}}\r\n                    &nbsp;грн</span>\r\n            </div>\r\n            <div class=\"orderText\">\r\n                <span>Для заказа услуги свяжитесь с нами по одному из указанных телефонов или же воспользуйтесь</span>\r\n                <a class=\"navLink callbackForm\" id=\"consultationPopup\"\r\n                   href=\"javascript:void(0);\"><span (click)=\"modalSwitcher()\"> формой обратной связи</span>\r\n                </a>\r\n                <div class=\"consultation consultation-wrapper\">\r\n                    <div class=\"consultation_popup-overlay\" (click)=\"modalSwitcher()\" [class.modal_open]=\"class\"></div>\r\n                    <div class=\"consultation_popWindow consultation_subscribe_window\" [class.modal_open]=\"class\">\r\n                        <p class=\"consultation_subcsribe-text\">Форма обратной связи</p>\r\n                        <form novalidate #form=\"ngForm\" (ngSubmit)=\"sendEmail(form)\" class=\"consultation_subscribe-form\">\r\n                            <div>\r\n                                <input type=\"text\"\r\n                                       id=\"name-contact\"\r\n                                       placeholder=\"Имя\"\r\n                                       name=\"username\"\r\n                                       [(ngModel)]=\"username\"\r\n                                       #name=\"ngModel\"\r\n                                       required>\r\n                              <span class=\"star_req_form\"> *</span>\r\n                                <ul class=\"form_error_message\" *ngIf=\"name.touched && name.invalid || loading && name.invalid\">\r\n                                    <li *ngIf=\"name.errors.required\">\r\n                                        Введите имя\r\n                                    </li>\r\n                                </ul>\r\n                            </div>\r\n                            <div>\r\n                                <input [(ngModel)]=\"phonenumber\"\r\n                                       #phone=\"ngModel\"\r\n                                       type='tel'\r\n                                       prefix=\"+38\"\r\n                                       mask=\"(000) 000 00 00\"\r\n                                       [showMaskTyped]=\"true\"\r\n                                       id=\"tel-contact\"\r\n                                       name=\"tel\"\r\n                                       required\r\n                                       minlength=\"10\"\r\n                                >\r\n                                <span class=\"star_req_form\"> *</span>\r\n                                <ul class=\"form_error_message\" *ngIf=\"phone.touched && phone.invalid || loading && phone.invalid\">\r\n                                    <li *ngIf=\"phone.errors.required || phone.errors.minlength\">\r\n                                        Укажите телефон\r\n                                    </li>\r\n                                </ul>\r\n                            </div>\r\n                            <div class=\"consultation_aligncenter\">\r\n                                <button [disabled]=\"form.invalid && loading\"\r\n                                        type=\"submit\"\r\n                                        class=\"consultation_btn orange_btn\">\r\n                                    <i *ngIf=\"messageSent\" class=\"fa fa-check\" aria-hidden=\"true\" style=\"color: #89e100\"></i> {{buttonText}}\r\n                                </button>\r\n                            </div>\r\n                        </form>\r\n                        <div class=\"consultation_close-btn\" (click)=\"modalSwitcher()\">&times;</div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n"

/***/ }),

/***/ "./src/app/content/visual/visual.component.ts":
/*!****************************************************!*\
  !*** ./src/app/content/visual/visual.component.ts ***!
  \****************************************************/
/*! exports provided: VisualComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VisualComponent", function() { return VisualComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _model_product_repository__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../model/product.repository */ "./src/app/model/product.repository.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ngx_gallery_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngx-gallery/core */ "./node_modules/@ngx-gallery/core/fesm5/ngx-gallery-core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _model_send_email_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../model/send-email.service */ "./src/app/model/send-email.service.ts");
/* harmony import */ var _model_rest_datasource__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../model/rest.datasource */ "./src/app/model/rest.datasource.ts");
/* harmony import */ var _common_services_metrika_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../common/services/metrika.service */ "./src/app/common/services/metrika.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var VisualComponent = /** @class */ (function () {
    function VisualComponent(_sendService, _repository, _activeRoute, _restData, metrikaService) {
        var _this = this;
        this._sendService = _sendService;
        this._repository = _repository;
        this._activeRoute = _activeRoute;
        this._restData = _restData;
        this.metrikaService = metrikaService;
        this.messageSent = false;
        this.class = false;
        this.loading = false;
        this.buttonText = 'Отправить';
        _activeRoute.pathFromRoot.forEach(function (route) { return route.params.subscribe(function (params) {
            if (params['category']) {
                _this.selectedCategory = params['category'];
            }
            _this.getVisual();
            if (_this.visual) {
                _this.images$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["of"])((_this.visual.img).map(function (res) { return new _ngx_gallery_core__WEBPACK_IMPORTED_MODULE_3__["ImageItem"]({
                    src: res,
                    thumb: res
                }); }));
            }
        }); });
    }
    VisualComponent.prototype.sendSms = function () {
        this._restData.sendSMS('на консультацию');
    };
    VisualComponent.prototype.metrika = function (value) {
        this.metrikaService.metrika(value);
    };
    VisualComponent.prototype.sendEmail = function (form) {
        var _this = this;
        this.loading = true;
        if (form.valid) {
            this.metrika('konsult');
            this.sendSms();
            this.loading = true;
            this.buttonText = 'Отправка...';
            this._sendService.sendEmail('visual', this.username, this.phonenumber, this.visual._id, this.visual.name).subscribe(function (data) {
                var res = data;
                console.log("mail has been sent");
            }, function (err) {
                console.log(err);
                _this.loading = false;
                _this.buttonText = 'Произошла ошибка при отправке, попробуйте позже';
            }, function () {
                _this.loading = false;
                _this.buttonText = 'Отправлено';
                _this.messageSent = true;
                form.reset();
            });
        }
    };
    VisualComponent.prototype.modalSwitcher = function () {
        this.buttonText = 'Отправить';
        this.messageSent = false;
        this.class = !this.class;
    };
    VisualComponent.prototype.getVisual = function () {
        this.visual = this._repository.getVisualByCat(this.selectedCategory);
    };
    VisualComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-view',
            template: __webpack_require__(/*! ./visual.component.html */ "./src/app/content/visual/visual.component.html"),
            styles: [__webpack_require__(/*! ./visual.component.css */ "./src/app/content/visual/visual.component.css")]
        }),
        __metadata("design:paramtypes", [_model_send_email_service__WEBPACK_IMPORTED_MODULE_5__["SendEmailService"],
            _model_product_repository__WEBPACK_IMPORTED_MODULE_1__["ProductRepository"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _model_rest_datasource__WEBPACK_IMPORTED_MODULE_6__["RestDataSource"],
            _common_services_metrika_service__WEBPACK_IMPORTED_MODULE_7__["MetrikaService"]])
    ], VisualComponent);
    return VisualComponent;
}());



/***/ }),

/***/ "./src/app/footer/footer.component.css":
/*!*********************************************!*\
  !*** ./src/app/footer/footer.component.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/footer/footer.component.html":
/*!**********************************************!*\
  !*** ./src/app/footer/footer.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<footer id=\"footer\">\r\n    <div class=\"footer\">\r\n        <div class=\"footer_elem footer_social\">\r\n            <a class=\"navLink\"  href=\"https://www.instagram.com/_cvetochniy/\" target=\"_blank\">Instagram</a>\r\n<!--            <a class=\"navLink\" href=\"https://www.instagram.com/_cvetochniy/\" target=\"_blank\">Linkedin</a>-->\r\n<!--            <a class=\"navLink\" href=\"https://www.instagram.com/_cvetochniy/\" target=\"_blank\">Facebook</a>-->\r\n        </div>\r\n        <div class=\"footer_elem footer_adress\">\r\n            <a class=\"navbar-phone\" href=\"tel:+380956979520\" (click)=\"metrika('nomer')\">095&#8209;697&#8209;95&#8209;20</a>\r\n            <span class=\"footer-address-fullsize\"><a [routerLink]=\"['category', 'contact']\">Сумская 77/79 (напротив ЛетоПарка)&nbsp;</a></span>\r\n            <span class=\"footer-address-mobile\"><a [routerLink]=\"['category', 'contact']\">Сумская 77/79</a></span>\r\n        </div>\r\n        <div class=\"footer_elem footer_consultation \">\r\n            <a class=\"navLink\" id=\"consultationPopup\"\r\n               (click)=\"modalSwitcher()\"><span>Бесплатная консультация</span>\r\n                <svg width=\"60\" height=\"8\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\r\n                    <path d=\"M59.354 4.354a.5.5 0 0 0 0-.708L56.172.464a.5.5 0 1 0-.707.708L58.293 4l-2.828 2.828a.5.5 0 1 0 .707.708l3.182-3.182zM0 4.5h59v-1H0v1z\"\r\n                          fill=\"#4D4D4D\"/>\r\n                </svg>\r\n            </a>\r\n            <div class=\"consultation consultation-wrapper\">\r\n                <div class=\"consultation_popup-overlay\" (click)=\"modalSwitcher()\" [class.modal_open]=\"class\"></div>\r\n                <div class=\"consultation_popWindow consultation_subscribe_window\" [class.modal_open]=\"class\">\r\n                    <p class=\"consultation_subcsribe-text\">Форма обратной связи</p>\r\n<!--ng-submit=\"gtag('event', 'sendemail', { 'event_category': 'konsult', 'event_action': 'send', });return true;\"-->\r\n                    <form #form=\"ngForm\"\r\n                          (ngSubmit)=\"sendEmail(form)\" class=\"consultation_subscribe-form\"\r\n                          autocomplete=\"off\">\r\n                        <div>\r\n                            <input type=\"text\"\r\n                                   id=\"name-subs\"\r\n                                   placeholder=\"Имя\"\r\n                                   name=\"username\"\r\n                                   [(ngModel)]=\"username\"\r\n                                   #name=\"ngModel\"\r\n                                   required>\r\n                            <span class=\"star_req_form\"> *</span>\r\n                            <ul class=\"form_error_message\"\r\n                                *ngIf=\"name.touched && name.invalid || loading && name.invalid\">\r\n                                <li *ngIf=\"name.errors.required\">\r\n                                    Введите имя\r\n                                </li>\r\n                            </ul>\r\n                        </div>\r\n                        <div>\r\n                            <input [(ngModel)]=\"phonenumber\"\r\n                                   #phone=\"ngModel\"\r\n                                   type='tel'\r\n                                   prefix=\"+38\"\r\n                                   mask=\"(000) 000 00 00\"\r\n                                   [showMaskTyped]=\"true\"\r\n                                   id=\"tel-subs\"\r\n                                   name=\"tel\"\r\n                                   required\r\n                                   minlength=\"10\"\r\n                            >\r\n\r\n                            <span class=\"star_req_form\"> *</span>\r\n                            <ul class=\"form_error_message\"\r\n                                *ngIf=\"phone.touched && phone.invalid || loading && phone.invalid\">\r\n                                <li *ngIf=\"phone.errors.required || phone.errors.minlength\">\r\n                                    Укажите телефон\r\n                                </li>\r\n                            </ul>\r\n                        </div>\r\n                        <div>\r\n                            <input\r\n                                    [(ngModel)]=\"email\"\r\n                                    #mail=\"ngModel\"\r\n                                    type=\"email\"\r\n                                    id=\"email-subscribe\"\r\n                                    name=\"E-mail\"\r\n                                    placeholder=\"Почта\"\r\n                                    email>\r\n                        </div>\r\n                        <div class=\"message-block\">\r\n              <textarea\r\n                      [(ngModel)]=\"message\"\r\n                      #textform=\"ngModel\"\r\n                      id=\"message\"\r\n                      class=\"field\"\r\n                      name=\"message\"\r\n                      rows=\"4\"\r\n                      maxlength=\"200\"\r\n                      placeholder=\"Текст сообщения\"\r\n              ></textarea>\r\n                        </div>\r\n                        <div class=\"consultation_aligncenter\">\r\n                            <button [disabled]=\"form.invalid && loading\"\r\n                                    type=\"submit\"\r\n                                    class=\"consultation_btn orange_btn\">\r\n                                <i *ngIf=\"messageSent\" class=\"fa fa-check\" aria-hidden=\"true\" style=\"color: #89e100\"></i> {{buttonText}}\r\n                            </button>\r\n                        </div>\r\n                        <div class=\"consultation_req-fields\"><sup>*</sup> обязательные поля</div>\r\n                    </form>\r\n                    <div class=\"consultation_close-btn\" (click)=\"modalSwitcher()\">&times;</div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</footer>\r\n"

/***/ }),

/***/ "./src/app/footer/footer.component.ts":
/*!********************************************!*\
  !*** ./src/app/footer/footer.component.ts ***!
  \********************************************/
/*! exports provided: FooterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FooterComponent", function() { return FooterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _model_send_email_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../model/send-email.service */ "./src/app/model/send-email.service.ts");
/* harmony import */ var _model_rest_datasource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../model/rest.datasource */ "./src/app/model/rest.datasource.ts");
/* harmony import */ var _common_services_metrika_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/services/metrika.service */ "./src/app/common/services/metrika.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var FooterComponent = /** @class */ (function () {
    function FooterComponent(_sendService, _restData, metrikaService) {
        this._sendService = _sendService;
        this._restData = _restData;
        this.metrikaService = metrikaService;
        this.class = false;
        this.loading = false;
        this.messageSent = false;
        this.buttonText = 'Отправить';
    }
    FooterComponent.prototype.metrika = function (value) {
        this.metrikaService.metrika(value);
    };
    FooterComponent.prototype.modalSwitcher = function () {
        this.buttonText = 'Отправить';
        this.messageSent = false;
        this.class = !this.class;
    };
    FooterComponent.prototype.sendSMS = function () {
        this._restData.sendSMS('на консультацию');
    };
    FooterComponent.prototype.sendEmail = function (form) {
        var _this = this;
        this.sendSMS();
        this.loading = true;
        if (form.valid) {
            this.metrika('konsult');
            this.loading = true;
            this.buttonText = 'Отправка...';
            this._sendService.sendEmail('', this.username, this.phonenumber, null, null, this.email, this.message).subscribe(function (data) {
                var res = data;
                console.log("mail has been sent");
            }, function (err) {
                console.log(err);
                _this.loading = false;
                _this.buttonText = 'Произошла ошибка при отправке, попробуйте позже';
            }, function () {
                _this.loading = false;
                _this.messageSent = true;
                _this.buttonText = 'Отправлено';
                form.reset();
            });
        }
    };
    FooterComponent.prototype.ngOnInit = function () {
    };
    FooterComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-footer',
            template: __webpack_require__(/*! ./footer.component.html */ "./src/app/footer/footer.component.html"),
            styles: [__webpack_require__(/*! ./footer.component.css */ "./src/app/footer/footer.component.css")]
        }),
        __metadata("design:paramtypes", [_model_send_email_service__WEBPACK_IMPORTED_MODULE_1__["SendEmailService"], _model_rest_datasource__WEBPACK_IMPORTED_MODULE_2__["RestDataSource"], _common_services_metrika_service__WEBPACK_IMPORTED_MODULE_3__["MetrikaService"]])
    ], FooterComponent);
    return FooterComponent;
}());



/***/ }),

/***/ "./src/app/header/cart-summary/cart-summary.component.css":
/*!****************************************************************!*\
  !*** ./src/app/header/cart-summary/cart-summary.component.css ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/header/cart-summary/cart-summary.component.html":
/*!*****************************************************************!*\
  !*** ./src/app/header/cart-summary/cart-summary.component.html ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<a [routerLink]='cart.itemCount > 0 ? \"category/cart\" : null'>\r\n    <span *ngIf=\"cart.itemCount > 0\" class=\"cart_currency\">{{cart.itemCount}}</span>\r\n    <i class=\"fas fa-shopping-basket\"></i>\r\n</a>\r\n<ul class=\"submenu_cart\">\r\n    <li class=\"submenu_cart-item\" *ngFor=\"let product of cart.lines\"\r\n        >\r\n        <a (click)=\"cart.decrementQuantity(product.product)\" class=\"delete_cart-item\"></a>\r\n        <div [routerLink]=\"['/category',product.product.parentCategory,'id',product.product._id]\">\r\n            <span class=\"submenu_cart-item_name\">\"{{product.product.name}}\"</span>\r\n            <span>&nbsp;кол.: {{product.quantity}}</span>\r\n            <span>&nbsp;цена за ед.: {{product.product.price}} грн.</span>\r\n        </div>\r\n    </li>\r\n    <li class=\"submenu_cart-item_total\">\r\n        <p>&nbsp;всего товара: <span>{{cart.itemCount}} шт.</span></p>\r\n        <p>&nbsp;на сумму: <span>{{cart.cartPrice}} грн.</span></p>\r\n    </li>\r\n    <li class=\"cart_btn_enter\" *ngIf=\"cart.itemCount > 0\" routerLink=\"category/cart\"><a>перейти в корзину</a></li>\r\n</ul>"

/***/ }),

/***/ "./src/app/header/cart-summary/cart-summary.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/header/cart-summary/cart-summary.component.ts ***!
  \***************************************************************/
/*! exports provided: CartSummaryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CartSummaryComponent", function() { return CartSummaryComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _model_cart_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../model/cart.model */ "./src/app/model/cart.model.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CartSummaryComponent = /** @class */ (function () {
    function CartSummaryComponent(cart) {
        this.cart = cart;
    }
    CartSummaryComponent.prototype.ngOnInit = function () {
    };
    CartSummaryComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-cart-summary',
            template: __webpack_require__(/*! ./cart-summary.component.html */ "./src/app/header/cart-summary/cart-summary.component.html"),
            styles: [__webpack_require__(/*! ./cart-summary.component.css */ "./src/app/header/cart-summary/cart-summary.component.css")]
        }),
        __metadata("design:paramtypes", [_model_cart_model__WEBPACK_IMPORTED_MODULE_1__["Cart"]])
    ], CartSummaryComponent);
    return CartSummaryComponent;
}());



/***/ }),

/***/ "./src/app/header/header.component.css":
/*!*********************************************!*\
  !*** ./src/app/header/header.component.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".submenu_cart li {\r\n    font-size: 15px;\r\n}"

/***/ }),

/***/ "./src/app/header/header.component.html":
/*!**********************************************!*\
  !*** ./src/app/header/header.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<header id=\"header\">\r\n    <div class=\"navbar\">\r\n        <div class=\"navbar_wrapper\">\r\n            <div class=\"navbar_elem navbar_logo\">\r\n                <a id=\"logo\" [routerLink]=\"['']\">цветочный.</a>\r\n            </div>\r\n            <div class=\"navbar_elem navbar_menu\" [class.link_disable]=\"menuStatus\">\r\n                <a class=\"navLink\" [routerLink]=\"['category', 'shop', 'Букеты']\" routerLinkActive=\"active-link\">Магазин</a>\r\n                <a class=\"navLink\" [routerLink]=\"['category', 'wedding', 'Букет невесты']\"  routerLinkActive=\"active-link\">Свадебная\r\n                    флористика</a>\r\n                <a class=\"navLink\" [routerLink]=\"['category', 'oformlenie'] || ['category', 'oformlenie']\"\r\n                   routerLinkActive=\"active-link\">Оформление</a>\r\n                <a class=\"navLink\" [routerLink]=\"['category', 'contact']\" routerLinkActive=\"active-link\">Контакты</a>\r\n            </div>\r\n            <div class=\"navbar_elem navbar_phone\">\r\n                <a class=\"navbar-phone navLink\" href=\"tel:+380956979520\" (click)=\"metrika('nomer')\">095&#8209;697&#8209;95&#8209;20</a>\r\n            </div>\r\n            <div class=\"navbar_elem navbar_cart\" (click)=\"metrika('cart')\">\r\n                <app-cart-summary></app-cart-summary>\r\n            </div>\r\n            <div class=\"header-menu_popup-overlay\" (click)=\"menuToggle()\" [class.modal_open]=\"menuStatus\"></div>\r\n            <div class=\"navbar_elem navbar_button crossMenu\">\r\n                <div id=\"nav-icon1\" (click)=\"menuToggle()\" [class.open]=\"menuStatus\">\r\n                    <span></span>\r\n                    <span></span>\r\n                    <span></span>\r\n                </div>\r\n                <div id=\"nav-menu\" [class.open]=\"menuStatus\">\r\n                    <div class=\"nav_menu_wrap fullDesktop_menu\">\r\n                        <div id=\"navMenuLeft\" class=\"nav_menu_left\">\r\n                            <a class=\"shop\"\r\n                               (click)=\"menuBigScreen('shop')\">магазин\r\n                            </a>\r\n                            <a class=\"about\"\r\n                               (click)=\"menuBigScreen('about-us')\">о нас\r\n                            </a>\r\n                            <a class=\"cooperation\"\r\n                               (click)=\"menuBigScreen('cooperation')\">сотрудничество\r\n                            </a>\r\n                            <a class=\"delivery\"\r\n                               (click)=\"menuBigScreen('delivery')\">доставка и оплата\r\n                            </a>\r\n\r\n                        </div>\r\n                        <div class=\"nav_menu_right\" [ngSwitch]=\"menuCategory\">\r\n                            <div *ngSwitchDefault class=\"menu_right_text open\">\r\n                                <a *ngFor=\"let category of getCategory('shop')\" class=\"navLink\"\r\n                                   [routerLink]=\"['category', 'shop', category]\"\r\n                                   (click)=\"menuToggle()\">{{category}}</a>\r\n                            </div>\r\n                            <div *ngSwitchCase=\"'wedding'\" class=\"menu_right_text open\">\r\n                                <a *ngFor=\"let category of getCategory('wedding')\" class=\"navLink\"\r\n                                   [routerLink]=\"['category', 'wedding', category]\"\r\n                                   (click)=\"menuToggle()\">{{category}}</a>\r\n                            </div>\r\n                            <div *ngSwitchCase=\"'about-us'\" class=\"menu_right_text open\">\r\n                                <h3>Цветочный</h3>\r\n                                <span>Прекрасный магазин в удобном месте. Всегда свежие цветы, оригинальные букеты.</span>\r\n                                <span>Огромный выбор декора, свечей и комнатных растеней.</span>\r\n                            </div>\r\n                            <div *ngSwitchCase=\"'cooperation'\" class=\"menu_right_text open\">\r\n                                <h3>Предложения сотрудничества </h3>\r\n                                <a class=\"cooperation_link\" href=\"tel:+380956979520\" (click)=\"metrika('nomer')\">095-697-95-20</a>\r\n                                <a class=\"cooperation_link\" href=\"mailto:cvetochniykharkiv@gmail.com\">cvetochniykharkiv@gmail.com</a>\r\n                            </div>\r\n                            <div *ngSwitchCase=\"'delivery'\" class=\"menu_right_text open\">\r\n                                <h3>Доставка курьреом</h3>\r\n                                <span>по Харькову от 50 гривен</span>\r\n                                <span>Бесплатная доставка <strong>от 1 500 гривен</strong></span>\r\n<!--                                <p><span style=\"color: #ff4500; padding: 0 \">Бесплатная</span></p>-->\r\n<!--                                <span>доставка курьреом</span>-->\r\n<!--                                <span>во время действия карантина</span>-->\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"nav_menu_wrap mobile_menu\">\r\n                        <div class=\"nav_menu_left\">\r\n                            <a [routerLink]=\"['category', 'shop', 'Букеты']\" class=\"shop\"\r\n                               (click)=\"menuToggle()\">магазин</a>\r\n                            <a [routerLink]=\"['category', 'wedding', 'Букет невесты']\" class=\"weddingLinkMobile\"\r\n                               (click)=\"menuToggle()\">Свадебная флористика\r\n                            </a>\r\n                            <a [routerLink]=\"['category', 'oformlenie', 'Фотозоны'] || ['category', 'oformlenie']\"\r\n                               class=\"visualLinkMobile\"\r\n                               (click)=\"menuToggle()\">оформление\r\n                            </a>\r\n                            <a [routerLink]=\"['about-us']\" class=\"about\"\r\n                               (click)=\"menuToggle()\">о нас\r\n                            </a>\r\n                            <a [routerLink]=\"['cooperation']\" class=\"cooperation\"\r\n                               (click)=\"menuToggle()\">сотрудничество\r\n                            </a>\r\n                            <a [routerLink]=\"['delivery']\" class=\"delivery\"\r\n                               (click)=\"menuToggle()\">доставка и оплата\r\n                            </a>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</header>\r\n"

/***/ }),

/***/ "./src/app/header/header.component.ts":
/*!********************************************!*\
  !*** ./src/app/header/header.component.ts ***!
  \********************************************/
/*! exports provided: HeaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderComponent", function() { return HeaderComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _model_product_repository__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../model/product.repository */ "./src/app/model/product.repository.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _common_services_metrika_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/services/metrika.service */ "./src/app/common/services/metrika.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HeaderComponent = /** @class */ (function () {
    // public routerSub: Subscription;
    function HeaderComponent(_repository, _router, _activeRoute, metrikaService) {
        this._repository = _repository;
        this._router = _router;
        this._activeRoute = _activeRoute;
        this.metrikaService = metrikaService;
        this.menuStatus = false;
    }
    HeaderComponent.prototype.getCategory = function (cat) {
        return this._repository.getCategories(cat);
    };
    HeaderComponent.prototype.menuBigScreen = function (cl) {
        if (cl) {
            this.menuCategory = cl;
            return;
        }
        else {
            this.menuToggle();
        }
    };
    HeaderComponent.prototype.menuToggle = function () {
        this.menuStatus = !this.menuStatus;
    };
    HeaderComponent.prototype.metrika = function (value) {
        this.metrikaService.metrika(value);
    };
    HeaderComponent.prototype.ngOnInit = function () {
        // this.routerSub = this._router.events
        //     .pipe(
        //         filter(event => event instanceof NavigationEnd &&
        //             this._activeRoute.snapshot._routerState['url'] === '/category/shop' ||
        //             this._activeRoute.snapshot._routerState['url'] === '/category/wedding')
        //     )
        //     .subscribe(() => {
        //             window.scrollTo(0, 0);
        //         }
        //     );
    };
    HeaderComponent.prototype.ngOnDestroy = function () {
        // this.routerSub.unsubscribe();
    };
    HeaderComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-header',
            template: __webpack_require__(/*! ./header.component.html */ "./src/app/header/header.component.html"),
            styles: [__webpack_require__(/*! ./header.component.css */ "./src/app/header/header.component.css")]
        }),
        __metadata("design:paramtypes", [_model_product_repository__WEBPACK_IMPORTED_MODULE_1__["ProductRepository"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _common_services_metrika_service__WEBPACK_IMPORTED_MODULE_3__["MetrikaService"]])
    ], HeaderComponent);
    return HeaderComponent;
}());



/***/ }),

/***/ "./src/app/main/main.component.css":
/*!*****************************************!*\
  !*** ./src/app/main/main.component.css ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#videoHero, #video {\r\n    display: none\r\n}\r\n\r\n.btn_main {\r\n    display: none;\r\n    font-family: 'Avenir', 'Montserrat', Arial, Helvetica, sans-serif;\r\n    color: #ffffff;\r\n    font-size: 1.8rem;\r\n    letter-spacing: 1px;\r\n    -ms-grid-row-align: center;\r\n        align-self: center;\r\n    background: transparent;\r\n    padding: 1rem 1rem;\r\n    margin: 0 1rem;\r\n    transition: all .5s ease;\r\n    outline: none;\r\n    box-shadow: 20px 38px 34px -26px hsla(100, 100%, 100%, 0.2);\r\n    cursor: pointer;\r\n    border: solid 1px #ffffff;\r\n}\r\n\r\nbutton:hover {\r\n     box-shadow:2px 8px 4px -6px hsla(0,0%,0%,.3);\r\n }\r\n\r\n@media only screen and (min-device-width: 992px) {\r\n    #videoHero, #video {\r\n        display: block;\r\n    }\r\n}\r\n\r\n@media only screen and (max-device-width: 991px) {\r\n    .main_page_section{\r\n        display: flex;\r\n        flex-direction: column;\r\n        justify-content: space-around;\r\n    }\r\n    .main_page_section button {\r\n        display: block;\r\n    }\r\n}\r\n\r\n\r\n"

/***/ }),

/***/ "./src/app/main/main.component.html":
/*!******************************************!*\
  !*** ./src/app/main/main.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<section class=\"main_page_section\" >\r\n    <div class=\"season_banner\">\r\n        <span class=\"season_banner_text\">\r\n            <p>Дарим тепло</p>\r\n            <p>через цветы</p>\r\n            <div class=\"banner_btn cart-button\" [routerLink]=\"['category', 'shop', 'Букеты']\">Сделать заказ</div>\r\n        </span>\r\n    </div>\r\n<!--  <button class='btn_main' [routerLink]=\"['category', 'shop', 'Букеты']\">в магазин</button>-->\r\n<!--  <div id=\"video\" *responsive=\"{sizes:{min:992}}\">-->\r\n<!--    <video id=\"videoHero\" [muted]=\"'muted'\"  autoplay loop>-->\r\n<!--    <source src=\"./assets/images/main/main.mp4\" type=\"video/mp4\">-->\r\n<!--    </video>-->\r\n<!--  </div>-->\r\n</section>\r\n"

/***/ }),

/***/ "./src/app/main/main.component.ts":
/*!****************************************!*\
  !*** ./src/app/main/main.component.ts ***!
  \****************************************/
/*! exports provided: MainComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MainComponent", function() { return MainComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var MainComponent = /** @class */ (function () {
    function MainComponent() {
    }
    MainComponent.prototype.ngOnInit = function () {
    };
    MainComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-main',
            template: __webpack_require__(/*! ./main.component.html */ "./src/app/main/main.component.html"),
            styles: [__webpack_require__(/*! ./main.component.css */ "./src/app/main/main.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], MainComponent);
    return MainComponent;
}());



/***/ }),

/***/ "./src/app/model/auth.service.ts":
/*!***************************************!*\
  !*** ./src/app/model/auth.service.ts ***!
  \***************************************/
/*! exports provided: AuthService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthService", function() { return AuthService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _rest_datasource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rest.datasource */ "./src/app/model/rest.datasource.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AuthService = /** @class */ (function () {
    function AuthService(_datasource, _router) {
        this._datasource = _datasource;
        this._router = _router;
        this.isAuthenticated = false;
        this.authStatusListener = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
    }
    AuthService.prototype.getToken = function () {
        return this.auth_token || localStorage.getItem('token');
    };
    AuthService.prototype.getIsAuth = function () {
        return this.isAuthenticated;
    };
    AuthService.prototype.getAuthStatusListener = function () {
        return this.authStatusListener.asObservable();
    };
    AuthService.prototype.createUser = function (email, username, password) {
        return this._datasource.createUser(email, username, password);
    };
    AuthService.prototype.authenticate = function (username, password) {
        var _this = this;
        return this._datasource.authenticate(username, password).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            _this.auth_token = response.token ? response.token : null;
            if (response.token) {
                var expiresInDuration = response.expiresIn;
                _this.tokenTimer = setTimeout(function () {
                    _this.clear();
                }, expiresInDuration * 1000);
                _this.userId = response.userId;
                var now = new Date();
                var expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
                _this.setAuthTimer(expiresInDuration);
                _this.isAuthenticated = true;
                _this.authStatusListener.next(true);
                _this.saveAuthData(_this.auth_token, expirationDate, _this.userId);
                return response;
            }
        }));
    };
    AuthService.prototype.setAuthTimer = function (duration) {
        var _this = this;
        console.log('Setting timer: ' + duration);
        this.tokenTimer = setTimeout(function () {
            _this.clear();
        }, duration * 1000);
    };
    AuthService.prototype.clear = function () {
        this.auth_token = null;
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
        clearTimeout(this.tokenTimer);
        this.clearAuthData();
        this._router.navigateByUrl('/');
    };
    AuthService.prototype.autoAuthUser = function () {
        var authInformation = this.getAuthData();
        if (!authInformation) {
            return;
        }
        var now = new Date();
        var expiresIn = authInformation.expirationDate.getTime() - now.getTime();
        if (expiresIn > 0) {
            this.auth_token = authInformation.token;
            this.isAuthenticated = true;
            this.userId = authInformation.userId;
            this.setAuthTimer(expiresIn / 1000);
            this.authStatusListener.next(true);
        }
    };
    AuthService.prototype.saveAuthData = function (token, expirationDate, userId) {
        localStorage.setItem('token', token);
        localStorage.setItem('expiration', expirationDate.toISOString());
        localStorage.setItem('userId', userId);
    };
    AuthService.prototype.clearAuthData = function () {
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
        localStorage.removeItem('userId');
    };
    AuthService.prototype.getAuthData = function () {
        var token = localStorage.getItem('token');
        var expirationDate = localStorage.getItem('expiration');
        var userId = localStorage.getItem('userId');
        if (!token || !expirationDate) {
            return;
        }
        return {
            token: token,
            expirationDate: new Date(expirationDate),
            userId: userId
        };
    };
    AuthService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_rest_datasource__WEBPACK_IMPORTED_MODULE_1__["RestDataSource"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]])
    ], AuthService);
    return AuthService;
}());



/***/ }),

/***/ "./src/app/model/cart.model.ts":
/*!*************************************!*\
  !*** ./src/app/model/cart.model.ts ***!
  \*************************************/
/*! exports provided: Cart, CartLine */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Cart", function() { return Cart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CartLine", function() { return CartLine; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var Cart = /** @class */ (function () {
    function Cart() {
        this.lines = [];
        this.itemCount = 0;
        this.cartPrice = 0;
    }
    Cart.prototype.addLine = function (product, quantity) {
        if (quantity === void 0) { quantity = 1; }
        var line = this.lines.find(function (line) { return line.product._id == product._id; });
        if (line != undefined) {
            line.quantity += quantity;
        }
        else {
            this.lines.push(new CartLine(product, quantity));
        }
        this.recalculate();
    };
    Cart.prototype.productQuantity = function (id) {
        var line = this.lines.find(function (line) { return line.product._id == id; });
        if (!line) {
            return 0;
        }
        else {
            return line.quantity;
        }
    };
    Cart.prototype.updateQuantity = function (product, quantity) {
        var line = this.lines.find(function (line) { return line.product._id == product._id; });
        if (line != undefined) {
            line.quantity = Number(quantity);
        }
        this.recalculate();
    };
    Cart.prototype.incrementQuantity = function (product) {
        var line = this.lines.find(function (line) { return line.product._id == product._id; });
        if (line != undefined) {
            line.quantity++;
        }
        this.recalculate();
    };
    Cart.prototype.decrementQuantity = function (product) {
        var line = this.lines.find(function (line) { return line.product._id == product._id; });
        if (line != undefined) {
            line.quantity--;
            if (line.quantity <= 0) {
                this.removeLine(product._id);
            }
        }
        this.recalculate();
    };
    Cart.prototype.removeLine = function (id) {
        var index = this.lines.findIndex(function (line) { return line.product._id == id; });
        if (index < 0) {
            return;
        }
        this.lines.splice(index, 1);
        this.recalculate();
    };
    Cart.prototype.clear = function () {
        this.lines = [];
        this.itemCount = 0;
        this.cartPrice = 0;
        localStorage.removeItem('cart');
    };
    Cart.prototype.recalculate = function () {
        var _this = this;
        this.itemCount = 0;
        this.cartPrice = 0;
        this.lines.forEach(function (l) {
            _this.itemCount += l.quantity;
            _this.cartPrice += (l.quantity * l.product.price);
        });
        var cartCopy = {
            lines: this.lines,
            itemCount: this.itemCount,
            cartPrice: this.cartPrice,
        };
        if (this.itemCount <= 0) {
            localStorage.removeItem('cart');
        }
        else {
            localStorage.setItem('cart', JSON.stringify(cartCopy));
        }
    };
    Cart.prototype.setFromStorage = function (cart) {
        this.itemCount = cart.itemCount;
        this.cartPrice = cart.cartPrice;
        this.lines = cart.lines;
    };
    Cart = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], Cart);
    return Cart;
}());

var CartLine = /** @class */ (function () {
    function CartLine(product, quantity) {
        this.product = product;
        this.quantity = quantity;
    }
    Object.defineProperty(CartLine.prototype, "lineTotal", {
        get: function () {
            return this.quantity * this.product.price;
        },
        enumerable: true,
        configurable: true
    });
    return CartLine;
}());



/***/ }),

/***/ "./src/app/model/model.module.ts":
/*!***************************************!*\
  !*** ./src/app/model/model.module.ts ***!
  \***************************************/
/*! exports provided: ModelModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModelModule", function() { return ModelModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _rest_datasource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./rest.datasource */ "./src/app/model/rest.datasource.ts");
/* harmony import */ var _product_repository__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./product.repository */ "./src/app/model/product.repository.ts");
/* harmony import */ var _visual_resolver__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./visual.resolver */ "./src/app/model/visual.resolver.ts");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./auth.service */ "./src/app/model/auth.service.ts");
/* harmony import */ var _send_email_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./send-email.service */ "./src/app/model/send-email.service.ts");
/* harmony import */ var _cart_model__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./cart.model */ "./src/app/model/cart.model.ts");
/* harmony import */ var _order_model__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./order.model */ "./src/app/model/order.model.ts");
/* harmony import */ var _order_repository__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./order.repository */ "./src/app/model/order.repository.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var ModelModule = /** @class */ (function () {
    function ModelModule() {
    }
    ModelModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClientModule"]],
            providers: [_rest_datasource__WEBPACK_IMPORTED_MODULE_2__["RestDataSource"], _product_repository__WEBPACK_IMPORTED_MODULE_3__["ProductRepository"], _visual_resolver__WEBPACK_IMPORTED_MODULE_4__["VisualModelResolver"], _auth_service__WEBPACK_IMPORTED_MODULE_5__["AuthService"], _send_email_service__WEBPACK_IMPORTED_MODULE_6__["SendEmailService"], _cart_model__WEBPACK_IMPORTED_MODULE_7__["Cart"], _order_model__WEBPACK_IMPORTED_MODULE_8__["Order"], _order_repository__WEBPACK_IMPORTED_MODULE_9__["OrderRepository"]],
        })
    ], ModelModule);
    return ModelModule;
}());



/***/ }),

/***/ "./src/app/model/order.model.ts":
/*!**************************************!*\
  !*** ./src/app/model/order.model.ts ***!
  \**************************************/
/*! exports provided: Order, ProductsShortcut */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Order", function() { return Order; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductsShortcut", function() { return ProductsShortcut; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var Order = /** @class */ (function () {
    function Order() {
        this.shipped = false;
        this.itemCount = 0;
        this.cartPrice = 0;
        this.cart = [];
    }
    Order.prototype.clear = function () {
        this._id = null;
        this.clientName = this.clientPhone = this.deliveryWay = this.paymentWay = this.cartPrice = this.itemCount = null;
        this.addressDelivery = this.dateDelivery = this.timeDelivery = this.receiveSolo = this.friendName = this.friendPhone = null;
        this.shipped = false;
        this.cart = [];
    };
    Order = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])()
    ], Order);
    return Order;
}());

var ProductsShortcut = /** @class */ (function () {
    function ProductsShortcut(productId, productName, productPrice, productQuantity) {
        this.productId = productId;
        this.productName = productName;
        this.productPrice = productPrice;
        this.productQuantity = productQuantity;
    }
    return ProductsShortcut;
}());



/***/ }),

/***/ "./src/app/model/order.repository.ts":
/*!*******************************************!*\
  !*** ./src/app/model/order.repository.ts ***!
  \*******************************************/
/*! exports provided: OrderRepository */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderRepository", function() { return OrderRepository; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _rest_datasource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rest.datasource */ "./src/app/model/rest.datasource.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var OrderRepository = /** @class */ (function () {
    function OrderRepository(dataSource) {
        this.dataSource = dataSource;
        this.orders = [];
        this.loaded = false;
    }
    OrderRepository.prototype.loadOrders = function () {
        var _this = this;
        this.loaded = true;
        this.dataSource.getOrders()
            .subscribe(function (orders) {
            _this.orders = orders.orders;
        });
    };
    OrderRepository.prototype.getOrders = function () {
        if (!this.loaded) {
            this.loadOrders();
        }
        return this.orders;
    };
    OrderRepository.prototype.saveOrder = function (order) {
        return this.dataSource.saveOrder(order);
    };
    OrderRepository.prototype.updateOrder = function (order) {
        var _this = this;
        this.dataSource.updateOrder(order).subscribe(function (order) {
            _this.orders.splice(_this.orders.
                findIndex(function (o) { return o._id === order.order._id; }), 1, order.order);
        });
    };
    OrderRepository.prototype.deleteOrder = function (id) {
        var _this = this;
        this.dataSource.deleteOrder(id).subscribe(function (order) {
            _this.orders.splice(_this.orders.findIndex(function (o) { return id === o._id; }), 1);
        });
    };
    OrderRepository = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_rest_datasource__WEBPACK_IMPORTED_MODULE_1__["RestDataSource"]])
    ], OrderRepository);
    return OrderRepository;
}());



/***/ }),

/***/ "./src/app/model/product.repository.ts":
/*!*********************************************!*\
  !*** ./src/app/model/product.repository.ts ***!
  \*********************************************/
/*! exports provided: ProductRepository */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductRepository", function() { return ProductRepository; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _rest_datasource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rest.datasource */ "./src/app/model/rest.datasource.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ProductRepository = /** @class */ (function () {
    function ProductRepository(dataSource) {
        var _this = this;
        this.dataSource = dataSource;
        this.products = [];
        this.visuals = [];
        this.productsUpdated = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        dataSource.getProducts().subscribe(function (data) {
            _this.products = data.products.reverse();
        });
        dataSource.getVisuals().subscribe(function (data) {
            _this.visuals = data.visuals.reverse();
        });
    }
    ProductRepository.prototype.getProducts = function (parentCategory, category, subcategory) {
        if (parentCategory === void 0) { parentCategory = null; }
        if (category === void 0) { category = null; }
        if (subcategory === void 0) { subcategory = null; }
        if (!parentCategory) {
            return this.products;
        }
        var productsArray = this.products.filter(function (p) { return parentCategory === p.parentCategory; });
        // let num = 1;
        // for (let i = 0; i < 5; i++) {
        //     if (productsArray[i]) {
        //         productsArray[i].newProd = ++num;
        //     } else {
        //         break;
        //     }
        // }
        return productsArray
            .filter(function (p) { return category === null || category === p.category; })
            .filter(function (p) { return subcategory === null || subcategory === p.subcategory; });
    };
    ProductRepository.prototype.getProduct = function (id) {
        return this.products.find(function (p) { return p._id == id; });
    };
    ProductRepository.prototype.getVisual = function (id) {
        return this.visuals.find(function (p) { return p._id == id; });
    };
    ProductRepository.prototype.getVisuals = function () {
        return this.visuals;
    };
    ProductRepository.prototype.getVisualByCat = function (category) {
        if (!category) {
            return this.visuals[0];
        }
        return this.visuals.find(function (p) { return p.category === category; });
    };
    ProductRepository.prototype._uniqueCategory = function (arr) {
        return arr.filter(function (c, index, array) { return array.indexOf(c) === index; });
    };
    ProductRepository.prototype.getParentCategories = function () {
        var category = this.products.map(function (p) { return p.parentCategory; });
        return this._uniqueCategory(category);
    };
    ProductRepository.prototype.getCategories = function (parentCategory) {
        var prodArray = this.products.slice();
        var category = prodArray.reverse().filter(function (p) { return parentCategory === p.parentCategory; }).map(function (p) { return p.category; });
        return this._uniqueCategory(category);
    };
    ProductRepository.prototype.getCategoriesOfVisuals = function () {
        var category = this.visuals.map(function (p) { return p.category; });
        return this._uniqueCategory(category).reverse();
    };
    ProductRepository.prototype.getSubCategories = function (category) {
        var productArr = this.products.filter(function (p) { return category === p.category; });
        var subcategoryArr = [];
        productArr.forEach(function (product) {
            if (!product.subcategory) {
                return;
            }
            else {
                subcategoryArr.push(product.subcategory);
            }
        });
        return this._uniqueCategory(subcategoryArr);
    };
    ProductRepository.prototype.deleteProduct = function (id) {
        var _this = this;
        this.dataSource.deleteProduct(id).subscribe(function (p) {
            _this.products.splice(_this.products.findIndex(function (pr) { return pr._id == id; }), 1);
        });
    };
    ProductRepository.prototype.updateVisual = function (id, name, parentCategory, category, description, price, images) {
        var _this = this;
        var visualData;
        if (images[0].name) {
            visualData = new FormData();
            visualData.append('_id', id);
            visualData.append('name', name);
            visualData.append('parentCategory', parentCategory);
            visualData.append('category', category);
            visualData.append('description', description);
            visualData.append('price', price);
            for (var _i = 0, images_1 = images; _i < images_1.length; _i++) {
                var image = images_1[_i];
                visualData.append('img', image, name);
            }
        }
        else {
            visualData = {
                _id: id,
                name: name,
                parentCategory: parentCategory,
                category: category,
                description: description,
                price: price,
                img: images
            };
        }
        this.dataSource.updateVisual(visualData, id).subscribe(function (visRes) {
            _this.visuals.splice(_this.visuals.findIndex(function (v) { return v._id == id; }), 1, visRes.visual);
        });
    };
    ProductRepository.prototype.addVisual = function (name, parentCategory, category, description, price, imgArray) {
        var _this = this;
        var visualData = new FormData();
        visualData.append('name', name);
        visualData.append('parentCategory', parentCategory);
        visualData.append('category', category);
        visualData.append('description', description);
        visualData.append('price', price);
        for (var _i = 0, imgArray_1 = imgArray; _i < imgArray_1.length; _i++) {
            var image = imgArray_1[_i];
            visualData.append('img', image, name);
        }
        this.dataSource.saveVisual(visualData)
            .subscribe(function (p) {
            console.log(p.message);
            _this.visuals.push(p.visual);
        });
    };
    ProductRepository.prototype.deleteVisual = function (id) {
        var _this = this;
        this.dataSource.deleteVisual(id).subscribe(function (p) {
            _this.visuals.splice(_this.visuals.findIndex(function (v) { return v._id == id; }), 1);
        });
    };
    ProductRepository.prototype.addProduct = function (name, parentCategory, category, subcategory, description, note, diameter, price, image, date) {
        var _this = this;
        this.productsUpdated.next(false);
        var productData = new FormData();
        productData.append('name', name);
        productData.append('parentCategory', parentCategory);
        productData.append('category', category);
        productData.append('subcategory', subcategory);
        productData.append('description', description);
        productData.append('note', note);
        productData.append('diameter', diameter);
        productData.append('price', price);
        productData.append('img', image, name);
        productData.append('create_ts', date);
        this.dataSource.saveProduct(productData)
            .subscribe(function (p) {
            _this.products.push(p.product);
            _this.productsUpdated.next(true);
        });
    };
    ProductRepository.prototype.updateProduct = function (id, name, parentCategory, category, subcategory, description, note, diameter, price, image, date) {
        var _this = this;
        this.productsUpdated.next(false);
        console.log(note);
        var productData;
        if (typeof image === 'object') {
            productData = new FormData();
            productData.append('_id', id);
            productData.append('name', name);
            productData.append('parentCategory', parentCategory);
            productData.append('category', category);
            productData.append('subcategory', subcategory);
            productData.append('description', description);
            productData.append('note', note);
            productData.append('diameter', diameter);
            productData.append('price', price);
            productData.append('img', image, name);
            productData.append('create_ts', date);
        }
        else {
            productData = {
                _id: id,
                name: name,
                parentCategory: parentCategory,
                category: category,
                subcategory: subcategory,
                description: description,
                note: note,
                diameter: diameter,
                price: price,
                img: image
            };
        }
        this.dataSource.updateProduct(productData, id)
            .subscribe(function (p) {
            _this.products.splice(_this.products.findIndex(function (pr) { return pr._id == id; }), 1, p.product);
            _this.productsUpdated.next(true);
        });
    };
    ProductRepository = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_rest_datasource__WEBPACK_IMPORTED_MODULE_1__["RestDataSource"]])
    ], ProductRepository);
    return ProductRepository;
}());



/***/ }),

/***/ "./src/app/model/rest.datasource.ts":
/*!******************************************!*\
  !*** ./src/app/model/rest.datasource.ts ***!
  \******************************************/
/*! exports provided: RestDataSource */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RestDataSource", function() { return RestDataSource; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var RestDataSource = /** @class */ (function () {
    function RestDataSource(_http, _router) {
        this._http = _http;
        this._router = _router;
        this.dbUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].apiUrl;
    }
    RestDataSource.prototype.getVisuals = function () {
        return this._http.get(this.dbUrl + 'visuals');
    };
    RestDataSource.prototype.getProducts = function () {
        return this._http.get(this.dbUrl + 'products');
    };
    RestDataSource.prototype.getProduct = function (id) {
        return this._http.get(this.dbUrl + "products/" + id);
    };
    RestDataSource.prototype.authenticate = function (user, pass) {
        var authData = { username: user, password: pass };
        return this._http.post(this.dbUrl + 'user/' + 'login', authData);
    };
    RestDataSource.prototype.sendEmail = function (userData, linkUrl) {
        return this._http.post(this.dbUrl + 'sendmail/' + linkUrl, userData);
    };
    RestDataSource.prototype.createUser = function (email, user, pass) {
        var _this = this;
        var authData = { email: email, username: user, password: pass };
        this._http.post(this.dbUrl + 'user/' + 'signup', authData).subscribe(function () {
            _this._router.navigate(['/']);
        }, function (error) {
            console.log(error.Error);
        });
    };
    RestDataSource.prototype.saveProduct = function (product) {
        return this._http.post(this.dbUrl + 'products', product);
    };
    RestDataSource.prototype.saveVisual = function (visual) {
        return this._http.post(this.dbUrl + 'visuals', visual);
    };
    RestDataSource.prototype.updateProduct = function (product, id) {
        return this._http.put(this.dbUrl + "products/" + id, product);
    };
    RestDataSource.prototype.updateVisual = function (visual, id) {
        return this._http.put(this.dbUrl + "visuals/" + id, visual);
    };
    RestDataSource.prototype.deleteProduct = function (id) {
        return this._http.delete(this.dbUrl + "products/" + id);
    };
    RestDataSource.prototype.deleteVisual = function (id) {
        return this._http.delete(this.dbUrl + "visuals/" + id);
    };
    RestDataSource.prototype.saveOrder = function (order) {
        return this._http.post(this.dbUrl + 'orders', order);
    };
    RestDataSource.prototype.getOrders = function () {
        return this._http.get(this.dbUrl + 'orders');
    };
    RestDataSource.prototype.deleteOrder = function (id) {
        return this._http.delete(this.dbUrl + "orders/" + id);
    };
    RestDataSource.prototype.updateOrder = function (order) {
        return this._http.put(this.dbUrl + "orders/" + order._id, order);
    };
    RestDataSource.prototype.sendSMS = function (opt) {
        console.log("sending in route");
        var arg = { text: opt };
        // this._http.post(this.dbUrl + 'sms', arg).subscribe(
        //     () => {
        //         console.log(
        //             `sms has been sent`
        //         );
        //     },
        //     err => {
        //         console.log(err);
        //     }
        // );
    };
    RestDataSource = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], RestDataSource);
    return RestDataSource;
}());



/***/ }),

/***/ "./src/app/model/send-email.service.ts":
/*!*********************************************!*\
  !*** ./src/app/model/send-email.service.ts ***!
  \*********************************************/
/*! exports provided: SendEmailService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SendEmailService", function() { return SendEmailService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _rest_datasource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rest.datasource */ "./src/app/model/rest.datasource.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SendEmailService = /** @class */ (function () {
    function SendEmailService(_restData) {
        this._restData = _restData;
    }
    SendEmailService.prototype.sendEmail = function (source, name, phone, _id, _product, emailAddress, message, order) {
        var userData = {
            name: name,
            phone: phone,
        };
        var linkUrl;
        if (emailAddress) {
            userData.email = emailAddress;
        }
        if (message) {
            userData.message = message;
        }
        if (_id) {
            userData._id = _id;
        }
        if (_product) {
            userData.product = _product;
        }
        if (order) {
            userData.order = order;
        }
        switch (source) {
            case '':
                linkUrl = '';
                break;
            case 'click':
                linkUrl = 'oneclick';
                break;
            case 'order':
                linkUrl = 'order';
                break;
            case 'visual':
                linkUrl = 'visual';
                break;
            default:
                linkUrl = '';
        }
        return this._restData.sendEmail(userData, linkUrl);
    };
    SendEmailService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_rest_datasource__WEBPACK_IMPORTED_MODULE_1__["RestDataSource"]])
    ], SendEmailService);
    return SendEmailService;
}());



/***/ }),

/***/ "./src/app/model/visual.resolver.ts":
/*!******************************************!*\
  !*** ./src/app/model/visual.resolver.ts ***!
  \******************************************/
/*! exports provided: VisualModelResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VisualModelResolver", function() { return VisualModelResolver; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _rest_datasource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rest.datasource */ "./src/app/model/rest.datasource.ts");
/* harmony import */ var _product_repository__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./product.repository */ "./src/app/model/product.repository.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var VisualModelResolver = /** @class */ (function () {
    function VisualModelResolver(model, dataSource) {
        this.model = model;
        this.dataSource = dataSource;
    }
    VisualModelResolver.prototype.resolve = function (route, state) {
        return this.model.getVisualByCat() == undefined
            ? this.dataSource.getVisuals() : null;
    };
    VisualModelResolver = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_product_repository__WEBPACK_IMPORTED_MODULE_2__["ProductRepository"],
            _rest_datasource__WEBPACK_IMPORTED_MODULE_1__["RestDataSource"]])
    ], VisualModelResolver);
    return VisualModelResolver;
}());



/***/ }),

/***/ "./src/app/routes.ts":
/*!***************************!*\
  !*** ./src/app/routes.ts ***!
  \***************************/
/*! exports provided: routes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routes", function() { return routes; });
/* harmony import */ var _content_shop_shop_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./content/shop/shop.component */ "./src/app/content/shop/shop.component.ts");
/* harmony import */ var _content_shop_one_product_one_product_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./content/shop/one-product/one-product.component */ "./src/app/content/shop/one-product/one-product.component.ts");
/* harmony import */ var _main_main_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./main/main.component */ "./src/app/main/main.component.ts");
/* harmony import */ var _content_shop_right_cards_right_cards_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./content/shop/right-cards/right-cards.component */ "./src/app/content/shop/right-cards/right-cards.component.ts");
/* harmony import */ var _content_contact_contact_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./content/contact/contact.component */ "./src/app/content/contact/contact.component.ts");
/* harmony import */ var _content_visual_visual_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./content/visual/visual.component */ "./src/app/content/visual/visual.component.ts");
/* harmony import */ var _model_visual_resolver__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./model/visual.resolver */ "./src/app/model/visual.resolver.ts");
/* harmony import */ var _content_about_about_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./content/about/about.component */ "./src/app/content/about/about.component.ts");
/* harmony import */ var _content_cooperation_cooperation_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./content/cooperation/cooperation.component */ "./src/app/content/cooperation/cooperation.component.ts");
/* harmony import */ var _content_delivery_delivery_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./content/delivery/delivery.component */ "./src/app/content/delivery/delivery.component.ts");
/* harmony import */ var _content_shop_cart_cart_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./content/shop/cart/cart.component */ "./src/app/content/shop/cart/cart.component.ts");
/* harmony import */ var _content_shop_checkout_checkout_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./content/shop/checkout/checkout.component */ "./src/app/content/shop/checkout/checkout.component.ts");












var routes = [
    {
        path: '',
        pathMatch: 'full',
        component: _main_main_component__WEBPACK_IMPORTED_MODULE_2__["MainComponent"],
    },
    {
        path: 'admin',
        loadChildren: './admin/admin.module#AdminModule',
    },
    {
        path: 'category/oformlenie',
        component: _content_shop_shop_component__WEBPACK_IMPORTED_MODULE_0__["ShopComponent"],
        children: [
            { path: ':category', component: _content_visual_visual_component__WEBPACK_IMPORTED_MODULE_5__["VisualComponent"] },
            { path: '', component: _content_visual_visual_component__WEBPACK_IMPORTED_MODULE_5__["VisualComponent"] },
        ],
        resolve: { model: _model_visual_resolver__WEBPACK_IMPORTED_MODULE_6__["VisualModelResolver"] }
    },
    {
        path: 'category/contact',
        component: _content_shop_shop_component__WEBPACK_IMPORTED_MODULE_0__["ShopComponent"],
        children: [
            { path: '', component: _content_contact_contact_component__WEBPACK_IMPORTED_MODULE_4__["ContactComponent"] },
        ]
    },
    {
        path: 'category/cart',
        component: _content_shop_shop_component__WEBPACK_IMPORTED_MODULE_0__["ShopComponent"],
        children: [
            { path: '', component: _content_shop_cart_cart_component__WEBPACK_IMPORTED_MODULE_10__["CartComponent"] }
        ]
    },
    {
        path: 'checkout',
        component: _content_shop_checkout_checkout_component__WEBPACK_IMPORTED_MODULE_11__["CheckoutComponent"]
    },
    {
        path: 'category/:parentcategory',
        component: _content_shop_shop_component__WEBPACK_IMPORTED_MODULE_0__["ShopComponent"],
        children: [
            { path: 'id/:index', component: _content_shop_one_product_one_product_component__WEBPACK_IMPORTED_MODULE_1__["OneProductComponent"] },
            { path: ':category', component: _content_shop_right_cards_right_cards_component__WEBPACK_IMPORTED_MODULE_3__["RightCardsComponent"] },
            { path: ':category/:subcategory', component: _content_shop_right_cards_right_cards_component__WEBPACK_IMPORTED_MODULE_3__["RightCardsComponent"] },
            { path: '', component: _content_shop_right_cards_right_cards_component__WEBPACK_IMPORTED_MODULE_3__["RightCardsComponent"] },
        ]
    },
    {
        path: 'delivery',
        component: _content_delivery_delivery_component__WEBPACK_IMPORTED_MODULE_9__["DeliveryComponent"],
    },
    {
        path: 'about-us',
        component: _content_about_about_component__WEBPACK_IMPORTED_MODULE_7__["AboutComponent"],
    },
    {
        path: 'cooperation',
        component: _content_cooperation_cooperation_component__WEBPACK_IMPORTED_MODULE_8__["CooperationComponent"],
    },
    {
        path: '**',
        component: _main_main_component__WEBPACK_IMPORTED_MODULE_2__["MainComponent"]
    }
];


/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false,
    // apiUrl: 'http://localhost:3000/api/'
    apiUrl: 'https://cvetochniy.com/api/'
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! hammerjs */ "./node_modules/hammerjs/hammer.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");





if (_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_3__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\JS\Angular\Cvetochny_MEAN\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map