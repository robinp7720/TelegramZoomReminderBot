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
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            
            <title>${lectures[id].name}</title>
            
            <meta property="og:site_name" content="${lectures[id].name}">
            <meta property="og:title" content="${lectures[id].name}">
            
            <meta http-equiv="Refresh" content="0; url='${lectures[id].url}'" />
        </head>
        <body>
            You should be redirected shortly.
            If not, press <a href="${lectures[id].url}">here</a>
        </body>
    </html>
    `);
})
