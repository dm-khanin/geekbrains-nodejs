import Logger from 'pino';
import mysql from 'mysql';

const logger = Logger();
const pool = mysql.createPool({
    host: 'localhost',
    database: 'todo',
    user: 'root',
    password: '',
});


const controllers = {
    async getAll(req, res) {
        try {
            pool.getConnection((err, connection) => {
                if (err) throw err;
                const tasks = connection.query('SELECT * FROM `tasks`', (error, tasks) => {
                    if (error) throw error;
                    connection.release();
                });
            });
        } catch (err) {
            logger.error(err);
            res.statusCode(500);
        }
    },

    async add(req, res) {
        try {
            res.send('ok');

        } catch (err) {
            logger.error(err);
            res.statusCode(500);
        }
    },

    async complete(req, res) {
        try {
            res.send('ok');

        } catch (err) {
            logger.error(err);
            res.statusCode(500);
        }
    },

    async delete(req, res) {
        try {
            res.send('ok');

        } catch (err) {
            logger.error(err);
            res.statusCode(500);
        }
    },
};

export default controllers;
