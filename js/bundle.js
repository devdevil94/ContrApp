/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/block.js":
/*!*********************!*\
  !*** ./js/block.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\r\nclass Block{\r\n\r\n\tconstructor(x,y){\r\n\t\tthis.x = x;\r\n\t\tthis.y = y;\r\n\t\tthis.rect = null;\r\n\r\n\t\tthis.input = 't';\r\n\t\tthis.output = '';\r\n\t\tthis.transFunction = 't';\r\n\r\n\t}\r\n\r\n\tcreate(svg){\r\n\t\tthis.rect = new Rectangle(this.x,this.y,BLOCK_WIDTH,BLOCK_HEIGHT);\r\n\t\tthis.rect.draw(svg);\r\n\t\tthis.rect.setFunction(this.transFunction);\r\n\r\n\t\t//var blockCircles = this.rect.getInOutCircles();\r\n\t\t// for(var circle in blockCircles)\r\n\t\t// \tblockCircles[circle].addEventListener('click', this.createPath);\r\n\t}\r\n\r\n\tcreatePath(event){\r\n\t\tvar blockCircle = event.target;\r\n\t\tvar x = blockCircle.getAttributeNS(null, 'cx');\r\n\t\tvar y = blockCircle.getAttributeNS(null, 'cy');\r\n\t\tconsole.log(x + ' ' + y);\r\n\t\tvar svg = blockCircle.parentNode.parentNode;\r\n\t\tvar path = new Path(svg,x,y);\r\n\t}\r\n\r\n\tdetermineOutput(){\r\n\t\tvar parsedInput = algebra.parse(this.input);\r\n\t\tvar parsedTransFunction = algebra.parse(this.transFunction);\r\n\t\tthis.output = parsedInput.multiply(parsedTransFunction).toString();  \r\n\t}\r\n\r\n\tgetOutput(){ return this.output; }\r\n\r\n\tsetInput(input){ this.input = input; }\r\n\r\n\tsetTransferFunction(txt){\r\n\t\tthis.transFunction = txt;\r\n\t\tthis.rect.setFunction(this.transFunction);\r\n\t}\r\n}\n\n//# sourceURL=webpack:///./js/block.js?");

/***/ }),

/***/ "./js/constants.js":
/*!*************************!*\
  !*** ./js/constants.js ***!
  \*************************/
/*! exports provided: constants */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"constants\", function() { return constants; });\n\r\n\r\nvar constants = {\r\n    SVG_WIDTH: 600,\r\n    SVG_HEIGHT: 600,\r\n    BLOCK_WIDTH: 120,\r\n    BLOCK_HEIGHT: 80,\r\n    INOUT_CIRCLE_RADIUS: 3\r\n};\r\n\r\n\n\n//# sourceURL=webpack:///./js/constants.js?");

/***/ }),

/***/ "./js/main.js":
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _svg_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./svg.js */ \"./js/svg.js\");\n/* harmony import */ var _block_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./block.js */ \"./js/block.js\");\n/* harmony import */ var _block_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_block_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants.js */ \"./js/constants.js\");\n//Imports\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n//Important functions/objects to call\r\nvar svg = new _svg_js__WEBPACK_IMPORTED_MODULE_0__[\"SVG\"](_constants_js__WEBPACK_IMPORTED_MODULE_2__[\"constants\"].SVG_WIDTH, _constants_js__WEBPACK_IMPORTED_MODULE_2__[\"constants\"].SVG_HEIGHT).getSVG();\r\n//Utils.createArrowhead(svg);\r\n//Utils.createArrowend(svg);\r\n/////////////////////////////////////\r\n\r\n\r\nvar block = new _block_js__WEBPACK_IMPORTED_MODULE_1__[\"Block\"](_constants_js__WEBPACK_IMPORTED_MODULE_2__[\"constants\"].BLOCK_WIDTH, _constants_js__WEBPACK_IMPORTED_MODULE_2__[\"constants\"].BLOCK_HEIGHT);\r\nblock.create(svg);\n\n//# sourceURL=webpack:///./js/main.js?");

/***/ }),

/***/ "./js/svg.js":
/*!*******************!*\
  !*** ./js/svg.js ***!
  \*******************/
/*! exports provided: SVG */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SVG\", function() { return SVG; });\n\r\n\r\nclass SVG{\r\n\t\r\n\tconstructor(width,height){\r\n\t\tthis.svg = document.querySelector('svg');\r\n\t\tthis.svg.style.width = width;\r\n\t\tthis.svg.style.height = height;\r\n\t}\r\n\r\n\tgetSVG(){return this.svg;}\r\n};\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./js/svg.js?");

/***/ })

/******/ });