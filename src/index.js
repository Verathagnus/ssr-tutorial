import "babel-polyfill";
import express from "express";
import proxy from "express-http-proxy";
import renderer from "./helpers/renderer";
import dotenv from "dotenv/config";
import { matchRoutes } from "react-router-config";
import Routes from "./client/Routes";

import createStore from "./helpers/createStore";

const port = process.env.PORT || 5000;

const app = express();
app.use('/api', proxy('http://react-ssr-api.herokuapp.com', {
    proxyReqOptDecorator(opts){
        opts.headers['x-forwarded-host'] = 'localhost:'+port;
        return opts;
    }
}))
app.use(express.static('public'));
app.get("*", (req, res) => {
    const store = createStore(req);
    const promises = matchRoutes(Routes, req.path).map(({route}) => {
        return route.loadData ? route.loadData(store) : null;
    })
    .map((promise) => {
        if(promise){
            return new Promise((resolve, _) => {
                promise.then(resolve).catch(resolve);
            })
        }
    });

    
    Promise.all(promises).then(() => {
        const context = {};
        const content = renderer(req, store, context);
        if(context.notFound){
            res.status(404);
        }
        res.send(content);
    })
    // .catch((err) => res.status(err.response.status).send(err.response.data.error))
})

app.listen(port, () => {
    console.log('Listening on ' + port+"\nMachine URL: http://localhost:"+port)
})