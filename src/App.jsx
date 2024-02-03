import Header from "./components/Header";
import StakeDetails from "./components/StakeDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Stake from "./components/Stake";
import Swap from "./components/Swap";

export default function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<StakeDetails />} />
          <Route path="/stake" element={<Stake />} />
          <Route path="/swap" element={<Swap />} />
        </Routes>
      </Router>
    </div>
  );
}
