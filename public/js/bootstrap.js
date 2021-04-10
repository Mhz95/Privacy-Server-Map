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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/app.js":
/*!*****************************!*\
  !*** ./resources/js/app.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// require('./bootstrap');
__webpack_require__(/*! jquery */ "jquery");

__webpack_require__(/*! ./bootstrap */ "./resources/js/bootstrap.js");

$(document).ready(function () {
  var APP_URL = window.Laravel.APP_URL;
  console.log($(location).attr('hostname'));
  var DP_SERVER_URL = 'http://localhost:8080';

  if ($(location).attr('hostname') == "10.0.2.2") {
    DP_SERVER_URL = 'http://10.0.2.2:8080';
  }

  var APP_CSRF = window.Laravel.csrfToken;
  var lat = 24.748344;
  var _long = 46.640382;
  var timestamp = 1616975430;
  var color = "huechange-r";
  var listOfOLocations = []; // 1,24.748344,46.640382,1616975430
  // 2,24.748038,46.639142,1616975470
  // 3,24.745975,46.634870,1616975510

  var mymap = L.map('mapid').setView([lat, _long], 13);
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibXVuZXJhaCIsImEiOiJja216ZDQ4ZjQwY3BjMnV0NzBmanRuMGJxIn0.68MXA1IoAt3gxv16LB4mGQ'
  }).addTo(mymap);
  $('#generate-rand').click(function () {
    var num = $('#number').val();
    color = "huechange-r";

    for (i = 0; i < num; i++) {
      var singleLoc = {};
      singleLoc['id'] = generateID(6);
      singleLoc['lat'] = getRandomInRange(24.74, 24.79, 6);
      singleLoc['long'] = getRandomInRange(46.64, 46.74, 6);
      singleLoc['timestamp'] = Math.floor(Date.now() / 1000) + Math.floor(Math.random() * (99 - 10 + 1) + 10);
      singleLoc['anonymity_policy'] = 'basic';
      listOfOLocations.push(singleLoc);
      addMarker(singleLoc, color, true);
    }

    addTRClickListener();
  });
  $('#add-loc').click(function () {
    var lt = $('#lat').val();
    var ln = $('#long').val();
    var singleLoc = {};
    singleLoc['id'] = generateID(6);
    singleLoc['lat'] = lt;
    singleLoc['long'] = ln;
    color = "huechange-r";
    singleLoc['timestamp'] = Math.floor(Date.now() / 1000);
    singleLoc['anonymity_policy'] = 'strong';
    listOfOLocations.push(singleLoc);
    addMarker(singleLoc, color, true);
    addTRClickListener();
  });

  function generateID(n) {
    var add = 1,
        max = 12 - add;

    if (n > max) {
      return generate(max) + generate(n - max);
    }

    max = Math.pow(10, n + add);
    var min = max / 10; // Math.pow(10, n) basically

    var number = Math.floor(Math.random() * (max - min + 1)) + min;
    return ("" + number).substring(add);
  }

  function addMarker(obj, color, exact) {
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoibXVuZXJhaCIsImEiOiJja216ZDQ4ZjQwY3BjMnV0NzBmanRuMGJxIn0.68MXA1IoAt3gxv16LB4mGQ'
    }).addTo(mymap);
    var marker = L.marker([obj['lat'], obj['long']]).addTo(mymap);
    var desc = "";

    if (exact) {
      desc = "<b>Exact Location</b>";
      marker._icon.id = obj['id'];
    } else {
      desc = "<b>Perturbed Location</b>";
      marker._icon.id = obj['id'] + "p";
    }

    marker.bindPopup(desc + "<br>ID: " + obj['id'] + "<br>Lat: " + obj['lat'] + "<br>Long: " + obj['long']);

    marker._icon.classList.add(color);

    $('#log tbody').append("<tr class='" + obj['id'] + "'><td>" + obj['id'] + "</td><td>" + obj['lat'] + "</td><td>" + obj['long'] + "</td><td>" + obj['timestamp'] + "</td><td>" + (exact ? "None" : obj['anonymity_policy'] == 'K' ? "K-anonymity" : obj['anonymity_policy'] == 'L' ? "Laplacian" : "Gaussian") + "</td></tr>");
  }

  function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1; // .toFixed() returns string, so ' * 1' is a trick to convert to number
  }

  $('#go-hide').click(function () {
    // if(listOfOLocations.length > 0){
    //   $("#go-reset").prop("disabled", true);
    //   $("#generate-rand").prop("disabled", true);
    //   $("#add-loc").prop("disabled", true);
    // }
    var mech = $('#mech').val();
    listOfOLocations.forEach(function (item, index, arr) {
      console.log(item['id']);
      console.log(item['lat']);
      console.log(item['long']);
      console.log(item['timestamp']);
      sendRequest(item['id'], item['lat'], item['long'], item['timestamp'], mech);
    });
  });
  $('#go-reset').click(function () {
    $('#log tbody').empty();
    listOfOLocations = [];
    mymap.eachLayer(function (layer) {
      mymap.removeLayer(layer);
    });
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoibXVuZXJhaCIsImEiOiJja216ZDQ4ZjQwY3BjMnV0NzBmanRuMGJxIn0.68MXA1IoAt3gxv16LB4mGQ'
    }).addTo(mymap);
  });

  function sendRequest(id, lat, _long2, timestamp, mech) {
    $.ajax({
      type: 'post',
      url: DP_SERVER_URL + '/dpserver/AnonymityServlet',
      data: {
        "_token": APP_CSRF,
        'id': id,
        'latitude': lat,
        'longitude': _long2,
        'timestamp': timestamp,
        'mech': mech,
        'anonymity_policy': 'basic'
      },
      success: function success(data, textStatus, request) {
        console.log(request.getAllResponseHeaders());
        console.log(data);
        color = "huechange-g";
        var singleLoc = {};
        singleLoc['id'] = data.id;
        singleLoc['anonymity_policy'] = data.policy;
        singleLoc['lat'] = data.latitude;
        singleLoc['long'] = data.longitude;
        singleLoc['timestamp'] = Math.floor(Date.now() / 1000);
        addMarker(singleLoc, color, false);
        addTRClickListener();
      },
      error: function error(xhr, status, _error) {
        console.log(xhr);
        console.log(status);
      }
    });
  }

  function addTRClickListener() {
    $('#log tr').click(function () {
      var id = "#" + $(this).children()[0].innerText;
      var classid = "." + $(this).children()[0].innerText;
      var policy = $(this).children()[4].innerText;

      if (policy == "None") {
        $(id).focus();
        $(id).click();
      } else {
        $(id + "p").focus();
        $(id + "p").click();
      }

      $(classid).parent().children().css({
        "backgroundColor": "white",
        "color": "black"
      });
      $(classid).css({
        "backgroundColor": "#419ad6d6",
        "color": "white"
      });
    });
  } // Add circle or polygon
  // var circle = L.circle([24.748344, 46.640382], {
  //   color: 'red',
  //   fillColor: '#f03',
  //   fillOpacity: 0.5,
  //   radius: 500
  // }).addTo(mymap);
  // var polygon = L.polygon([
  //   [24.749344, 46.660382],
  //   [24.747344, 46.620382],
  //   [24.808344, 46.598382]
  // ]).addTo(mymap);
  //circle.bindPopup("I am a circle.");
  //polygon.bindPopup("I am a polygon.");

});

