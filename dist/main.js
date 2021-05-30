/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/direction.js":
/*!**************************!*\
  !*** ./src/direction.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"directionAsVector\": () => (/* binding */ directionAsVector),\n/* harmony export */   \"getDirectionOpposite\": () => (/* binding */ getDirectionOpposite),\n/* harmony export */   \"isDirection\": () => (/* binding */ isDirection),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _structures_vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./structures/vector */ \"./src/structures/vector.js\");\n\r\n\r\nconst directions = {\r\n    UP: \"UP\",\r\n    RIGHT: \"RIGHT\",\r\n    DOWN: \"DOWN\",\r\n    LEFT: \"LEFT\"\r\n}\r\n\r\nObject.freeze(directions);\r\n\r\nconst getDirectionOpposite = (direction) => {\r\n    switch (direction) {\r\n        case directions.UP:\r\n            return directions.DOWN;\r\n        case directions.RIGHT:\r\n            return directions.LEFT;\r\n        case directions.DOWN:\r\n            return directions.UP;\r\n        case directions.LEFT:\r\n            return directions.RIGHT;\r\n    }\r\n}\r\n\r\nconst directionAsVector = (direction) => {\r\n    switch (direction) {\r\n        case directions.UP:\r\n            return new _structures_vector__WEBPACK_IMPORTED_MODULE_0__.default(0, -1);\r\n        case directions.RIGHT:\r\n            return new _structures_vector__WEBPACK_IMPORTED_MODULE_0__.default(1, 0);\r\n        case directions.DOWN:\r\n            return new _structures_vector__WEBPACK_IMPORTED_MODULE_0__.default(0, 1);\r\n        case directions.LEFT:\r\n            return new _structures_vector__WEBPACK_IMPORTED_MODULE_0__.default(-1, 0);\r\n    }\r\n}\r\n\r\nconst isDirection = (direction => {\r\n    return Object.keys(directions).includes(direction);\r\n})\r\n\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (directions);\n\n//# sourceURL=webpack://snake/./src/direction.js?");

/***/ }),

