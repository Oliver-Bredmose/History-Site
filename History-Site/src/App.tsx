import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Today from './Components/Pages/Today';
import ByDate from './Components/Pages/ByDate';
import Since from './Components/Pages/Since';
import Header from './Components/Header/Header';
import BackToTop from './Components/BackToTop/BackToTop';
function App() {
  return (
    <BrowserRouter>
      <div style={{ padding: '2rem' }}>
        <Header />

        <Routes>
          <Route path="/" element={<Today />} />
          <Route path="/by-date" element={<ByDate />} />
          <Route path="/since" element={<Since />} />
        </Routes>

        <BackToTop />
      </div>
    </BrowserRouter>
  );
}

export default App;