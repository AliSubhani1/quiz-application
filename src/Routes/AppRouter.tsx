import { Route, Routes } from "react-router";
import Home from "../Pages/Home/index.tsx";
import Result from '../Pages/Result/index.tsx'
import React from "react";

const AppRouter = () => {
    return (
        <>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/result" element={<Result />} />
        </Routes> 
        </>    
    )
}

export default AppRouter;