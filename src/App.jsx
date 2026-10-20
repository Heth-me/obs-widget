import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DonationWidget from "./DonationWidget";

function App() {
  return (
    <BrowserRouter basename="/widget">
      <Routes>
        <Route path="/donations" element={<DonationWidget />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
