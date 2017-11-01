'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _pino = require('pino');

var _pino2 = _interopRequireDefault(_pino);

var _jsdom = require('jsdom');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pino = (0, _pino2.default)();

exports.default = async function getNews() {
    try {
        var response = await (0, _axios2.default)({
            method: 'GET',
            url: 'https://mail.ru'
        });

        if (response && response.data) {
            var _ref = new _jsdom.JSDOM(response.data),
                window = _ref.window;

            var news = (0, _jquery2.default)(window).find('.news__list__item__link__text');
            var res = 'Новости с mail.ru:\n';
            for (var i = 0; i < news.length; i += 1) {
                res += i + 1 + '. ' + news[i].textContent.replace(/&nbsp;/, ' ') + '\n';
            }

            _fs2.default.writeFile('../news.txt', res, function (err) {
                if (err) throw err;
                pino.info('Заголовки новостей записаны в файл news.txt');
            });
        }
    } catch (err) {
        pino.error(err.message);
    }
};