'use strict';

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _news = require('./news');

var _news2 = _interopRequireDefault(_news);

var _translate = require('./translate');

var _translate2 = _interopRequireDefault(_translate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config({
    path: '../.env'
});

(0, _news2.default)();
(0, _translate2.default)();