/***/ "./src/helpers/event-dispatcher.js":
/*!*****************************************!*\
  !*** ./src/helpers/event-dispatcher.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n\r\n\r\nclass EventDispatcher {\r\n\tconstructor() {\r\n\t\tthis._events = [];\r\n\t}\r\n\r\n\taddEvent(eventName) {\r\n\t\tif (typeof (this._events[eventName]) === 'undefined') {\r\n\t\t\tthis._events[eventName] = [];\r\n\t\t}\r\n\t}\r\n\r\n\tclearEvent(eventName) {\r\n\t\tthis._events[eventName] = [];\r\n\t}\r\n\r\n\tregisterHandler(eventName, handler) {\r\n\t\tthis.addEvent(eventName);\r\n\t\tthis._events[eventName].push(handler);\r\n\t}\r\n\r\n\tderegisterHandler(eventName, handler) {\r\n\t\tlet index = this._events[eventName].indexOf(handler);\r\n\r\n\t\tif (index !== -1){\r\n\t\t\tthis._events[eventName].splice(index, 1);\r\n\t\t}\r\n\t}\r\n\r\n\tdispatch(eventName, arg) {\r\n\t\tif (typeof (this._events[eventName]) !== \"undefined\") {\r\n\r\n\t\t\tfor (let index = 0; index < this._events[eventName].length; index++) {\r\n\t\t\t\tthis._events[eventName][index](arg);\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EventDispatcher);\r\n\r\n\n\n//# sourceURL=webpack://snake/./src/helpers/event-dispatcher.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _snake__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./snake */ \"./src/snake.js\");\n/* harmony import */ var _structures_grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./structures/grid */ \"./src/structures/grid.js\");\n/* harmony import */ var _renderers_canvas_renderer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./renderers/canvas-renderer */ \"./src/renderers/canvas-renderer.js\");\n/* harmony import */ var _direction__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./direction */ \"./src/direction.js\");\n/* harmony import */ var _timer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./timer */ \"./src/timer.js\");\n/* harmony import */ var _structures_vector__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./structures/vector */ \"./src/structures/vector.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nconst canvas = document.getElementById('canvas');\r\nconst renderer = new _renderers_canvas_renderer__WEBPACK_IMPORTED_MODULE_2__.default(canvas);\r\nlet score = 0;\r\nconst initialSnakeSize = 3;\r\nconst scoreElement = document.getElementById('score');\r\nconst grid = new _structures_grid__WEBPACK_IMPORTED_MODULE_1__.default(20, 20);\r\nlet snake = new _snake__WEBPACK_IMPORTED_MODULE_0__.default(grid.getCenter());\r\nconst gameInProgress = true;\r\nrenderer.drawGrid(grid);\r\nrenderer.drawSnake(snake);\r\n\r\nlet applePosition = grid.getRandomCoordinate(snake.getPositions());\r\nrenderer.drawApple(applePosition);\r\n\r\nconst timer = new _timer__WEBPACK_IMPORTED_MODULE_4__.default();\r\ntimer.start(200);\r\n\r\nconst timerLoop = () => {\r\n    timer.tick();\r\n\r\n    if (gameInProgress) {\r\n        window.requestAnimationFrame(timerLoop);\r\n    }\r\n}\r\n\r\ntimer.onElapsed(() => {\r\n    snake.move();\r\n\r\n    let headPosition = snake.getHeadPosition();\r\n\r\n    if (_structures_vector__WEBPACK_IMPORTED_MODULE_5__.default.isEqual(headPosition, applePosition)) {\r\n        snake.eat();\r\n        applePosition = grid.getRandomCoordinate(snake.getPositions());\r\n    }\r\n\r\n    if (snake.hasOverlapped()) {\r\n        //we've eating ourselves - game over!\r\n        alert('Game Over!');\r\n        //gameInProgress = false;\r\n        snake = new _snake__WEBPACK_IMPORTED_MODULE_0__.default(grid.getCenter());\r\n        applePosition = grid.getRandomCoordinate(snake.getPositions());\r\n        score = 0;\r\n    }\r\n\r\n    keepWithinGrid(snake, grid);\r\n});\r\n\r\ntimer.onElapsed(() => {\r\n    renderer.clear();\r\n    renderer.drawGrid(grid);\r\n    renderer.drawSnake(snake);\r\n    renderer.drawApple(applePosition);\r\n});\r\n\r\nsnake.onEat((snakeLength) => {\r\n    score = snakeLength -initialSnakeSize;\r\n    scoreElement.innerHTML = score;\r\n    console.log('score: ', score);\r\n})\r\n\r\nwindow.requestAnimationFrame(timerLoop);\r\n\r\ndocument.body.onkeyup = function (e) {\r\n    if (e.keyCode == 37) {\r\n        snake.changeDirection(_direction__WEBPACK_IMPORTED_MODULE_3__.default.LEFT);\r\n    }\r\n\r\n    if (e.keyCode == 38) {\r\n        snake.changeDirection(_direction__WEBPACK_IMPORTED_MODULE_3__.default.UP);\r\n    }\r\n\r\n    if (e.keyCode == 39) {\r\n        snake.changeDirection(_direction__WEBPACK_IMPORTED_MODULE_3__.default.RIGHT);\r\n    }\r\n\r\n    if (e.keyCode == 40) {\r\n        snake.changeDirection(_direction__WEBPACK_IMPORTED_MODULE_3__.default.DOWN);\r\n    }\r\n\r\n    if (e.keyCode == 69) {\r\n        snake.eat();\r\n        renderer.drawSnake(snake);\r\n    }\r\n\r\n    if (e.keyCode == 32) {\r\n        snake.move();\r\n        renderer.drawSnake(snake);\r\n    }\r\n}\r\n\r\nconst keepWithinGrid = (snake, grid) => {\r\n    let headPosition = snake.getHeadPosition();\r\n\r\n    if (headPosition.y < 0) {\r\n        snake.setHeadPosition(new _structures_vector__WEBPACK_IMPORTED_MODULE_5__.default(headPosition.x, grid.getRowCount() - 1));\r\n    }\r\n\r\n    if (headPosition.y >= grid.getRowCount()) {\r\n        snake.setHeadPosition(new _structures_vector__WEBPACK_IMPORTED_MODULE_5__.default(headPosition.x, 0));\r\n    }\r\n\r\n    if (headPosition.x < 0) {\r\n        snake.setHeadPosition(new _structures_vector__WEBPACK_IMPORTED_MODULE_5__.default(grid.getColumnCount() - 1, headPosition.y));\r\n    }\r\n\r\n    if (headPosition.x >= grid.getColumnCount()) {\r\n        snake.setHeadPosition(new _structures_vector__WEBPACK_IMPORTED_MODULE_5__.default(0, headPosition.y));\r\n    }\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack://snake/./src/index.js?");

