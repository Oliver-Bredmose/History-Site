import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Today from './Components/Pages/Today';
import ByDate from './Components/Pages/ByDate';
import Since from './Components/Pages/Since';
import ThemeToggle from './Components/ThemeToggle/ThemeToggle';

function App() {
  return (
    <BrowserRouter>
      <div style={{ padding: '2rem' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <nav style={{ display: 'flex', gap: '1rem' }}>
            <Link to="/">Today</Link>
            <Link to="/by-date">By Date</Link>
            <Link to="/since">Since</Link>
          </nav>
          <ThemeToggle />
        </header>

        <Routes>
          <Route path="/" element={<Today />} />
          <Route path="/by-date" element={<ByDate />} />
          <Route path="/since" element={<Since />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;