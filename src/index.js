import Logger from 'pino';
import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';

const logger = Logger();
const app = express();

app.use(bodyParser.json());

routes(app);

app.listen(5000, () => {
    logger.info('Server listeting');
});
