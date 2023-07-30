import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";
import TagManager from 'react-gtm-module'

const tagManagerArgs = { 
  gtmId: 'GTM-TV3DPLD4',
  dataLayer: {
    userId: '001',
    userProject: 'project'
} 
} 

TagManager.initialize(tagManagerArgs)

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
