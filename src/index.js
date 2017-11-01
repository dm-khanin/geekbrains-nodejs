import dotenv from 'dotenv';
import news from './news';
import translate from './translate';

dotenv.config({
    path: '../.env',
});

// news();
translate();

