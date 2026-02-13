import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Today from './Components/Pages/Today.tsx';
import ByDate from './Components/Pages/ByDate.tsx';
import Since from './Components/Pages/Since.tsx';
import Header from './Components/Header/Header.tsx';
import BackToTop from './Components/BackToTop/BackToTop.tsx';

function App() {
  const [sinceYear, setSinceYear] = useState<string>('1947');
  const [byDate, setByDate] = useState<string>('12/02');

  const handleByDateChange = (date: string) => {
    setByDate(date);
    // Konverter dd/mm til YYYY-MM-DD for date input
    const [day, month] = date.split('/');
    const year = new Date().getFullYear();
    const fullDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    // Trigger date selection i ByDate component
    window.dispatchEvent(new CustomEvent('byDateChange', { detail: fullDate }));
  };

  return (
    <BrowserRouter>
      <div style={{ padding: '2rem' }}>
        <Header 
          onSinceYearChange={setSinceYear} 
          onByDateChange={handleByDateChange}
        />

        <Routes>
          <Route path="/" element={<Today />} />
          <Route path="/by-date" element={<ByDate onDateChange={setByDate} />} />
          <Route path="/since" element={<Since year={sinceYear} />} />
        </Routes>

        <BackToTop />
      </div>
    </BrowserRouter>
  );
}

export default App;