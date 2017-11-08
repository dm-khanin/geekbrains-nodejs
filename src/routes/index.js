import controllers from '../controllers';

export default function routes(app) {
    app.post('/add', controllers.add);
    app.get('/getall', controllers.getAll);
    app.post('/complete', controllers.complete);
    app.post('/delete', controllers.delete);
}
