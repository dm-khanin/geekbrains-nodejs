'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _hapi = require('hapi');

var Hapi = _interopRequireWildcard(_hapi);

var _pino = require('pino');

var _pino2 = _interopRequireDefault(_pino);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var pino = (0, _pino2.default)();

exports.default = async function () {
    var server = new Hapi.Server();
    server.connection({
        port: 5000
    });

    var translateWord = async function translateWord(req, reply) {
        try {
            var word = req.query.word;

            if (!word) {
                reply('Введите в query-строке слово для перевода, например /translate?word=mother ');
                return;
            }

            var response = await (0, _axios2.default)({
                method: 'GET',
                url: 'https://translate.yandex.net/api/v1.5/tr.json/translate',
                params: {
                    key: process.env.YANDEX_KEY,
                    lang: 'en-ru',
                    text: word
                }
            });

            var _response$data = response.data,
                code = _response$data.code,
                text = _response$data.text;

            if (code === 200 && text.length === 1) {
                reply(text[0]);
            } else {
                reply('Произошла ошибка').code(code);
            }
        } catch (err) {
            pino.error(err.message);
            reply(err.message).code(500);
        }
    };

    var route = [{
        method: 'GET',
        path: '/translate',
        handler: translateWord
    }];

    server.route(route);

    server.start(function (err) {
        if (err) throw err;
        pino.info('Server running at ', server.info.uri);
    });
};