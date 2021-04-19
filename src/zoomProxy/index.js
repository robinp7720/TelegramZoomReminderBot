import restify from 'restify';
import {lectures} from '../lectureLoader';
import {allRoute} from './all';

export const zoomProxyServer = restify.createServer({
    'name': 'ZoomBot'
})

zoomProxyServer.get('/all', allRoute); 

zoomProxyServer.get('/:id', (req, res, next) => {
    const id = parseInt(req.params.id);

    if (!lectures[id]) return next();

    res.redirect(lectures[id].url, next);
})
