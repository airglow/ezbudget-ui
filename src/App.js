import {Route, Routes, BrowserRouter as Router} from "react-router-dom";
import Province from "./Provinces/Province";
import Provinces from "./Provinces";
import Dashboard from "./Dashboard";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/provinces" element={<Provinces />} />
          <Route path="/provinces/:id" element={<Province />} />
        </Routes>
      </Router>
  );
}

export default App;