/***/ }),

/***/ "./src/renderers/canvas-renderer.js":
/*!******************************************!*\
  !*** ./src/renderers/canvas-renderer.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass CanvasRenderer {\r\n    #canvas;\r\n    #context;\r\n    #width;\r\n    #height;\r\n    #cellSize;\r\n    #borderWidth;\r\n\r\n    constructor(canvas, cellSize = 20) {\r\n        this.#canvas = canvas;\r\n        this.#context = canvas.getContext('2d');\r\n        this.#height = canvas.height;\r\n        this.#width = canvas.width;\r\n        this.#cellSize = cellSize;\r\n        this.#borderWidth = 2;\r\n    }\r\n\r\n    clear(){\r\n        this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height);\r\n    }\r\n\r\n    drawGrid(grid) {\r\n        this.#canvas.height = this.#cellSize * grid.getColumnCount() + this.#borderWidth;\r\n        this.#canvas.width = this.#cellSize * grid.getRowCount() + this.#borderWidth;\r\n        this.#context.beginPath();\r\n\r\n        let gridCoordinates = grid.getGridCoordinates();\r\n\r\n        gridCoordinates.forEach((coordinate) => {\r\n            this.#context.rect(coordinate.x * this.#cellSize + this.#borderWidth,\r\n                coordinate.y * this.#cellSize + this.#borderWidth,\r\n                this.#cellSize - this.#borderWidth,\r\n                this.#cellSize - this.#borderWidth);\r\n        })\r\n       \r\n        this.#context.fillStyle = \"white\";\r\n        this.#context.fill();\r\n        this.#context.closePath();\r\n    }\r\n\r\n    drawSnake(snake) {\r\n        let positions = snake.getPositions();\r\n\r\n        this.#context.beginPath();\r\n        positions.forEach((coordinate) => {\r\n            this.#context.rect(coordinate.x * this.#cellSize + this.#borderWidth / 2,\r\n                coordinate.y * this.#cellSize + this.#borderWidth / 2,\r\n                this.#cellSize,\r\n                this.#cellSize);\r\n        })\r\n\r\n        this.#context.fillStyle = \"green\";\r\n        this.#context.strokeStyle = \"black\";\r\n        this.#context.fill();\r\n        this.#context.stroke();\r\n        this.#context.closePath();\r\n    }\r\n\r\n    drawApple(coordinate){\r\n        this.#context.beginPath();\r\n        this.#context.rect(coordinate.x * this.#cellSize + this.#borderWidth,\r\n            coordinate.y * this.#cellSize + this.#borderWidth,\r\n            this.#cellSize - this.#borderWidth,\r\n            this.#cellSize - this.#borderWidth);\r\n        this.#context.fillStyle = \"red\";\r\n        this.#context.fill();\r\n        this.#context.closePath();\r\n    }\r\n\r\n\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CanvasRenderer);\n\n//# sourceURL=webpack://snake/./src/renderers/canvas-renderer.js?");

/***/ }),

