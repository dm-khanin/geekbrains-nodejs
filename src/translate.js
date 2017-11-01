import * as Hapi from 'hapi';
import logger from 'pino';
import axios from 'axios';

const pino = logger();

export default async function () {
    const server = new Hapi.Server();
    server.connection({
        port: 5000,
    });

    const translateWord = async (req, reply) => {
        try {
            const { word } = req.query;
            if (!word) {
                reply('Введите в query-строке слово для перевода, например /translate?word=mother ');
                return;
            }

            const response = await axios({
                method: 'GET',
                url: 'https://translate.yandex.net/api/v1.5/tr.json/translate',
                params: {
                    key: process.env.YANDEX_KEY,
                    lang: 'en-ru',
                    text: word,
                },
            });

            const { code, text } = response.data;
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

    const route = [{
        method: 'GET',
        path: '/translate',
        handler: translateWord,
    }];

    server.route(route);

    server.start((err) => {
        if (err) throw err;
        pino.info('Server running at ', server.info.uri);
    });
}
