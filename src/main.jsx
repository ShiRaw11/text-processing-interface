import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from './App'
import NotFoundPage from "./redirect";
import ChatInterface from "./text-transformation";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />

        <Route path="/chat" element={<ChatInterface />} />

        <Route path="/redirect" element={<NotFoundPage />} />
        
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