/***/ "./src/snake.js":
/*!**********************!*\
  !*** ./src/snake.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _helpers_event_dispatcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers/event-dispatcher */ \"./src/helpers/event-dispatcher.js\");\n/* harmony import */ var _direction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./direction */ \"./src/direction.js\");\n/* harmony import */ var _structures_linked_list__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./structures/linked-list */ \"./src/structures/linked-list.js\");\n/* harmony import */ var _structures_vector_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./structures/vector.js */ \"./src/structures/vector.js\");\n\r\n\r\n\r\n\r\n\r\nclass Snake {\r\n    #body;\r\n    #direction;\r\n    #eventDispatcher;\r\n    #events;\r\n\r\n    constructor(initialPosition, initialDirection = _direction__WEBPACK_IMPORTED_MODULE_1__.default.UP) {\r\n        this.#direction = initialDirection;\r\n        const oppositeDirection = (0,_direction__WEBPACK_IMPORTED_MODULE_1__.getDirectionOpposite)(initialDirection);\r\n        this.#body = new _structures_linked_list__WEBPACK_IMPORTED_MODULE_2__.default();\r\n        const directionVector = (0,_direction__WEBPACK_IMPORTED_MODULE_1__.directionAsVector)(oppositeDirection);\r\n        this.#body.push(new SnakeSegment(initialPosition));\r\n        this.#body.push(new SnakeSegment(_structures_vector_js__WEBPACK_IMPORTED_MODULE_3__.default.add(initialPosition, directionVector)));\r\n        this.#body.push(new SnakeSegment(_structures_vector_js__WEBPACK_IMPORTED_MODULE_3__.default.add(initialPosition, directionVector.multiplyScalar(2))));\r\n        this.#eventDispatcher = new _helpers_event_dispatcher__WEBPACK_IMPORTED_MODULE_0__.default();\r\n        this.#events = {\r\n            EAT: \"EAT\"\r\n        }\r\n    }\r\n\r\n    changeDirection(newDirection) {\r\n        const oppositeDirection = (0,_direction__WEBPACK_IMPORTED_MODULE_1__.getDirectionOpposite)(this.#direction);\r\n\r\n        if ((0,_direction__WEBPACK_IMPORTED_MODULE_1__.isDirection)(newDirection) && newDirection !== oppositeDirection) {\r\n            this.#direction = newDirection;\r\n        }\r\n    }\r\n\r\n    move() {\r\n        let node = this.#body.head;\r\n        const directionVector = (0,_direction__WEBPACK_IMPORTED_MODULE_1__.directionAsVector)(this.#direction);\r\n        let currentPosition = node.value().position;\r\n        let newPosition = _structures_vector_js__WEBPACK_IMPORTED_MODULE_3__.default.add(currentPosition, directionVector);\r\n        let i = 1;\r\n\r\n        while (i <= this.#body.length) {\r\n            currentPosition = node.value().position;\r\n\r\n            node.setValue({\r\n                position: newPosition\r\n            });\r\n\r\n            newPosition = currentPosition;\r\n            node = node.next();\r\n\r\n            i++;\r\n        }\r\n    }\r\n\r\n    eat() {\r\n        const last = this.#body.tail.value();\r\n        this.#body.push(last);\r\n        this.#eventDispatcher.dispatch(this.#events.EAT, this.#body.length);\r\n    }\r\n\r\n    getBody() {\r\n        return this.#body;\r\n    }\r\n\r\n    getDirection() {\r\n        return this.#direction;\r\n    }\r\n\r\n    getPositions() {\r\n        const positions = [];\r\n\r\n        let node = this.#body.head;\r\n        let i = 0;\r\n\r\n        while (i < this.#body.length) {\r\n            positions.push(node.value().position.get());\r\n            node = node.next();\r\n            i++;\r\n        }\r\n\r\n        return positions;\r\n    }\r\n\r\n    getBodyPositions() {\r\n        const positions = this.getPositions();\r\n        positions.shift();\r\n        return positions;\r\n    }\r\n\r\n    getHeadPosition() {\r\n        return this.#body.head.value().position;\r\n    }\r\n\r\n    setHeadPosition(newPosition) {\r\n        this.#body.head.setValue(new SnakeSegment(newPosition));\r\n    }\r\n\r\n    hasOverlapped() {\r\n        const positions = this.getPositions();\r\n        positions.shift();\r\n        return positions.filter((position) => _structures_vector_js__WEBPACK_IMPORTED_MODULE_3__.default.isEqual(position, this.#body.head.value().position)).length > 0;\r\n    }\r\n\r\n    onEat(handler) {\r\n        this.#eventDispatcher.registerHandler(this.#events.EAT, handler);\r\n    }\r\n\r\n    removeOnEat(handler) {\r\n        this.#eventDispatcher.deregisterHandler(this.#events.EAT, handler);\r\n    }\r\n}\r\n\r\nclass SnakeSegment {\r\n    constructor(position) {\r\n        this.position = position;\r\n    }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Snake);\n\n//# sourceURL=webpack://snake/./src/snake.js?");

