import axios from 'axios';
import logger from 'pino';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import $ from 'jquery';

const pino = logger();

export default async function getNews() {
    try {
        const response = await axios({
            method: 'GET',
            url: 'https://mail.ru',
        });

        if (response && response.data) {
            const { window } = new JSDOM(response.data);
            const news = $(window).find('.news__list__item__link__text');
            let res = 'Новости с mail.ru:\n';
            for (let i = 0; i < news.length; i += 1) {
                res += `${i + 1}. ${news[i].textContent.replace(/&nbsp;/, ' ')}\n`;
            }

            fs.writeFile('../news.txt', res, (err) => {
                if (err) throw err;
                pino.info('Заголовки новостей записаны в файл news.txt');
            });
        }
    } catch (err) {
        pino.error(err.message);
    }
}
