import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Expenses from "../pages/Expense";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/expense/:id" element={<Expenses />} />
      </Routes>
    </BrowserRouter>
  );
}
