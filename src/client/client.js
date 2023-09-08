import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes.js";
import { createStore, applyMiddleware } from "redux";
import "babel-polyfill";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { renderRoutes } from "react-router-config";
import reducers from "./reducers";
import axios from "axios";
const axiosInstance = axios.create({
    baseUrl: '/api'
});
const store = createStore(reducers, window.INITIAL_STATE, applyMiddleware(thunk.withExtraArgument(axiosInstance)))

ReactDOM.hydrate(
    <Provider store={store}>
        <BrowserRouter>
            <div>{renderRoutes(Routes)}</div>
        </BrowserRouter>
    </Provider>,
    document.querySelector('#root')
);