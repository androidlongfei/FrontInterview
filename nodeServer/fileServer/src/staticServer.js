import path from 'path'
import http from 'http'
import config from './config/global.js'

class StaticServer {
    constructor() {
        this.port = config.port;
        this.root = path.join(__dirname, config.root);
        this.indexPage = config.indexPage;
    }

    start() {
        http.createServer((req, res) => {
            let url = path.normalize(req.url)
            const pathName = path.join(this.root, url);
            res.writeHead(200);
            res.end(`Requeste path: ${pathName}`);
        }).listen(this.port, err => {
            if (err) {
                console.error(err);
                console.info('Failed to start server');
            } else {
                console.info(`Server started on port ${this.port}`);
            }
        });
    }
}

module.exports = StaticServer;