/***/ }),

/***/ "./resources/js/bootstrap.js":
/*!***********************************!*\
  !*** ./resources/js/bootstrap.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/babel-loader/lib/index.js):\nSyntaxError: /Users/Mhz/Documents/17-3-21-TASKS/IS/Github airport/src/dp-map-app/resources/js/bootstrap.js: 'import' and 'export' may only appear at the top level (12:2)\n\n\u001b[0m \u001b[90m 10 |\u001b[39m   window\u001b[33m.\u001b[39m$ \u001b[33m=\u001b[39m window\u001b[33m.\u001b[39mjQuery \u001b[33m=\u001b[39m require(\u001b[32m'jquery'\u001b[39m)\u001b[33m;\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 11 |\u001b[39m\u001b[0m\n\u001b[0m\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 12 |\u001b[39m   \u001b[36mimport\u001b[39m \u001b[33mPopper\u001b[39m \u001b[36mfrom\u001b[39m \u001b[32m'popper.js/dist/umd/popper.js'\u001b[39m\u001b[33m;\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m    |\u001b[39m   \u001b[31m\u001b[1m^\u001b[22m\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 13 |\u001b[39m   window\u001b[33m.\u001b[39m\u001b[33mPopper\u001b[39m \u001b[33m=\u001b[39m \u001b[33mPopper\u001b[39m\u001b[33m;\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 14 |\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 15 |\u001b[39m   require(\u001b[32m'bootstrap'\u001b[39m)\u001b[33m;\u001b[39m\u001b[0m\n    at Parser._raise (/Users/Mhz/Documents/17-3-21-TASKS/IS/Github airport/src/dp-map-app/node_modules/@babel/parser/lib/index.js:776:17)\n    at Parser.raiseWithData (/Users/Mhz/Documents/17-3-21-TASKS/IS/Github airport/src/dp-map-app/node_modules/@babel/parser/lib/index.js:769:17)\n    at Parser.raise (/Users/Mhz/Documents/17-3-21-TASKS/IS/Github airport/src/dp-map-app/node_modules/@babel/parser/lib/index.js:737:17)\n    at Parser.parseStatementContent (/Users/Mhz/Documents/17-3-21-TASKS/IS/Github airport/src/dp-map-app/node_modules/@babel/parser/lib/index.js:12352:18)\n    at Parser.parseStatement (/Users/Mhz/Documents/17-3-21-TASKS/IS/Github airport/src/dp-map-app/node_modules/@babel/parser/lib/index.js:12259:17)\n    at Parser.parseBlockOrModuleBlockBody (/Users/Mhz/Documents/17-3-21-TASKS/IS/Github airport/src/dp-map-app/node_modules/@babel/parser/lib/index.js:12845:25)\n    at Parser.parseBlockBody (/Users/Mhz/Documents/17-3-21-TASKS/IS/Github airport/src/dp-map-app/node_modules/@babel/parser/lib/index.js:12836:10)\n    at Parser.parseBlock (/Users/Mhz/Documents/17-3-21-TASKS/IS/Github airport/src/dp-map-app/node_modules/@babel/parser/lib/index.js:12820:10)\n    at Parser.parseTryStatement (/Users/Mhz/Documents/17-3-21-TASKS/IS/Github airport/src/dp-map-app/node_modules/@babel/parser/lib/index.js:12708:23)\n    at Parser.parseStatementContent (/Users/Mhz/Documents/17-3-21-TASKS/IS/Github airport/src/dp-map-app/node_modules/@babel/parser/lib/index.js:12316:21)\n    at Parser.parseStatement (/Users/Mhz/Documents/17-3-21-TASKS/IS/Github airport/src/dp-map-app/node_modules/@babel/parser/lib/index.js:12259:17)\n    at Parser.parseBlockOrModuleBlockBody (/Users/Mhz/Documents/17-3-21-TASKS/IS/Github airport/src/dp-map-app/node_modules/@babel/parser/lib/index.js:12845:25)\n    at Parser.parseBlockBody (/Users/Mhz/Documents/17-3-21-TASKS/IS/Github airport/src/dp-map-app/node_modules/@babel/parser/lib/index.js:12836:10)\n    at Parser.parseProgram (/Users/Mhz/Documents/17-3-21-TASKS/IS/Github airport/src/dp-map-app/node_modules/@babel/parser/lib/index.js:12190:10)\n    at Parser.parseTopLevel (/Users/Mhz/Documents/17-3-21-TASKS/IS/Github airport/src/dp-map-app/node_modules/@babel/parser/lib/index.js:12181:25)\n    at Parser.parse (/Users/Mhz/Documents/17-3-21-TASKS/IS/Github airport/src/dp-map-app/node_modules/@babel/parser/lib/index.js:13892:10)\n    at parse (/Users/Mhz/Documents/17-3-21-TASKS/IS/Github airport/src/dp-map-app/node_modules/@babel/parser/lib/index.js:13944:38)\n    at parser (/Users/Mhz/Documents/17-3-21-TASKS/IS/Github airport/src/dp-map-app/node_modules/@babel/core/lib/parser/index.js:54:34)\n    at parser.next (<anonymous>)\n    at normalizeFile (/Users/Mhz/Documents/17-3-21-TASKS/IS/Github airport/src/dp-map-app/node_modules/@babel/core/lib/transformation/normalize-file.js:55:38)\n    at normalizeFile.next (<anonymous>)\n    at run (/Users/Mhz/Documents/17-3-21-TASKS/IS/Github airport/src/dp-map-app/node_modules/@babel/core/lib/transformation/index.js:31:50)\n    at run.next (<anonymous>)\n    at Function.transform (/Users/Mhz/Documents/17-3-21-TASKS/IS/Github airport/src/dp-map-app/node_modules/@babel/core/lib/transform.js:19:41)\n    at transform.next (<anonymous>)\n    at step (/Users/Mhz/Documents/17-3-21-TASKS/IS/Github airport/src/dp-map-app/node_modules/gensync/index.js:261:32)\n    at gen.next (/Users/Mhz/Documents/17-3-21-TASKS/IS/Github airport/src/dp-map-app/node_modules/gensync/index.js:273:13)\n    at async.call.value (/Users/Mhz/Documents/17-3-21-TASKS/IS/Github airport/src/dp-map-app/node_modules/gensync/index.js:223:11)\n    at errback.call (/Users/Mhz/Documents/17-3-21-TASKS/IS/Github airport/src/dp-map-app/node_modules/gensync/index.js:189:28)\n    at runGenerator.errback (/Users/Mhz/Documents/17-3-21-TASKS/IS/Github airport/src/dp-map-app/node_modules/@babel/core/lib/gensync-utils/async.js:62:7)\n    at val (/Users/Mhz/Documents/17-3-21-TASKS/IS/Github airport/src/dp-map-app/node_modules/gensync/index.js:113:33)\n    at step (/Users/Mhz/Documents/17-3-21-TASKS/IS/Github airport/src/dp-map-app/node_modules/gensync/index.js:287:14)\n    at gen.next (/Users/Mhz/Documents/17-3-21-TASKS/IS/Github airport/src/dp-map-app/node_modules/gensync/index.js:273:13)\n    at async.call.value (/Users/Mhz/Documents/17-3-21-TASKS/IS/Github airport/src/dp-map-app/node_modules/gensync/index.js:223:11)");

/***/ }),

/***/ "./resources/sass/app.scss":
/*!*********************************!*\
  !*** ./resources/sass/app.scss ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!************************************************************************************************!*\
  !*** multi ./resources/assets/js/bootstrap.js ./resources/js/app.js ./resources/sass/app.scss ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!(function webpackMissingModule() { var e = new Error("Cannot find module '/Users/Mhz/Documents/17-3-21-TASKS/IS/Github airport/src/dp-map-app/resources/assets/js/bootstrap.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
__webpack_require__(/*! /Users/Mhz/Documents/17-3-21-TASKS/IS/Github airport/src/dp-map-app/resources/js/app.js */"./resources/js/app.js");
module.exports = __webpack_require__(/*! /Users/Mhz/Documents/17-3-21-TASKS/IS/Github airport/src/dp-map-app/resources/sass/app.scss */"./resources/sass/app.scss");


/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ })

/******/ });