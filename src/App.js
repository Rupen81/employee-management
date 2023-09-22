import logo from './logo.svg';
import './App.css';
import Character from './Character';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Favorite from './Favorite';
import Header from './Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Portfolio from './Portfolio';
import Register from './Register';
import Login from './Login';
import EmployeeHandler from './EmployeeHandler';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Character />} />
          <Route path="favorite" element={<Favorite />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="employee" element={<EmployeeHandler />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
