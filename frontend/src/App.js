import './App.css';
import LoginPage from './LoginPage';
import { BrowserRouter,Routes, Route } from "react-router-dom";
import NavBar from './NavBar';
import ProfilePage from './ProfilePage';
import LogOut from './LogOut';
import MyGreddits from './MyGreddits';
import GredditsPage from './GredditsPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <NavBar/>
      <div className="component">
          <Routes >
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/logout" element={<LogOut/>} />
            <Route path="/greddits" element={<GredditsPage />} />
            <Route path="/mygreddits" element={<MyGreddits />} />
            <Route path="/" element={<ProfilePage />} />
          </Routes>
      </div>
    </BrowserRouter>
    </div>
  );
}

export default App;
