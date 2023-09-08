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
app.use('/api', proxy('https://react-ssr-api.herokuapp.com', {
    proxyReqOptDecorator(opts){
        opts.headers['x-forwarded-host'] = 'localhost:3000';
        return opts;
    }
}))
app.use(express.static('public'));

// app.get("/api", (req, res) => {
//     res.send("API");
// })


app.get("*", (req, res) => {
    const store = createStore(req);
    const promises = matchRoutes(Routes, req.path).map(({route}) => {
        return route.loadData ? route.loadData(store) : null;
    });
    Promise.all(promises).then(() => {
        res.send(renderer(req, store));
    })
})

app.listen(port, () => {
    console.log('Listening on ' + port+"\nMachine URL: http://localhost:"+port)
})