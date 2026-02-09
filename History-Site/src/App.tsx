import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Today from './Pages/Today';
import ByDate from './Pages/ByDate';
import Since from './Pages/Since';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Today</Link>
        <Link to="/by-date">By Date</Link>
        <Link to="/since">Since</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Today />} />
        <Route path="/by-date" element={<ByDate />} />
        <Route path="/since" element={<Since />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;