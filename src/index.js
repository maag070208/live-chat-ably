import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import * as Ably from "ably";
import { AblyProvider, ChannelProvider} from "ably/react";
const root = ReactDOM.createRoot(document.getElementById("root"));

const client = new Ably.Realtime({
  key: "VdYRNg.ok6kkg:qT6aWfjI4ZWTPDEO6F9lXnhFYs9iPAO2g5oSqmvuzY0",
});

root.render(
  <React.StrictMode>
    <AblyProvider client={client}>
      <ChannelProvider channelName="test-message">
        <App />
      </ChannelProvider>
    </AblyProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
