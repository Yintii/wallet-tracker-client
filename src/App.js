import './App.css';
import { Home } from './components/Home';
import { Add } from './components/Add';
import { Check } from './components/Check'
import { Routes, Route } from "react-router-dom"


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<Add />} />
        <Route path="/check" element={<Check />} />
      </Routes>
    </div>
  );
}

export default App;
