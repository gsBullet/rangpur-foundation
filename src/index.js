import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AppWrapper } from "./components/common/PageMeta";
import FrontendProvider from "./context/FrontendContext";
import { ThemeProvider } from "./context/ThemeContext";
import FrontendAuthProvider from "./context/FrontendAuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <ThemeProvider>
      <AppWrapper>
        <FrontendProvider>
          <FrontendAuthProvider>
          <App />
          </FrontendAuthProvider>
        </FrontendProvider>
      </AppWrapper>
    </ThemeProvider>
  </>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
