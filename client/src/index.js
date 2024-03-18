import React from "react";
import { ConfigProvider } from "antd";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#00b96b",
          fontFamily: "Inter",
        },
      }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
