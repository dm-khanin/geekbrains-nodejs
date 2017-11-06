import Logger from 'pino';
import express from 'express';
import consolidate from 'consolidate';
import bodyParser from 'body-parser';
import template from 'consolidate';
import feed from 'rss-to-json';

const logger = Logger();
const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded());
app.engine('hbs', template.handlebars);
app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);

const makeTxtFileString = (json, newsCount) => {
    let res = '';
    res += `${json.description}: \n`;
    json.items.slice(0, +newsCount).forEach((item, i) => {
        res += `${i + 1}. ${item.title} (${item.url}) \n`;
        res += `Опубликовано: ${new Date(item.created).toLocaleString()} \n`;
    });

    return res;
};

app.post('/feed', (req, res) => {
    try {
        const { site, format, count } = req.body;
        feed.load(site, (err, rss) => {
            if (err) throw err;
            if (format === 'txt') {
                res.setHeader('Content-disposition', 'attachment; filename=news.txt');
                res.setHeader('Content-type', 'text/plain');
                res.charset = 'UTF-8';
                res.write(makeTxtFileString(rss, count));
                res.end();
            } else if (format === 'html') {
                res.render('news', {
                    title: rss.title,
                    description: rss.description,
                    items: rss.items.slice(0, +count),
                });
            }
        });
    } catch (err) {
        res.status(500);
        res.send(err.message);
    }
});

app.listen(5000, () => {
    logger.info('Server listeting');
});
