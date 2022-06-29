import './App.css';
import { Home } from './components/Home';
import { Add } from './components/Add';
import { Check } from './components/Check'
import { Login } from './components/Login';
import { Routes, Route } from "react-router-dom"
import { Logout } from './components/Logout';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<Add />} />
        <Route path="/check" element={<Check />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </div>
  );
}

export default App;