/***/ }),

/***/ "./src/structures/grid.js":
/*!********************************!*\
  !*** ./src/structures/grid.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vector */ \"./src/structures/vector.js\");\n\r\n\r\nclass Grid {\r\n    #grid;\r\n    #numberOfColumns;\r\n    #numberOfRows; \r\n\r\n    constructor(numberOfColumns = 0, numberOfRows = 0) {\r\n        this.#numberOfColumns = numberOfColumns;\r\n        this.#numberOfRows = numberOfRows;\r\n        this.#grid = new Array(this.#numberOfColumns * this.#numberOfRows);\r\n    }\r\n\r\n    getCenter(){\r\n        return new _vector__WEBPACK_IMPORTED_MODULE_0__.default((this.#numberOfColumns / 2) - 1, (this.#numberOfRows / 2 ) - 1);\r\n    }\r\n\r\n    getColumnCount(){\r\n        return this.#numberOfColumns;\r\n    }\r\n\r\n    getRowCount(){\r\n        return this.#numberOfRows;\r\n    }\r\n\r\n    getGrid() {\r\n        return this.#grid;\r\n    }\r\n\r\n    getGridCoordinate(index) {\r\n        return new _vector__WEBPACK_IMPORTED_MODULE_0__.default(index % this.#numberOfColumns, Math.floor(index / this.#numberOfRows));\r\n    }\r\n\r\n    getIndex(x, y) {\r\n        return (y * this.#numberOfColumns) + x;\r\n    }\r\n    \r\n    getGridCoordinates() {\r\n        console.log(\"getGridCoordinates\");\r\n        return [...this.getGrid().keys()].map((element, index) => this.getGridCoordinate(index));\r\n    }\r\n\r\n    getRandomIndex(excludedIndices = []) {\r\n        const indices = [...this.getGrid().keys()].map((element, index) => index).filter(element => !excludedIndices.includes(element));\r\n        const randomNumber = Math.floor(Math.random() * indices.length);\r\n        return indices[randomNumber];\r\n    }\r\n\r\n    getRandomCoordinate(excludedCoordinates = []) {\r\n        const excludedIndices = excludedCoordinates.map(coordinate => this.getIndex(coordinate.x, coordinate.y));\r\n        const randomIndex = this.getRandomIndex(excludedIndices);\r\n        return this.getGridCoordinate(randomIndex);\r\n    }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Grid);\n\n//# sourceURL=webpack://snake/./src/structures/grid.js?");

/***/ }),

/***/ "./src/structures/linked-list.js":
/*!***************************************!*\
  !*** ./src/structures/linked-list.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass SinglyLinkedList {\r\n    constructor(){\r\n        this.#clear();\r\n    }\r\n\r\n    push(value){\r\n        const node = new SinglyLinkedListNode(value);\r\n\r\n        if(!this.head){\r\n            this.head = node;\r\n            this.tail = this.head;\r\n        }\r\n        else {\r\n            this.tail.setNext(node);\r\n            this.tail = node;\r\n        }\r\n\r\n        this.length += 1;\r\n\r\n        return this;\r\n    }\r\n    \r\n    //pop, shift, unshift - not required for snake\r\n   \r\n\r\n    #clear(){\r\n        this.head = null;\r\n        this.tail = null;\r\n        this.length = 0;\r\n    }\r\n}\r\n\r\nclass SinglyLinkedListNode {\r\n    #next;\r\n    #value;\r\n\r\n    constructor(value){\r\n        this.#next = null;\r\n        this.#value = value;\r\n    }\r\n\r\n    value() {\r\n        return this.#value;\r\n    }\r\n\r\n    next() {\r\n        return  this.#next;\r\n    }\r\n\r\n    setNext(node) {\r\n        this.#next = node;\r\n    }\r\n\r\n    setValue(value){\r\n        this.#value = value;\r\n    }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SinglyLinkedList);\n\n//# sourceURL=webpack://snake/./src/structures/linked-list.js?");

/***/ }),

