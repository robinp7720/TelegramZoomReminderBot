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

    // TODO: Move this to a separate file and implement a view rendering library
    // Why do we send a HTML document which instantly redirects the user instead of sending a 301 http redirect?
    // Telegram follows http redirects and shows semantic information in the chat.
    // We don't really want that because the information is useless to us and it fills up the telegram chat
    // very quickly
    res.sendRaw(200, `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="utf-8">
                       
            <meta name="referrer" content="origin-when-cross-origin">
            <meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1">
            <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1.0">
            <title>${lectures[id].name}</title>
            <meta name="keywords" content="Learning, test, hello, fuckyou">
            <meta name="robots" content="noindex,nofollow">
            <meta property="og:type" content="activity">
            <meta property="og:title" content="${lectures[id].name}">
            <meta property="og:description" content="This zoom lecture will start in 5 mins">
            <meta name="description" content="This zoom lecture will start in 5 mins">
            <meta property="og:url" content="https://zb.robindecker.me/${req.params.id}">
            <meta property="og:site_name" content="Zoomy">

            <meta http-equiv="Refresh" content="0; url='${lectures[id].url}'">
        </head>
        <body>
            You should be redirected shortly.
            If not, press <a href="${lectures[id].url}">here</a>
        </body>
    </html>
    `);
})
