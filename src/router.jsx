import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FirebaseExample from "./Pages/form.page";
import Config from "./Pages/config.page";

export const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<FirebaseExample />} />
                <Route path="/config" element={<Config />} />
            </Routes>
        </Router>
    );
};