/***/ "./src/structures/vector.js":
/*!**********************************!*\
  !*** ./src/structures/vector.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Vector {\r\n    constructor(x, y) {\r\n        this.x = x;\r\n        this.y = y;\r\n    }\r\n\r\n    add(vector) {\r\n        this.x += vector.x;\r\n        this.y += vector.y;\r\n    }\r\n\r\n    multiplyScalar(value) {\r\n        this.x *= value;\r\n        this.y *= value;\r\n        return this;\r\n    }\r\n\r\n    get() {\r\n        return {\r\n            x: this.x,\r\n            y: this.y\r\n        }\r\n    }\r\n\r\n    static add(vectorA, vectorB) {\r\n        return new Vector(vectorA.x + vectorB.x, vectorA.y + vectorB.y);\r\n    }\r\n\r\n    static isEqual(vectorA, vectorB) {\r\n        return vectorA.x === vectorB.x && vectorA.y === vectorB.y;\r\n    }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Vector);\n\n//# sourceURL=webpack://snake/./src/structures/vector.js?");

/***/ }),

/***/ "./src/timer.js":
/*!**********************!*\
  !*** ./src/timer.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _helpers_event_dispatcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers/event-dispatcher */ \"./src/helpers/event-dispatcher.js\");\n\r\n\r\nclass Timer {\r\n    #elaspsed;\r\n    #startTime;\r\n    #current;\r\n    #target;\r\n    #isActive;\r\n    #eventDispatcher;\r\n    #events;\r\n\r\n    start(target) {\r\n        this.#current = 0;\r\n        this.#startTime = new Date();\r\n        this.#target = target;\r\n        this.#isActive = true;\r\n        this.#eventDispatcher = new _helpers_event_dispatcher__WEBPACK_IMPORTED_MODULE_0__.default();\r\n        this.#events = {\r\n            TICK: \"TICK\",\r\n            ELAPSED: \"ELAPSED\"\r\n        }\r\n    }\r\n\r\n    reset() {\r\n        this.#current = 0;\r\n        this.#startTime = new Date();\r\n    }\r\n\r\n    hasElapsed() {\r\n        return this.#elaspsed;\r\n    }\r\n\r\n    tick() {\r\n        if (this.#isActive) {\r\n            this.#eventDispatcher.dispatch(this.#events.TICK);\r\n            this.#current = new Date() - this.#startTime;\r\n            this.#elaspsed = this.#current > this.#target;\r\n\r\n            if (this.hasElapsed()) {\r\n                this.#eventDispatcher.dispatch(this.#events.ELAPSED);\r\n                this.reset();\r\n            }\r\n        }\r\n\r\n    }\r\n\r\n    onTick(handler) {\r\n        this.#eventDispatcher.registerHandler(this.#events.TICK, handler);\r\n    }\r\n\r\n    removeOnTick(handler) {\r\n        this.#eventDispatcher.deregisterHandler(this.#events.TICK, handler);\r\n    }\r\n\r\n    onElapsed(handler) {\r\n        this.#eventDispatcher.registerHandler(this.#events.ELAPSED, handler);\r\n    }\r\n\r\n    removeOnElapsed(handler) {\r\n        this.#eventDispatcher.deregisterHandler(this.#events.ELAPSED, handler);\r\n    }\r\n\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Timer);\n\n//# sourceURL=webpack://snake/./src/timer.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;